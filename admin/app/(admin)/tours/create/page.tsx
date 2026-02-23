import React from 'react'
import { Metadata } from 'next'
import CreateTourPageClient from '@module/tours/components/create-tour-page-client'

export const metadata: Metadata = {
    title: 'Create Tour',
    description: 'Create a new tour with packages, itinerary, and details',
}

const CreateTourPage: React.FC = () => {
    return <CreateTourPageClient />
}

export default CreateTourPage
