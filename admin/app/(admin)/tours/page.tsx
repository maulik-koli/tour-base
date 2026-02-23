import React from 'react'
import { Metadata } from 'next'
import ToursPageClient from '@module/tours/components/tours-page-client'

export const metadata: Metadata = {
    title: 'Tours',
    description: 'Manage all tours, packages, and tour details',
}

const TourPage: React.FC = () => {
    return <ToursPageClient />
}

export default TourPage
