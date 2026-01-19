import { verifyCashfreeSignature } from "./payment.service";
import { updateBookingPaymentStatus } from "../booking/booking.service";
import { CashfreePaymentWebhookPayload } from "./payment.types";

import { asyncWrapper } from "@/api/utils/asyncWrapper";
import { CustomError, successResponse } from "@/api/utils/response";
import { log } from "@/api/utils/log";


export const cashfreeWebhookController = asyncWrapper(async (req, res) => {
    const rawBody = (req as any).rawBody;

    const signature = req.headers["x-webhook-signature"];
    const timestamp = req.headers["x-webhook-timestamp"];

    log.info("Cashfree Webhook Received:", {
        rawBody,
        type: typeof rawBody,
    });

    if (!signature || typeof signature !== "string" || !timestamp || typeof timestamp !== "string") {
        throw new CustomError(400, "Missing webhook signature")
    }

    const isValid = verifyCashfreeSignature(rawBody, signature, timestamp);
        
    if (!isValid) {
        throw new CustomError(400, "Invalid webhook signature")
    }

    const payload = JSON.parse(rawBody) as CashfreePaymentWebhookPayload;

    // case when testing webhook
    if (!payload.data.order) {
        successResponse(res, {
            message: "Webhook test successfully",
            status: 200,
            data: null,
        });
        return;
    }

    const updatedResult = await updateBookingPaymentStatus({
        order: payload.data.order,
        payment: payload.data.payment,
    });

    successResponse(res, {
        message: "Webhook received successfully",
        status: 200,
        data: null,
    });
});