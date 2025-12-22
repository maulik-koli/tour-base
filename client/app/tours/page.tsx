"use client"
import React from 'react'
import TourFilterHeader from '@modules/tours/components/tour-filter-header'
import TourListGrid from '@modules/tours/components/tour-list-grid'
import { Typography } from '@ui/typography'

export type ViewMode = 'grid' | 'list';


const ToursPage: React.FC = () => {
    const [viewMode, setViewMode] = React.useState<ViewMode>('list')
    
    const toggleViewMode = (mode: ViewMode) => {
        setViewMode(mode)
    }

    return (
        <div className='py-4 px-20 flex flex-col gap-4 bg-backgroud'>
            <div className='flex flex-col gap-2'>
                <Typography variant="h1" className='font-semibold'>
                    Explore Our Tours
                </Typography>
                <Typography variant="h4" className='text-muted-foreground font-normal'>
                    Discover amazing destinations and create unforgettable memories
                </Typography>
            </div>

            <TourFilterHeader viewMode={viewMode} onToggleViewMode={toggleViewMode} />

            <TourListGrid viewMode={viewMode} />
        </div>
    )
}

export default ToursPage
