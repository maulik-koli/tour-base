
export interface CreateBookingPayload {
    tourId: string;
    packageId: string;
}

export interface CreateBookingResponse {
    bookingId: string;
    expiresAt: string;
}