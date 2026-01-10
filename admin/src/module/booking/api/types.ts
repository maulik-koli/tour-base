type BookingStatus = "DRAFT" | "DETAILS_FILLED" | "PAID_PARTIAL" | "PAID_FULL" | "FAILED";
type OrderStatus = "ACTIVE" | "PAID" | "EXPIRED" | "CANCELLED";

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

export type TourBookingInfo = {
    _id: string,
    tourName: string,
    thumbnailImage: string,
    includes: string[],
    excludes: string[]
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

export type PaymentBookingInfo = {
    paymentOption: "FULL" | "PARTIAL",
    order_status: OrderStatus,
    order_amount: number,
    cf_order_id: string,
    order_created_at: string,
    payment_session_id: string
}

export type BookingType = {
    _id: string,
    tourId: string,
    packageId: string,
    bookingStatus: BookingStatus,
    expiresAt: string,
    accessToken: string | null,
    
    customerDetails?: CustomerBookingInfo,
    tourDetails?: TourBookingInfo,
    packageDetails?: PackageBookingInfo,


    totalAmount?: number,
    paymentDetails?: PaymentBookingInfo,

    createdAt: string,
    updatedAt: string,
}
