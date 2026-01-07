"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useBookingData } from '@modules/booking/api/queries'

import ErrorBlock from '@/components/error-block'
import BookingComponent from '@modules/booking/components/booking-component'
import { Typography } from '@ui/typography'
import { SpinnerOverlay } from '@ui/spinner'


const BookPackagePage: React.FC = () => {
    const { bookingId } = useParams();

    const { data, isError, isLoading, isFetching } = useBookingData({ bookingId: bookingId as string });

    if (isLoading) {
        return <div className='h-screen'><SpinnerOverlay /></div>
    }

    if (isError || !data || !data.data ||  (data.data && data?.data.isExpired)) {
        return (
            <ErrorBlock 
                type='error'
                message="Your session has expired or invalid. Please try to book again."
            />
        )
    }

    return (
        <div className='py-4 md:py-6 lg:py-8 px-4 md:px-12 lg:px-40 flex flex-col gap-4 md:gap-6 bg-background'>
            <div className='flex flex-col gap-2 my-2'>
                <Typography variant="h1" className='font-semibold'>
                    Complete Your Booking
                </Typography>
                <Typography variant="large" className='text-muted-foreground font-normal'>
                    Enter your details to book tour
                </Typography>
            </div>

            <BookingComponent 
                data={data.data}
                isFetching={isFetching}
            />  
        </div>
    )
}

export default BookPackagePage