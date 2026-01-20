"use client"
import React, { Suspense, useState } from 'react'
import { PaginationType } from '@/types/api';

import TourListGrid from '../tour-list-grid';
import TourFilterHeader from '../tour-filter-header';
import PaginationComponent from '@/components/pagination';
import PageHeader from '@/components/page-header';
import { CustomSpinner } from '@ui/spinner';

export type ViewMode = 'grid' | 'list';


const TourPageComponent: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('list')
    const [pagination, setPagination] = useState<PaginationType | null>(null)
    
    const toggleViewMode = (mode: ViewMode) => {
        setViewMode(mode)
    }

    return (
        <div className='bg-backgroud'>
            <PageHeader 
                title="Explore Our Tours"
                subtitle="Discover amazing experiences and adventures in beautiful destinations"
                align="left"
            />
            
            <div className='px-4 md:px-12 lg:px-20 pt-6 md:pt-8 pb-8 md:pb-12 lg:pb-16 flex flex-col gap-4 md:gap-6'>
            <Suspense fallback={<div><CustomSpinner /></div>}>
                <TourFilterHeader viewMode={viewMode} onToggleViewMode={toggleViewMode} />
            </Suspense>

            <Suspense fallback={<div><CustomSpinner /></div>}>
                <TourListGrid viewMode={viewMode} onPaginationChange={setPagination} />
            </Suspense>

            {pagination && <PaginationComponent pagination={pagination} />}
            </div>
        </div>
    )
}

export default TourPageComponent
