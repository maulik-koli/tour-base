import React, { useState } from 'react'
import { useGetTours } from '@module/tours/api/queries'
import { useDebounce } from '@/hooks/useDebounce'

import TourCard from '../tour-card'
import TourFilter from '../tour-filter'
import ErrorBlock from '@/components/error-block'
import { CustomSpinner } from '@ui/spinner'

export type FilterType = {
    search: string | undefined;
    sort: string | undefined;
}

export type FilterFields = keyof FilterType;


const TourGrid: React.FC = () => {
    const [filters, setFilters] = useState<FilterType>({
        search: undefined,
        sort: undefined,
    });

    const debouncedSearch = useDebounce(filters.search, 300);

    const { data, error, isLoading } = useGetTours({
        search: debouncedSearch,
        sort: filters.sort,
    });

    const handleFilterChange = (name: FilterFields, value: string | undefined) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


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

        if(!data || (data && data.data?.tours.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No tours found.'
                description='Please change your search criteria or create a new tour.'
            />
        }

        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2'>
                {data.data?.tours.map((tour) => (
                    <TourCard tour={tour} key={tour.slug} />
                ))}
            </div>
        )
    }


    return (
        <>
            <TourFilter filter={filters} onChange={handleFilterChange} />
            {getContent()}
        </>
    )
}

export default TourGrid
