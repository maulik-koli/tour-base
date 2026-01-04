"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useBookingData } from '@modules/booking/api/queries'

import Icon from '@/components/icons'
import PaymentSubmit from '@modules/booking/components/payment-submit'
import PaymentTerms from '@modules/booking/components/payment-terms'
import BookingSummery from '@modules/booking/components/booking-summery'
import CustomerDetailsForm from '@modules/booking/components/customer-details-form'
import ReceiptPayment from '@modules/booking/components/receipte'
import ErrorBlock from '@/components/error-block'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'
import { SpinnerOverlay } from '@ui/spinner'
import { Button } from '@ui/button'

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
            return (
                <>
                    <BookingSummery 
                        tour={data.data.tour}
                        packageData={data.data.package}
                    />
                    <Separator />
                    <CustomerDetailsForm 
                        key={isLoading ? 'loading' : 'loaded'}
                        bookingId={data.data.bookingId}
                        customerDetails={data.data.customerBookingDetails}
                        handleOnSubmit={() => setBookingState("receipt")}
                    />
                </>
            )
        }
        else {
            return (
                <>
                    <div className='w-full bg-card py-4 px-8 border border-border rounded-md flex flex-col gap-6'>
                        <ReceiptPayment data={data.data} />
                        <PaymentSubmit />
                        <PaymentTerms />        
                    </div>
                    <div className='w-full flex items-center gap-4 justify-start'>
                        <Button type='button' onClick={() => setBookingState("details")}>
                            <Icon name='ArrowLeft' width={10} height={16} />
                            Previous
                        </Button>
                    </div>
                </>
            )
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