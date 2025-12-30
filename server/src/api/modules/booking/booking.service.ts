import{ Types } from "mongoose";
import Booking, { BookingFields, BookingLean, BookingStatus } from "./booking.model";
import Tour from "../tour/tour.model";
import Package from "../packages/packages.model";

import { BookingPaymentPayload, CreateBookingPayload, CustomerDetailsPayload } from "./booking.schema";
import { createCashFreeOrder } from "../payment/payment.service";
import { CustomError } from "@/api/utils/response";
import { CashfreePaymentWebhookPayload } from "../payment/payment.types";
import { log } from "@/api/utils/log";

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

    // create draft booking
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
    // get booking details with tourId and packageId
    const booking = await Booking.aggregate([
        { 
            $match: { 
                _id: new Types.ObjectId(bookingId),
                bookingStatus: { $in: ["DRAFT", "DETAILS_FILLED"] },
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

    // commute total amount with customer details and package details of booking
    const commuteTotalAmount = payload.members.reduce((totalAmount, member) => {
        if (member.age < 6) {
            return totalAmount;
        }
        if (6 <= member.age && member.age < 12) {
            return totalAmount + bookingDoc.packageDetails?.childrenPrice || 0;
        }
        
        return totalAmount + bookingDoc.packageDetails?.pricePerPerson || 0;

    }, 0) || 0;

    // update booking with customer details and total amount
    const result = await Booking.findOneAndUpdate(
        { _id: bookingId, bookingStatus: { $in: ["DRAFT", "DETAILS_FILLED"] } },
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
    // get booking details and validate it
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

    // make cashfree payment order
    const paymentAmount = payload.paymentOption === "PARTIAL" 
        ? booking.totalAmount * 0.5
        : booking.totalAmount;

    const response = await createCashFreeOrder({
        paymentAmount, 
        customerDetails: booking.customerDetails, 
        bookingId: booking._id.toString()
    });

    // update payment details with cashfree response
    const result = await Booking.findOneAndUpdate(
        { _id: bookingId, bookingStatus: "DETAILS_FILLED" },
        {
            $set: {
                paymentDetails: {
                    paymentOption: payload.paymentOption,
                    order_status: response.order_status,
                    order_amount: response.order_amount,
                    cf_order_id: response.cf_order_id.toString(),
                    order_created_at: response.created_at,
                    payment_session_id: response.payment_session_id,
                }
            }
        },
        { new: true }
    );

    if (!result) {
        throw new CustomError(409, "Booking payment update conflict. Please try again.");
    }

    return {
        paymentSessionId: response.payment_session_id,
        bookingId: result._id,
    };
}


export const updateBookingPaymentStatus = async (
    { order, payment } : { 
        order: CashfreePaymentWebhookPayload['data']['order'], 
        payment: CashfreePaymentWebhookPayload['data']['payment']
    }
) => {
    const booking = await findBooking(
        { _id: new Types.ObjectId(order.order_id) }, 
        ['bookingStatus', 'paymentDetails', 'totalAmount']
    );

    if (!booking) {
        throw new CustomError(500, "Booking details not found");
    }

    const bookingStatus: BookingStatus = payment.payment_status === "FAILED"
        ? "FAILED"
        : payment.payment_status === "SUCCESS"
            ? booking.totalAmount === order.order_amount
                ? "PAID_FULL"
                : "PAID_PARTIAL"
            : "FAILED";

    const result = await Booking.findOneAndUpdate(
        { _id: order.order_id },
        {
            $set: {
                bookingStatus,
                "paymentDetails.order_status": payment.payment_status,
            }
        },
        { new: true }
    );

    if (!result) {
        throw new CustomError(500, "Failed to update booking payment status");
    }
}