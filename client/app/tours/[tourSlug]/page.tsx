'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import DefaultPage from '@/components/default-page'

const TourDetailPage: React.FC = () => {
    const { tourSlug } = useParams();
    
    return (
        <DefaultPage page={`Tour Detail Page: ${tourSlug}`} />
    )
}

export default TourDetailPage
