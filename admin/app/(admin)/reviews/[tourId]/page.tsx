import React from 'react'
import { Metadata } from 'next'
import ReviewDetailPageClient from '@module/review/components/review-detail-page-client'

export const metadata: Metadata = {
    title: 'Tour Reviews',
    description: 'Manage and respond to customer reviews for this tour',
}

const ReviewDetailPage: React.FC = () => {
    return <ReviewDetailPageClient />
}

export default ReviewDetailPage
