import { BOOKING_EXPIRED_AT_TIME, bookingPayment, createBooking, customerBooking, getBookingData } from "./booking.service";
import { BookingPaymentPayload, BookingStatusPayload, CreateBookingPayload, CustomerDetailsPayload } from "./booking.schema";

import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";
import { getCookiesConfig } from "@/api/utils/getCookiesConfig";


export const createBookingController = asyncWrapper(async (req, res) => {
    const payload = req.body as CreateBookingPayload;

    const { bookingId, expiresAt, token } = await createBooking(payload);

    res.cookie("booking_access_token", token, {
        ...getCookiesConfig(),
        maxAge: BOOKING_EXPIRED_AT_TIME,
    });

    successResponse(res, {
        message: "Booking created successfully",
        status: 201,
        data: { bookingId, expiresAt },
    });
});


export const getbookingController = asyncWrapper(async (req, res) => {
    const bookingId = req.params.bookingId;
    const query = req.localsQuery as BookingStatusPayload;

    const booking = await getBookingData(bookingId, query.view === "true");

    successResponse(res, {
        message: "Booking status fetched successfully",
        status: 200,
        data: booking,
    });
});


export const customerBookingController = asyncWrapper(async (req, res) => {
    const bookingId = req.params.bookingId;
    const payload = req.body as CustomerDetailsPayload;

    const result = await customerBooking(bookingId, payload);

    successResponse(res, {
        message: "Customer details added successfully",
        status: 200,
        data: result,
    });
});


export const bookingPaymentController = asyncWrapper(async (req, res) => {
    const bookingId = req.params.bookingId;
    const payload = req.body as BookingPaymentPayload;

    const response = await bookingPayment(bookingId, payload);

    successResponse(res, {
        message: "Booking payment processed successfully",
        status: 200,
        data: response,
    }); 
})