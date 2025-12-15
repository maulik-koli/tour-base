import React from 'react'
import { ViewMode } from '@app/tours/page'
import { DUMMY_TOURS } from '../../api/types';
import { cn } from '@/lib/utils';

import TourCard  from '../tour-card';
import { Typography } from '@/components/ui/typography'

interface TourListGridProps {
    viewMode: ViewMode;
}


const TourListGrid: React.FC<TourListGridProps> = ({ viewMode }) => {
    // callng api here

    return (
        <div className='flex flex-col gap-4 pb-2'>
            <Typography variant="small" className='my-2'>
                Showing 1-9 of 9 tours
            </Typography>
            <div className={cn(
                viewMode === 'list' ?
                    'flex flex-col gap-6'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
            )}>
                {DUMMY_TOURS.map((tour) => (
                    <TourCard tour={tour} view={viewMode} key={tour._id} />
                ))}
            </div>
        </div>
    )
}

export default TourListGrid
