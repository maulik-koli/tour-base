'use client'
import React from 'react'
import { useGetFeaturedTours } from '@modules/tours/api/queries'

import CardSliderWrapper from '@modules/main/components/card-slider-wrapper'
import TourCard from '@modules/tours/components/tour-card'
import SectionHeader from '@modules/main/components/section-header'
import ErrorBlock from '@/components/error-block'
import { CustomSpinner } from '@ui/spinner'


const FeatureTourSlider: React.FC = () => {
    const { data, isLoading, error } = useGetFeaturedTours();

    const getContent = () => {
        if (isLoading) {
            return <CustomSpinner />
        }

        if (error || !data || !data.data || data.data.length === 0) {
            return <ErrorBlock
                type='error' 
                message={error ? error.message : 'Failed to load featured tours.'} 
                description='Please try again later.'
                className='min-h-60'
            />;
        }

        return (
            <CardSliderWrapper tours={data.data} >
                {(tour) => <TourCard tour={tour} view="grid" />}
            </CardSliderWrapper>
        )
    }

    return (
        <div className='p-20 bg-background'>
            <SectionHeader
                title={<>Start Your Next <span className="text-primary">Adventure</span></>}
                subtitle="Discover destinations, cultures, and experiences that make every journey meaningful and memorable."
            />

            {getContent()}
        </div>
    )
}

export default FeatureTourSlider
