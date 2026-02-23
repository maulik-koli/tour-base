import React from 'react'
import { Metadata } from 'next'
import BookingDetailPageClient from '@module/booking/components/booking-detail-page-client'

export const metadata: Metadata = {
    title: 'Booking Details',
    description: 'View complete booking information, customer details, and payment status',
}

const BookingDetail: React.FC = () => {
    return <BookingDetailPageClient />
}

export default BookingDetail
