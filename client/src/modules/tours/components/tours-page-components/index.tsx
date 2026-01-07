"use client"
import React, { Suspense, useState } from 'react'
import { PaginationType } from '@/types/api';

import TourListGrid from '../tour-list-grid';
import TourPagination from '../tour-pagination';
import TourFilterHeader from '../tour-filter-header';
import { CustomSpinner } from '@ui/spinner';
import { Typography } from '@ui/typography';

export type ViewMode = 'grid' | 'list';


const TourPageComponent: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('list')
    const [pagination, setPagination] = useState<PaginationType | null>(null)
    
    const toggleViewMode = (mode: ViewMode) => {
        setViewMode(mode)
    }

    return (
        <div className='pt-4 pb-16 px-20 flex flex-col gap-4 bg-backgroud'>
            <div className='flex flex-col gap-2'>
                <Typography variant="h1" className='font-semibold'>
                    Explore Our Tours
                </Typography>
                <Typography variant="h4" className='text-muted-foreground font-normal'>
                    Discover amazing destinations and create unforgettable memories
                </Typography>
            </div>

            <Suspense fallback={<div><CustomSpinner /></div>}>
                <TourFilterHeader viewMode={viewMode} onToggleViewMode={toggleViewMode} />
            </Suspense>

            <Suspense fallback={<div><CustomSpinner /></div>}>
                <TourListGrid viewMode={viewMode} onPaginationChange={setPagination} />
            </Suspense>

            {pagination && <TourPagination pagination={pagination} />}
        </div>
    )
}

export default TourPageComponent
