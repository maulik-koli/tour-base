import express from "express";
import { 
    adminBookingListZodSchema,
    bookingPaymentZodSchema, 
    bookingStatusZodSchema, 
    createBookingZodSchema, 
    customerDetailsZodSchema 
} from "./booking.schema";
import { 
    adminDeleteBookingController,
    adminGetBookingController,
    adminGetBookingsListController,
    bookingPaymentController,
    createBookingController, 
    customerBookingController, 
    getbookingController
} from "./booking.controller";
import { authMiddleware } from "@/api/middlewares/auth.middleware";
import { bookingMiddleware } from "@/api/middlewares/booking.middleware";
import { validateQuery, validateRequest } from "@/api/middlewares/validate.middlewate";

const router = express.Router();

router.get(
    "/admin/list",
    authMiddleware,
    validateQuery(adminBookingListZodSchema),
    adminGetBookingsListController,
)

router.get(
    "/admin/:bookingId",
    authMiddleware,
    adminGetBookingController
)

router.delete(
    "/admin/:bookingId",
    authMiddleware,
    adminDeleteBookingController
)

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
    bookingMiddleware,
    validateRequest(bookingPaymentZodSchema),
    bookingPaymentController
)

router.get(
    "/:bookingId",
    validateQuery(bookingStatusZodSchema),
    getbookingController
)

export default router;