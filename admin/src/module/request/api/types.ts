import { PaginationType } from "@/types/api";

export type RequestType = "GET_DETAILS" | "CANCEL_BOOKING";

export interface GetRequestListParams {
    page?: number;
    limit?: number;
}

export type OtpData = {
    otp: string;
    expiresAt: string;
    resendCount: number;
    sessionId: string;
    sessionCreatedAt: string;
    isVerified: boolean;
}

export type BookingData = {
    bookingId: string;
    customerName: string;
    bookedAt: string;
    totalAmount: number;
    isFullPaid: boolean;
}

export type RequestItem = {
    _id: string;
    requestType: RequestType;
    isOpen: boolean;
    phone: string;
    travelDate: string;
    otpData: OtpData;
    bookingData: BookingData;
    createdAt: string;
    updatedAt: string;
}

export interface GetRequestListResponse {
    requests: RequestItem[];
    pagination: PaginationType;
}

export interface CloseRequestPayload {
    requestId: string;
}

export type CloseRequestResponse = null

export interface DeleteRequestPayload {
    requestId: string;
}

export type DeleteRequestResponse = null