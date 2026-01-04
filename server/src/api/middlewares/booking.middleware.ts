import { Types } from "mongoose";
import { findBooking } from "../modules/booking/booking.service";

import { BOOKING_AUTH } from "../modules/booking/booking.utils";
import { asyncWrapper } from "../utils/apiHelper";
import { CustomError } from "../utils/response";
import { hashToken } from "../utils/token";
import { log } from "@api/utils/log";


export const bookingMiddleware = asyncWrapper(async (req, res, next) => {
    const bookingId = req.params.bookingId;

    const accessToken = req.cookies[BOOKING_AUTH.COOKIE_NAME];

    if (!accessToken) {
        throw new CustomError(401, "Access token missing");
    }

    const bookingData = await findBooking(
        { _id: new Types.ObjectId(bookingId) },
        ["accessToken", "expiresAt"]
    );

    if (!bookingData || !bookingData.accessToken) {
        throw new CustomError(404, "Booking access not allowed");
    }

    log.info('Access token in middleware:', {
        accessToken,
        db_token: bookingData.accessToken,
    });

    if (bookingData.accessToken !== hashToken(accessToken)) {
        throw new CustomError(403, "Invalid access token");
    }

    if (bookingData.expiresAt < new Date()) {
        throw new CustomError(411, "Booking access token expired");
    }

    next();
})