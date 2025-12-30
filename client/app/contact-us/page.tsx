"use client"
import React from "react";
import { useCashfree } from "@/hooks/useCashfree";
import { Button } from "@ui/button";
import { logger } from "@/lib/utils";

const ContactUsPage: React.FC = () => {
    const { cashfree, isLoaded } = useCashfree('sandbox');

    logger('isLoaded', isLoaded);

    const handlePayment = async () => {
        if (!cashfree) return;

        try {
            const result = await cashfree.checkout({
                paymentSessionId: "session_0mMyA1y5b8V9FV4cuTObIKJB36Js19FCA-Yz3Xjgxqi7AZ-8oLSAHd6MGZEl9tFjNkpzloVbgImgKFzfUJUTupmp091hRJZYxHmqyc6jtPAFm1TK2boSbebvHit-sApaymentpayment",
            });

            console.log(result);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Button type="button" onClick={handlePayment}>
            Pay Now
        </Button>
    );
}

export default ContactUsPage;