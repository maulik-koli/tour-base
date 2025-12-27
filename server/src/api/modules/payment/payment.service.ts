import axios from "axios";
import { env } from "@/api/config/env";
import { BookingLean } from "../booking/booking.model";
import { CustomError } from "@/api/utils/response";

const CASHFREE_API_KEY = env.CASHFREE_API_KEY;
const CASHFREE_API_SECRET = env.CASHFREE_API_SECRET;
const CASHFREE_API_VERSION = env.CASHFREE_API_VERSION;
const CURRENCY = "INR";

export const createCashFreeOrder = async (
    paymentAmount: number, customerDetails: BookingLean['customerDetails'], bookingId: string
) => {
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
    }

    try {
        if (paymentAmount <= 0) {
            throw new Error("Invalid Payment Amount");
        }

        const response = await axios.post(url, body, { headers });
        return response.data;
    }
    catch (error) {
        throw new CustomError(500, "Failed to create payment order");
    }
}