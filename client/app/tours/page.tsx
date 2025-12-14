import React from 'react'
import { Typography } from '@/components/ui/typography'
import TourFilterHeader from '@/modules/tours/components/tour-filter-header'
import TourListGrid from '@/modules/tours/components/tour-list-grid'


const ToursPage: React.FC = () => {
    return (
        <div className='py-4 px-20 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Typography variant="h1" className='font-semibold'>
                    Explore Our Tours
                </Typography>
                <Typography variant="h4" className='text-muted-foreground font-normal'>
                    Discover amazing destinations and create unforgettable memories
                </Typography>
            </div>

            <TourFilterHeader />

            <TourListGrid />
        </div>
    )
}

export default ToursPage
