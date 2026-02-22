"use client"
import React from 'react'
import TourHeader from '@module/tours/components/tour-header'
import TourGrid from '@module/tours/components/tour-grid'


const TourPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <TourHeader />   
            <TourGrid />
        </div>
    )
}

export default TourPage
