import { PaginationType } from "@/types/api";

export type BookingStatus = "DRAFT" | "DETAILS_FILLED" | "PAID_PARTIAL" | "PAID_FULL" | "FAILED";
export type OrderStatus = "ACTIVE" | "PAID" | "EXPIRED" | "CANCELLED";

export interface GetBookingListParams {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export type BookingFilterFields = keyof GetBookingListParams

export type BookingListType = {
    _id: string,
    bookingStatus: BookingStatus,
    createdAt: string,
    tourName: string,
    customerName?: string,
    customerNumber?: string,
    orderStatus?: OrderStatus
}

export interface GetBookingListResponse {
    bookings: BookingListType[],
    pagination: PaginationType
}


export interface GetBookingDetailsParams {
    bookingId: string;
}

type CustomerBookingInfo = {
    fullName: string,
    phone1: string,
    phone2: string,
    dateOfTravel: string,
    members: {
        fullName: string,
        age: number,
        gender: "M" | "F"
    }[]
}

export type PackageBookingInfo = {
    _id: string
    packageName: string,
    days: number,
    nights: number,
    pricePerPerson: number,
    childrenPrice: number,
    startCity: string,
    endCity: string,
}

export type TourBookingInfo = {
    _id: string,
    tourName: string,
    thumbnailImage: string,
    includes: string[],
    excludes: string[]
}


export type PaymentBookingInfo = {
    paymentOption: "FULL" | "PARTIAL",
    order_status: OrderStatus,
    order_amount: number,
    cf_order_id: string,
    order_created_at: string,
    payment_session_id: string
}

export interface GetBookingDetailsResponse {
    _id: string,
    tourId: string,
    packageId: string,
    bookingStatus: BookingStatus,
    expiresAt: string,
    accessToken: string | null,

    customerDetails?: CustomerBookingInfo,
    packageDetails?: PackageBookingInfo,
    tourDetails?: TourBookingInfo,
    paymentDetails?: PaymentBookingInfo,
    totalAmount?: number,

    createdAt: string,
    updatedAt: string,
}

export interface DeleteBookingPayload {
    bookingId: string;
}

export type DeleteBookingResponse = null