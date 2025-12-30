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
                paymentSessionId: "session_H3S4I1EMpw87vhY0JUdhzd8JPEV0q3zAzM3dvWKylvriV2epp-6U6Xkh-l2BPHLIsxxBYsq-fob1g-3FGCVXZq2m7okrkvQIVObbPjGnCFu-4a3Oco-05WHHUQBiIQpaymentpayment",
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