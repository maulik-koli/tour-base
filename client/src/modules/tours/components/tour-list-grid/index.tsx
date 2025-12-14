import React from 'react'
import { ViewMode } from '@app/tours/page'

import { TourListCard, TourGridCard } from '../tour-card';
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils';

interface TourListGridProps {
    viewMode: ViewMode;
}


const TourListGrid: React.FC<TourListGridProps> = ({ viewMode }) => {
    // callng api here
    return (
        <div className='flex flex-col gap-4'>
            <Typography variant="small" className='my-2'>
                Showing 1-9 of 9 tours
            </Typography>
            <div className={cn(
                viewMode === 'list' ?
                    'flex flex-col gap-4'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
            )}>
                {Array.from({ length: 7 }).map((_, i) => {
                    return viewMode === 'grid' 
                        ? <TourGridCard key={i} />
                        : <TourListCard key={i} />
                })}
            </div>
        </div>
    )
}

export default TourListGrid
