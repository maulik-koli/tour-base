import { Types } from "mongoose";
import { adminGetBookingsList, bookingPayment, createBooking, customerBooking, deleteBooking, findBooking, getBookingData } from "./booking.service";
import { AdminBookingListQueries, BookingPaymentPayload, BookingStatusPayload, CreateBookingPayload, CustomerDetailsPayload } from "./booking.schema";

import { generateAccessToken } from "@/api/utils/token";
import { getCookiesConfig } from "@/api/utils/getCookiesConfig";
import { BOOKING_AUTH } from "./booking.utils";
import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";


export const createBookingController = asyncWrapper(async (req, res) => {
    const payload = req.body as CreateBookingPayload;

    const token = generateAccessToken();

    const { bookingId, expiresAt } = await createBooking(payload, token);

    res.cookie(BOOKING_AUTH.COOKIE_NAME, token, {
        ...getCookiesConfig(),
        maxAge: BOOKING_AUTH.EXPIRE_TIME,
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


export const adminGetBookingController = asyncWrapper(async (req, res) => {
    const bookingId = req.params.bookingId;

    const booking = await findBooking({ _id: new Types.ObjectId(bookingId) });

    successResponse(res, {
        message: "Booking fetched successfully",
        status: 200,
        data: booking,
    });
})


export const adminGetBookingsListController = asyncWrapper(async (req, res) => {
    const query = req.localsQuery as AdminBookingListQueries;

    const { bookings, pagination } = await adminGetBookingsList(query);

    successResponse(res, {
        message: "Admin bookings list fetched successfully",
        status: 200,
        data: { bookings, pagination },
    });
});


export const adminDeleteBookingController = asyncWrapper(async (req, res) => {
    const bookingId = req.params.bookingId;

    await deleteBooking(bookingId);

    successResponse(res, {  
        message: "Booking deleted successfully",
        status: 200,
        data: null,
    });
})