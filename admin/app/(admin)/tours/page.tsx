"use client"
import React from 'react'
import TourHeader from '@module/tours/components/tour-header'
import TourGrid from '@module/tours/components/tour-grid'


const TourPage: React.FC = () => {
    return (
        <div className='py-4 px-8 flex flex-col gap-4 bg-background'>
            <TourHeader />   
            <TourGrid />
        </div>
    )
}

export default TourPage
