import express from "express";
import { cashfreeWebhookController } from "./payment.controller";

const router = express.Router();

router.post(
    "/cashfree/webhook",
    cashfreeWebhookController
)

export default router;