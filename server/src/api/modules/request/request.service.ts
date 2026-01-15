import { Types } from "mongoose";
import { nanoid } from "nanoid";
import RequestModel, { RequestType } from "./request.model";
import Booking from "../booking/booking.model";

import { CustomError } from "@/api/utils/response";
import { generateOtp, OTP_CONFIG } from "./request.utils";


// ==================== Admin Services ====================

export const getAllRequests = async () => {
    const requests = await RequestModel.find()
        .sort({ createdAt: -1 })
        .lean();

    return requests;
}


export const deleteRequest = async (requestId: string) => {
    const result = await RequestModel.findByIdAndDelete(
        new Types.ObjectId(requestId)
    ).lean();

    if (!result) {
        throw new CustomError(404, "Request not found");
    }

    return result;
}


export const closeRequest = async (requestId: string) => {
    const request = await RequestModel.findByIdAndUpdate(
        new Types.ObjectId(requestId),
        { isOpen: false },
        { new: true }
    ).lean();

    if (!request) {
        throw new CustomError(404, "Request not found");
    }

    return request;
}


// ==================== User Services ====================

type GenerateOtpParams = {
    phone: string;
    travelDate: Date;
    requestType: RequestType;
}

export const createOtpRequest = async (params: GenerateOtpParams) => {
    const { phone, travelDate, requestType } = params;

    // Check if booking exists with matching phone and travel date
    const booking = await Booking.findOne({
        $or: [
            { "customerDetails.phone1": phone },
            { "customerDetails.phone2": phone }
        ],
        "customerDetails.dateOfTravel": travelDate,
        bookingStatus: { $in: ["PAID_PARTIAL", "PAID_FULL"] }
    })
    .select("_id customerDetails.fullName totalAmount bookingStatus createdAt")
    .lean();

    if (!booking) {
        throw new CustomError(404, "No booking found for this phone number and travel date");
    }

    // Check for existing open request with same phone and travel date
    const existingRequest = await RequestModel.findOne({
        phone,
        travelDate,
        isOpen: true,
        "otpData.sessionCreatedAt": { 
            $gte: new Date(Date.now() - OTP_CONFIG.SESSION_EXPIRY_TIME) 
        }
    }).lean();

    if (existingRequest) {
        // Check if max resend count reached
        if (existingRequest.otpData.resendCount >= OTP_CONFIG.MAX_RESEND_COUNT) {
            throw new CustomError(429, "Maximum OTP resend limit reached. Please try again later");
        }

        // Resend OTP - update existing request
        const otp = generateOtp();
        const updatedRequest = await RequestModel.findByIdAndUpdate(
            existingRequest._id,
            {
                $set: {
                    "otpData.otp": otp,
                    "otpData.expiresAt": new Date(Date.now() + OTP_CONFIG.EXPIRY_TIME),
                    "otpData.isVerified": false,
                },
                $inc: { "otpData.resendCount": 1 }
            },
            { new: true }
        ).lean();

        // TODO: Send OTP via WhatsApp
        // await sendWhatsAppOtp(phone, otp);

        return {
            sessionId: existingRequest.otpData.sessionId,
            resendCount: updatedRequest!.otpData.resendCount,
            expiresAt: updatedRequest!.otpData.expiresAt,
        };
    }

    // Create new request with OTP
    const otp = generateOtp();
    const sessionId = `grs_${nanoid(18)}`;
    const now = new Date();

    const request = await RequestModel.create({
        requestType,
        phone,
        travelDate,
        isOpen: true,
        otpData: {
            otp,
            expiresAt: new Date(now.getTime() + OTP_CONFIG.EXPIRY_TIME),
            resendCount: 0,
            sessionId,
            sessionCreatedAt: now,
            isVerified: false,
        },
        bookingData: {
            bookingId: booking._id.toString(),
            customerName: booking.customerDetails?.fullName || "",
            bookedAt: booking.createdAt,
            totalAmount: booking.totalAmount || 0,
            isFullPaid: booking.bookingStatus === "PAID_FULL",
        },
    });

    // TODO: Send OTP via WhatsApp
    // await sendWhatsAppOtp(phone, otp);

    return {
        sessionId: request.otpData.sessionId,
        resendCount: request.otpData.resendCount,
        expiresAt: request.otpData.expiresAt,
    };
}


export const getRequestBySessionId = async (sessionId: string) => {
    const request = await RequestModel.findOne({
        "otpData.sessionId": sessionId,
        isOpen: true,
    })
    .select("requestType otpData.sessionId otpData.isVerified otpData.sessionCreatedAt")
    .lean();

    if (!request) {
        throw new CustomError(404, "Session not found or expired");
    }

    // Check if session is expired
    const sessionExpiry = new Date(
        request.otpData.sessionCreatedAt.getTime() + OTP_CONFIG.SESSION_EXPIRY_TIME
    );

    if (new Date() > sessionExpiry) {
        throw new CustomError(410, "Session has expired");
    }

    return {
        sessionId: request.otpData.sessionId,
        requestType: request.requestType,
        isVerified: request.otpData.isVerified,
    };
}


export const verifyOtp = async (sessionId: string, otp: string) => {
    const request = await RequestModel.findOne({
        "otpData.sessionId": sessionId,
        isOpen: true,
    });

    if (!request) {
        throw new CustomError(404, "Session not found or expired");
    }

    // Check if session is expired
    const sessionExpiry = new Date(
        request.otpData.sessionCreatedAt.getTime() + OTP_CONFIG.SESSION_EXPIRY_TIME
    );

    if (new Date() > sessionExpiry) {
        throw new CustomError(410, "Session has expired");
    }

    // Check if OTP is expired
    if (new Date() > request.otpData.expiresAt) {
        throw new CustomError(410, "OTP has expired. Please request a new one");
    }

    // Check if already verified
    if (request.otpData.isVerified) {
        throw new CustomError(400, "OTP already verified");
    }

    // Verify OTP
    if (request.otpData.otp !== otp) {
        throw new CustomError(400, "Invalid OTP");
    }

    // Mark as verified
    request.otpData.isVerified = true;
    await request.save();

    return {
        sessionId: request.otpData.sessionId,
        requestType: request.requestType,
        isVerified: true,
    };
}
