import React from 'react'
import { Metadata } from 'next'
import BookingsComponents from '@module/booking/components/bookings-components'
import PageTitle from '@/components/page-title'

export const metadata: Metadata = {
    title: 'Bookings',
    description: 'View and manage all tour bookings, payments, and customer information',
}

const BookingsPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <PageTitle
                title='Bookings'
                subtitle='View and manage all tour bookings'
            />

            <BookingsComponents />
        </div>
    )
}

export default BookingsPage
