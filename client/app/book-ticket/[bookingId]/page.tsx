"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useBookingData } from '@modules/booking/api/queries'

import BookingSummery from '@modules/booking/components/booking-summery'
import CustomerDetailsForm from '@modules/booking/components/customer-details-form'
import ReceiptPayment from '@modules/booking/components/receipte'
import ErrorBlock from '@/components/error-block'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'
import { SpinnerOverlay } from '@ui/spinner'
import { logger } from '@/lib/utils'

type BookingStateType = "details" | "receipt"


const BookTicket: React.FC = () => {
    const { bookingId } = useParams();
    const [bookingState, setBookingState] = useState<BookingStateType>("details")

    const { data, isError, isLoading } = useBookingData({ bookingId: bookingId as string });

    if (isLoading) {
        return <SpinnerOverlay />
    }

    if (isError || !data || (data.data && data?.data.isExpired)) {
        return (
            <ErrorBlock 
                type='error'
                message="Your session has expired or invalid. Please try to book again."
            />
        )
    }


    const getContent = () => {
        if (!data.data) return null;

        if (bookingState === "details") {
            logger("Rendering Customer Details Form", { bookingId, customerDetails: data.data.customerBookingDetails });
            return (
                <>
                    <BookingSummery data={data.data} />
                    <Separator />
                    <CustomerDetailsForm 
                        key={isLoading ? 'loading' : 'loaded'}
                        bookingId={data.data.bookingId}
                        customerDetails={data.data.customerBookingDetails}
                    />
                </>
            )
        }
        else {
            return <ReceiptPayment />
        }
    }

    return (
        <div className='py-4 px-40 flex flex-col gap-6 bg-background'>
            <div className='flex flex-col gap-2 my-2'>
                <Typography variant="h2" className='font-semibold'>
                    Complete Your Booking
                </Typography>
                <Typography variant="large" className='text-muted-foreground font-normal'>
                    Enter your details to book tour
                </Typography>
            </div>

            {getContent()}
        </div>
    )
}

export default BookTicket