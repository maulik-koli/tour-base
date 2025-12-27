import mongoose, { Types } from "mongoose";
import Booking, { BookingFields, BookingLean } from "./booking.model";
import Tour from "../tour/tour.model";
import Package from "../packages/packages.model";

import { BookingPaymentPayload, CreateBookingPayload, CustomerDetailsPayload } from "./booking.schema";
import { CustomError } from "@/api/utils/response";
import { log } from "@/api/utils/log";
import { createCashFreeOrder } from "../payment/payment.service";

const EXPIRED_AT_TIME = 30 * 60 * 1000; // 30 minutes


export const createBooking = async (payload: CreateBookingPayload) => {
    
    const isTourExists = await Tour.exists({ 
        _id: payload.tourId
    });

    if (!isTourExists) {
        throw new CustomError(400, "Tour does not exists");
    }

    const isPackageExists = await Package.exists({
        _id: payload.packageId, tourId: payload.tourId
    });

    if (!isPackageExists) {
        throw new CustomError(400, "Package does not exists for the given tour");
    }

    const booking = await Booking.create({
        tourId: payload.tourId,
        packageId: payload.packageId,
        bookingStatus: "DRAFT",
        expiresAt: new Date(Date.now() + EXPIRED_AT_TIME),
    });

    return {
        bookingId: booking._id,
        expiresAt: booking.expiresAt,
    };
}


export const findBooking = async (query: Partial<BookingLean>, select?: BookingFields[]) => {
    const booking = await Booking.findOne(query)
        .select(select?.join(' ') || '')
        .lean();

    if(!booking) {
        throw new CustomError(404, 'Booking data not found');
    }
    return booking;
};


export const customerBooking = async (bookingId: string, payload: CustomerDetailsPayload) => {
    const booking = await Booking.aggregate([
        { 
            $match: { 
                _id: new Types.ObjectId(bookingId),
                bookingStatus: "DRAFT",
                // expiresAt: { $gt: "$$NOW" }
            }
        },
        {
            $lookup: {
                from: "tours",
                localField: "tourId",
                foreignField: "_id",
                as: "tourDetails"
            },
        },
        { $unwind: "$tourDetails" },
        {
            $lookup: {
                from: "packages",
                localField: "packageId",
                foreignField: "_id",
                as: "packageDetails"
            },
        },
        { $unwind: "$packageDetails" },
        {
            $project: {
                _id: 1,
                bookingStatus: 1,
                expiresAt: 1,
                tourId: 1,
                packageId: 1,
                tourDetails: {
                    tourName: "$tourDetails.name",
                    includes: "$tourDetails.includes",
                    excludes: "$tourDetails.excludes",
                },
                packageDetails: {
                    packageName: "$packageDetails.name",
                    days: "$packageDetails.days",
                    nights: "$packageDetails.nights",

                    pricePerPerson: "$packageDetails.pricePerPerson",
                    childrenPrice: "$packageDetails.childrenPrice",
                    startCity: "$packageDetails.startCity",
                    endCity: "$packageDetails.endCity",
                }
            }
        }
    ])

    if (!booking.length) {
        throw new CustomError(404, "Booking not found or already processed");
    }

    const bookingDoc = booking[0];

    log.info('bookingDoc', bookingDoc);

    if (new Date(bookingDoc.expiresAt) < new Date()) {
        throw new CustomError(410, "Booking session expired");
    }

    const commuteTotalAmount = payload.members.reduce((totalAmount, member) => {
        if (member.age < 6) {
            return totalAmount;
        }
        if (6 <= member.age && member.age < 12) {
            return totalAmount + bookingDoc.packageDetails?.childrenPrice || 0;
        }
        
        return totalAmount + bookingDoc.packageDetails?.pricePerPerson || 0;

    }, 0) || 0;

    const result = await Booking.findOneAndUpdate(
        { _id: bookingId, bookingStatus: "DRAFT" },
        {
            $set: {
                customerDetails: payload,
                tourDetails: bookingDoc.tourDetails,
                packageDetails: bookingDoc.packageDetails,
                bookingStatus: "DETAILS_FILLED",
                totalAmount: commuteTotalAmount,
            }
        },
        { new: true }
    );

    if (!result) {
        throw new CustomError(409, "Booking details update conflict. Please try again.");
    }

    log.info('Updated booking:', result);

    return {
        bookingId: result._id,
        totalAmount: commuteTotalAmount,
    }
}


export const bookingPayment = async (bookingId: string, payload: BookingPaymentPayload) => {
    const booking = await findBooking(
        { _id: new Types.ObjectId(bookingId) }, 
        ['bookingStatus', 'packageDetails', 'expiresAt', 'customerDetails', "totalAmount"]
    );

    if (booking.bookingStatus.includes("PAID")) {
        throw new CustomError(400, "Booking is already paid");
    }

    if (booking.bookingStatus !== "DETAILS_FILLED") {
        throw new CustomError(400, "Booking details are not filled yet");
    }

    if (new Date(booking.expiresAt) < new Date()) {
        throw new CustomError(410, "Booking session expired");
    }

    if (booking.totalAmount === undefined) {
        throw new CustomError(500, "Booking total amount is not calculated");
    }

    const paymentAmount = payload.paymentOption === "PARTIAL" 
        ? booking.totalAmount * 0.5
        : booking.totalAmount;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
        const result = await Booking.findOneAndUpdate(
            { _id: bookingId, bookingStatus: "DETAILS_FILLED" },
            {
                $set: {
                    paymentDetails: {
                        paymentOption: payload.paymentOption,
                        paymentAmount: paymentAmount,
                        paymentStatus: "ACTIVE",
                    }
                }
            },
            { 
                new: true,
                session: session,
            }
        );
    
        log.info('Payment update result:', result);
    
        if (!result) {
            throw new CustomError(409, "Booking payment update conflict. Please try again.");
        }

        if (result.paymentDetails === undefined) {
            throw new CustomError(500, "Booking payment details are not set");
        }

        const response = await createCashFreeOrder(
            result.paymentDetails.paymentAmount, 
            result.customerDetails, 
            result._id.toString()
        );

        await session.commitTransaction();

        return response;
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
}