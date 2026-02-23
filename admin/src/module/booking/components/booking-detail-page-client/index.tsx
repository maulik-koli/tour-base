"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetBookingDetails } from '@module/booking/api/queries'

import ErrorBlock from '@/components/error-block'
import BookingDetailsComponent from '@module/booking/components/booking-details'
import PageTitle from '@/components/page-title'
import { CustomSpinner } from '@ui/spinner'
import { DeleteBookingButton } from '@module/booking/components/booking-actions-btn'


const BookingDetailPageClient: React.FC = () => {
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
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
                <PageTitle
                    title='Booking Details'
                    subtitle='View booking information and manage status'
                />
                <DeleteBookingButton bookingId={bookingId} />
            </div>

            {getContent()}
        </div>
    )
}

export default BookingDetailPageClient
