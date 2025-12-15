'use client'
import React from 'react'
import CardSliderWrapper from '@/modules/main/components/card-slider-wrapper'
import TourCard from '@/modules/tours/components/tour-card'
import SectionHeader from '@/modules/main/components/section-header'
import { DUMMY_TOURS } from '@/modules/tours/api/types'


const FeatureTourSlider: React.FC = () => {
    // call feature api

    return (
        <div className='p-20 bg-background'>
            <SectionHeader
                title={<>Start Your Next <span className="text-primary">Adventure</span></>}
                subtitle="Discover destinations, cultures, and experiences that make every journey meaningful and memorable."
            />

            <CardSliderWrapper tours={DUMMY_TOURS} >
                {(tour) => <TourCard tour={tour} view="grid" />}
            </CardSliderWrapper>
        </div>
    )
}

export default FeatureTourSlider
