import axios from "axios"
import { env } from "@/api/config/env"
import { log } from "@/api/utils/log"
import { BookingLean } from "../booking/booking.model"

// this is just test service
export const sendBookingConfirmationMessage = async (booking: BookingLean) => {
    const URL = `https://graph.facebook.com/v22.0/968375416352885/messages`;
    const headers = {
        Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    const parameters = [
        { type: "text", text: booking.tourDetails?.tourName },
        { type: "text", text: booking.packageDetails?.packageName },
        { type: "text", text: booking.packageDetails?.days.toString() },
        { type: "text", text: booking.packageDetails?.nights.toString() },
        { type: "text", text: booking.packageDetails?.startCity },
        { type: "text", text: booking.packageDetails?.endCity },
        { type: "text", text: booking.customerDetails?.fullName },
        { type: "text", text: booking.customerDetails?.phone1 },
        { type: "text", text: booking.customerDetails?.phone2 },
        { type: "text", text: `{Total: ${booking.customerDetails?.dateOfTravel.toDateString()} members}` },
        { type: "text", text: booking.totalAmount?.toString() },
        { type: "text", text: booking.paymentDetails?.order_amount.toString() },
        { 
            type: "text", 
            text: booking.bookingStatus === "PAID_FULL" 
                    ? "Paid in Full" 
                    : booking.bookingStatus === "PAID_PARTIAL"
                        ? "Paid Partially"
                        : "Uknown (please contact us)"
        },
        { type: "text", text: booking.customerDetails?.dateOfTravel.toISOString() }
    ]

    try {
        const response = await axios.post(URL, {
            messaging_product: "whatsapp",
            to: "919428088432",
            type: "template",
            template: {
                name: "hello_world",
                language: {
                    code: "en_US"
                },
                // components: [
                //     {
                //         type: "body",
                //         parameters
                //     }
                // ]
            }
        }, { headers });

        log.info("WhatsApp API response:", response.data)
        return response.data;
    }
    catch (error: any) {
        log.error("Error sending WhatsApp message:", error.response.data)
        throw error;
    }
}


export async function registerPhoneNumber() {
    try {
        const response = await axios.post(
            'https://graph.facebook.com/v22.0/988000887721791/register',
            {
                messaging_product: "whatsapp",
                pin: "123456"  // Choose any 6-digit PIN
            },
            {
                headers: {
                    Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log("Registration successful:", response.data);
    } catch (error: any) {
        console.error("Registration error:", error.response?.data);
        throw error;
    }
}