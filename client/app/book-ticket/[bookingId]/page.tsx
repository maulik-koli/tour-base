"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import BookingSummery from '@modules/booking/components/booking-summery'
import CustomerDetailsForm from '@modules/booking/components/customer-details-form'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'
import { Button } from '@ui/button'
import ReceiptPayment from '@modules/booking/components/receipte'

type BookingStateType = "summary-and-details" | "final-receipt"


const BookTicket: React.FC = () => {
    const { bookingId } = useParams()
    const [bookingState, setBookingState] = useState<BookingStateType>("summary-and-details")

    const getContent = () => {
        if (bookingState === "summary-and-details") {
            return (
                <>
                    <BookingSummery />

                    <Separator />

                    <CustomerDetailsForm />
                </>
            )
        }
        else {
            return (
                <>
                    <ReceiptPayment />
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

            <div className={cn(
                'w-full flex items-center gap-4',
                bookingState === "summary-and-details" ? "justify-end" : "justify-between"
            )}>
                {bookingState === "final-receipt" && (
                    <Button type='button' onClick={() => setBookingState("summary-and-details")}>
                        <Icon name='ArrowLeft' width={10} height={16} />
                        Back
                    </Button>
                )}
                {bookingState === "summary-and-details" && (
                    <Button type='button' onClick={() => setBookingState("final-receipt")}>
                        Next
                        <Icon name='ArrowRight' width={10} height={16} />
                    </Button>
                )}
            </div>
        </div>
    )
}

export default BookTicket
