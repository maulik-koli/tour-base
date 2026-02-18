import { CustomerDetailsFormType } from "../utils/schema";

type BookingStaus = "DRAFT" | "DETAILS_FILLED" | "PAID_PARTIAL" | "PAID_FULL" | "FAILED"
export type PaymentOption = "FULL" | "PARTIAL";

export interface CreateBookingPayload {
    tourId: string;
    packageId: string;
}

export interface CreateBookingResponse {
    bookingId: string;
    expiresAt: string;
}

export interface CustomerBookingPayload {
    bookingId: string;
    customer: CustomerDetailsFormType
}

export interface CustomerBookingResponse {
    bookingId: string;
    totalAmount: number;
}


export interface GetBookingDataParams {
    bookingId: string;
    view?: boolean;
}

export interface GetBookingDataViewResponse {
    bookingId: string;
    bookingStatus: BookingStaus;
    isExpired: boolean;
}

export interface GetBookingDataResponse extends GetBookingDataViewResponse {
    tour: {
        _id: string;
        tourName: string;
        thumbnailImage: string;
        includes: string[];
        excludes: string[];
    },
    package: {
        _id: string;
        packageName: string;
        tourId: string;
        days: number;
        nights: number;
        pricePerPerson: number;
        childrenPrice: number;
        startCity: string;
        endCity: string;
        priceSlots?: { persons?: number; person?: number; price: number }[];
    },
    createdAt: string;
    customerBookingDetails?: CustomerDetailsFormType;
    totalAmount?: number;
}


export interface BookingPaymentPayload {
    bookingId: string;
    paymentOption: PaymentOption;
}

export interface BookingPaymentResponse {
    bookingId: string;
    // paymentSessionId: string;
    upiUrl: string;
}