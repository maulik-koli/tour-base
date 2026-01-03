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
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";

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

router.get(
    "/:bookingId",
    validateQuery(bookingStatusZodSchema),
    getbookingController
)


export default router;