import express from "express";
import { bookingPaymentZodSchema, createBookingZodSchema, customerDetailsZodSchema } from "./booking.schema";
import { bookingPaymentController, createBookingController, customerBookingController } from "./booking.controller";
import { validateRequest } from "@/api/middlewares/validate.middlewate";

const router = express.Router();


// public api
router.post(
    "/",
    validateRequest(createBookingZodSchema),
    createBookingController
)

router.patch(
    "/:bookingId/details",
    validateRequest(customerDetailsZodSchema),
    customerBookingController
)

router.patch(
    "/:bookingId/payment",
    validateRequest(bookingPaymentZodSchema),
    bookingPaymentController
)


export default router;