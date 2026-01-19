import { Types, PipelineStage } from "mongoose";
import Booking, { BookingFields, BookingLean, BookingStatus } from "./booking.model";
import Tour from "../tour/tour.model";
import Package from "../packages/packages.model";

import { AdminBookingListQueries, BookingPaymentPayload, CreateBookingPayload, CustomerDetailsPayload } from "./booking.schema";
import { createCashFreeOrder } from "../payment/payment.service";
import { CashfreePaymentWebhookPayload } from "../payment/payment.types";
import { hashToken } from "@/api/utils/token";
import { BOOKING_AUTH, BookingTourPackage } from "./booking.utils";
import { CustomError } from "@/api/utils/response";
import { log } from "@/api/utils/log";
import { PaginationType } from "@/api/core/types/common.type";


export const createBooking = async (payload: CreateBookingPayload, token: string) => {
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
        expiresAt: new Date(Date.now() + BOOKING_AUTH.EXPIRE_TIME),
        accessToken: hashToken(token),
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


export const getBookingTourPackage = async (match: PipelineStage.Match["$match"]): Promise<BookingTourPackage> => {
    const pipeline: PipelineStage[] = [
        { $match: match },
        {
            $addFields: {
                isExpired: {
                    $lt: ["$expiresAt", "$$NOW"]
                }
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
                bookingId: "$_id",
                bookingStatus: 1,
                isExpired: 1,
                createdAt: 1,
                tour: {
                    _id: "$tourDetails._id",
                    tourName: "$tourDetails.name",
                    thumbnailImage: "$tourDetails.thumbnailImage",
                    includes: "$tourDetails.includes",
                    excludes: "$tourDetails.excludes",
                },
                package: {
                    _id: "$packageDetails._id",
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
    ];

    const result = await Booking.aggregate(pipeline);

    if (!result.length) {
        throw new CustomError(404, "Booking not found or already processed");
    }

    return result[0];
}


export const getBookingData = async (bookingId: string, isView: boolean) => {
    const bookingData = await findBooking(
        { _id: new Types.ObjectId(bookingId) },
    );

    log.info('bookingData', bookingData);

    if (isView) {
        return {
            bookingId: bookingData._id,
            bookingStatus: bookingData.bookingStatus,
            isExpired: bookingData.expiresAt < new Date(),
        }
    }

    // if there are not tourDetails or packageDetails
    // that mean customer has not yet filled the details
    if ((!bookingData.tourDetails || !bookingData.packageDetails) || bookingData.bookingStatus === "DRAFT") {
        const result = await getBookingTourPackage(
            { _id: new Types.ObjectId(bookingId) }
        );
    
        return result;
    }
    
    return {
        bookingId: bookingData._id,
        bookingStatus: bookingData.bookingStatus,
        isExpired: bookingData.expiresAt < new Date(),
        tour: bookingData.tourDetails,
        package: bookingData.packageDetails,
        customerBookingDetails: bookingData.customerDetails,
        totalAmount: bookingData.totalAmount,
        createdAt: bookingData.createdAt,
    }
}


export const customerBooking = async (bookingId: string, payload: CustomerDetailsPayload) => {
    // get booking, tour and packge data with bookingId
    const booking = await getBookingTourPackage({
        _id: new Types.ObjectId(bookingId),
        bookingStatus: { $in: ["DRAFT", "DETAILS_FILLED"] },
    });

    // commute total amount with customer details and package details of booking
    const commuteTotalAmount = payload.members.reduce((totalAmount, member) => {
        if (member.age < 6) {
            return totalAmount;
        }
        if (6 <= member.age && member.age < 12) {
            return totalAmount + booking.package?.childrenPrice || 0;
        }
        
        return totalAmount + booking.package?.pricePerPerson || 0;

    }, 0) || 0;


    // update booking with customer details and total amount
    const result = await Booking.findOneAndUpdate(
        { _id: bookingId, bookingStatus: { $in: ["DRAFT", "DETAILS_FILLED"] } },
        {
            $set: {
                customerDetails: payload,
                tourDetails: booking.tour,
                packageDetails: booking.package,
                bookingStatus: "DETAILS_FILLED",
                totalAmount: commuteTotalAmount,
            }
        },
        { new: true }
    );

    if (!result) {
        throw new CustomError(409, "Booking details update conflict. Please try again.");
    }

    return {
        bookingId: result._id,
        totalAmount: commuteTotalAmount,
    }
}


export const bookingPayment = async (bookingId: string, payload: BookingPaymentPayload) => {
    // get booking details and validate it
    const booking = await findBooking(
        { _id: new Types.ObjectId(bookingId) }, 
        ['bookingStatus', 'customerDetails', "totalAmount"]
    );

    if (booking.bookingStatus.includes("PAID") || booking.bookingStatus === "FAILED") {
        throw new CustomError(400, "Booking is already paid");
    }

    if (booking.bookingStatus === "DRAFT") {
        throw new CustomError(400, "Booking details are not filled yet");
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

    return result.toObject();
}


export const adminGetBookingsList = async (query: AdminBookingListQueries) => {
    const { limit, page, search, status } = query;

    const filter: any = {};

    if (status && status !== "NONE") {
        filter.bookingStatus = status;
    }

    if (search) {
        filter.$or = [
            { "customerDetails.fullName": { $regex: search, $options: 'i' } },
        ];
    }

    const skip = (page - 1) * limit;

    const bookings = await Booking.aggregate([
        { $match: filter },
        { 
            $lookup: {
                from: "tours",
                localField: "tourId",
                foreignField: "_id",
                as: "tourDetails"
            }
        },
        { $unwind: { path: "$tourDetails", preserveNullAndEmptyArrays: true } },
        { $addFields: { tourName: "$tourDetails.name" } },
        { $unset: "tourDetails" },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        { 
            $project: {
                bookingStatus: 1,
                createdAt: 1,
                customerName: "$customerDetails.fullName",
                customerNumber: "$customerDetails.phone1",
                tourName: "$tourName",
                orderStatus: "$paymentDetails.order_status",
            }
        }
    ])

    const total = await Booking.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const pagination: PaginationType = {
        page,
        limit,
        totalItems: total,
        totalPages,
        isNextPage: page < totalPages,
        isPrevPage: page > 1,
    }

    return {
        bookings,
        pagination
    }
}


export const deleteBooking = async (bookingId: string) => {
    const result = await Booking.findByIdAndDelete(new Types.ObjectId(bookingId));

    if (!result) {
        throw new CustomError(404, "Booking not found");
    }

    return result
}