import Booking from "../booking/booking.model";
import { asyncWrapper } from "@/api/utils/apiHelper";
import { CustomError, successResponse } from "@/api/utils/response";
import { sendBookingConfirmationMessage } from "./whatsapp.service";

export const testController = asyncWrapper(async (req, res) => {
    const booking = await Booking.findById("695c0acbc883072d57a40e63").lean();

    if (!booking) {
        throw new CustomError(404, "Booking not found");
    }

    await sendBookingConfirmationMessage(booking);

    successResponse(res, {
        message: "WhatsApp controller is working fine",
        status: 200,
        data: null
    });
});