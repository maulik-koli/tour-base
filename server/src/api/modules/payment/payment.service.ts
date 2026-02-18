import axios from "axios";
import crypto from "crypto";
import { env } from "@/api/config/env";
import { BookingLean } from "../booking/booking.model";
import { CashFreeOrderResponse } from "./payment.types";

import { CustomError } from "@/api/utils/response";
import { log } from "@/api/utils/log";

const CASHFREE_API_KEY = env.CASHFREE_API_KEY;
const CASHFREE_API_SECRET = env.CASHFREE_API_SECRET;
const CASHFREE_API_VERSION = env.CASHFREE_API_VERSION;
const CURRENCY = "INR";

const CLIENT_URL = env.ALLOWED_URL.split(',')[0] || "http://localhost:3001";
const PAYMENT_EXPIRY_TIME = 20 * 60 * 1000; // 20 minutes

type CreateCashFreeArgs = {
    paymentAmount: number;
    customerDetails: BookingLean['customerDetails'];
    bookingId: string;
}


class PaymentService {
    public async createCashFreeOrder(args: CreateCashFreeArgs) {
        const { paymentAmount, customerDetails, bookingId } = args;

        const url = "https://sandbox.cashfree.com/pg/orders";

        const headers = {
            'x-api-version': CASHFREE_API_VERSION,
            'x-client-id': CASHFREE_API_KEY,
            'x-client-secret': CASHFREE_API_SECRET,
            'Content-Type': 'application/json'
        }

        const body = {
            order_amount: paymentAmount,
            order_currency: CURRENCY,
            customer_details: {
                customer_id: `customer_${bookingId}`,
                customer_phone: customerDetails?.phone1,
                customer_name: customerDetails?.fullName,
            },
            order_id: bookingId,
            order_meta: {
                return_url: `${CLIENT_URL}/payment-status?bookingId=${bookingId}`,
            },
            order_expiry_time: new Date(Date.now() + PAYMENT_EXPIRY_TIME).toISOString(),
        }

        try {
            if (paymentAmount <= 0) {
                throw new Error("Invalid Payment Amount");
            }

            const response = await axios.post<CashFreeOrderResponse>(url, body, { headers });
            return response.data;
        }
        catch (error: any) {
            log.error("Error creating Cashfree Order:", {
                message: error.message,
                response: error.response?.data,
            });
            throw new CustomError(500, "Failed to create payment order");
        }
    }

    public verifyCashFreeWebhookSignature(rawBody: any, signature: string, timestamp: string): boolean {
        const message = timestamp + rawBody

        const expectedSignature = crypto
            .createHmac("sha256", CASHFREE_API_SECRET)
            .update(message)
            .digest("base64");

        log.info("Verifying Cashfree Signature:", {
            expectedSignature,
            signature
        });

        return expectedSignature === signature;
    }



    // this is tempory code, to generate UPI QR code, till payment gateway apporves
    public generateUPIQRCode(args: CreateCashFreeArgs) {
        const { paymentAmount, customerDetails, bookingId } = args;

        const upiId = env.MERCHANT_UPI_ID;
        const merchantName = env.MERCHANT_NAME;

        const url = new URL("upi://pay");

        url.searchParams.append("pa", upiId);
        url.searchParams.append("pn", merchantName);
        url.searchParams.append("am", paymentAmount.toString());
        url.searchParams.append("cu", "INR");
        url.searchParams.append("tn", `ORDER_${bookingId}`);

        const upiUrl = url.toString();

        return {
            upiUrl,
        }
    }
}

export const paymentService = new PaymentService();