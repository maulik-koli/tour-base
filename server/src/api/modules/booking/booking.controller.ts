import { bookingPayment, createBooking, customerBooking } from "./booking.service";
import { BookingPaymentPayload, CreateBookingPayload, CustomerDetailsPayload } from "./booking.schema";

import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";


export const createBookingController = asyncWrapper(async (req, res) => {
    const payload = req.body as CreateBookingPayload;

    const booking = await createBooking(payload);

    successResponse(res, {
        message: "Booking created successfully",
        status: 201,
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
});