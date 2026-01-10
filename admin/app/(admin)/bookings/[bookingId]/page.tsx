"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetBookingDetails } from '@module/booking/api/queries'

import ErrorBlock from '@/components/error-block'
import BookingDetailsComponent from '@module/booking/components/booking-details'
import { Typography } from '@ui/typography'
import { CustomSpinner } from '@ui/spinner'
import { DeleteBookingButton } from '@module/booking/components/booking-actions-btn'


const BookingDetail: React.FC = () => {
    const { bookingId } = useParams() as { bookingId: string };
    const { data, error, isLoading } = useGetBookingDetails({
        bookingId,
    });

    const getContent = () => {
        if (isLoading) {
            return <CustomSpinner
                className='w-full min-h-80 flex items-center justify-center' 
            />
        }

        if (error) {
            return <ErrorBlock
                type='error' 
                message={error.message} 
                description='Please try again later.'
            />;
        }

        if(!data || !data.data) {
            return <ErrorBlock 
                type='no-data'
                message='No bookings found.'
                description='Please change your search criteria or create a new booking.'
            />
        }

        return <BookingDetailsComponent booking={data.data} />
    }


    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h2" className='font-semibold'>Booking Details</Typography>
                    <Typography variant="small" className='text-muted-foreground font-normal'>
                        View booking information and manage status
                    </Typography>
                </div>
                <DeleteBookingButton bookingId={bookingId} />
            </div>

            {getContent()}
        </div>
    )
}

export default BookingDetail
