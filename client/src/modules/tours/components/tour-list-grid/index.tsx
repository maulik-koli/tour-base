import React from 'react'
import { ViewMode } from '@app/tours/page'
import { useTourFilters } from '@/hooks/useTourFilters';
import { useGetTours } from '@modules/tours/api/queries';
import { cn } from '@/lib/utils';

import TourCard  from '../tour-card';
import ErrorBlock from '@/components/error-block';
import { Typography } from '@ui/typography'
import { CustomSpinner } from '@ui/spinner';

interface TourListGridProps {
    viewMode: ViewMode;
}


const TourListGrid: React.FC<TourListGridProps> = ({ viewMode }) => {
    const { filter } = useTourFilters()

    const { data, isLoading, error } = useGetTours({ 
        category: filter.category,
        duration: filter.duration,
        sort: filter.sort,
        search: filter.search,
        maxPrice: filter.maxPrice,
    });


    const getContent = () => {
        if (isLoading) {
            return <CustomSpinner 
                className='w-full min-h-80 flex items-center justify-center' 
            />
        }

        if (error) {
            return <ErrorBlock
                type='error' 
                message={error.message} 
                description='Please try again later.'
            />;
        }

        if(!data || (data && data.data?.tours.length === 0) || !data.data) {
            return <ErrorBlock 
                type='no-data'
                message='No tours found.'
                description='Please change your search criteria or create a new tour.'
            />
        }        

        const { totalItems, page, limit } = data.data?.pagination
        const start = (page - 1) * limit + 1;
        const end = Math.min(page * limit, totalItems);

        return (
            
            <>
                <Typography variant="small" className='my-2'>
                    Showing {start}-{end} of {totalItems} tours
                </Typography>
                <div className={cn(
                    viewMode === 'list' ?
                        'flex flex-col gap-6'
                        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
                )}>
                    {data.data.tours.map((tour) => (
                        <TourCard tour={tour} view={viewMode} key={tour._id} />
                    ))}
                </div>
            </>
        )
    }


    return (
        <div className='flex flex-col gap-4 pb-2'>
            {getContent()}
        </div>
    )
}

export default TourListGrid
