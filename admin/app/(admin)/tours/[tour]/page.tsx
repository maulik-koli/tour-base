import React from 'react'
import { Metadata } from 'next'
import TourDetailPageClient from '@module/tours/components/tour-detail-page-client'

export const metadata: Metadata = {
    title: 'Tour Details',
    description: 'View and edit tour information, packages, and itinerary',
}

const TourPage: React.FC = () => {
    return <TourDetailPageClient />
}

export default TourPage
