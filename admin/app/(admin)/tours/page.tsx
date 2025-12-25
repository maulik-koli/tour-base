"use client"
import React from 'react'
import TourHeader from '@module/tours/components/tour-header'
import TourGrid from '@module/tours/components/tour-grid'


const TourPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <TourHeader />   
            <TourGrid />
        </div>
    )
}

export default TourPage
