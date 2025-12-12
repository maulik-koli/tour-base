'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import DefaultPage from '@/components/default-page'

const TourBookPage: React.FC = () => {
    const { tourSlug } = useParams();
    
    return (
        <DefaultPage page={`Book Tour Page: ${tourSlug}`} />
    )
}

export default TourBookPage
