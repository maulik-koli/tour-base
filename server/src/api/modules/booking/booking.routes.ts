import express from "express";
import { 
    bookingPaymentZodSchema, 
    bookingStatusZodSchema, 
    createBookingZodSchema, 
    customerDetailsZodSchema 
} from "./booking.schema";
import { 
    bookingPaymentController,
    createBookingController, 
    customerBookingController, 
    getbookingController
} from "./booking.controller";
import { bookingMiddleware } from "@/api/middlewares/booking.middleware";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";

const router = express.Router();


// public api
router.post(
    "/",
    validateRequest(createBookingZodSchema),
    createBookingController
)

router.patch(
    "/:bookingId/customer",
    bookingMiddleware,
    validateRequest(customerDetailsZodSchema),
    customerBookingController
)

router.patch(
    "/:bookingId/payment",
    validateRequest(bookingPaymentZodSchema),
    bookingPaymentController
)

router.get(
    "/:bookingId",
    validateQuery(bookingStatusZodSchema),
    getbookingController
)


export default router;