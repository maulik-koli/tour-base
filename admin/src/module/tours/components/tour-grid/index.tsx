import React, { useEffect, useState } from 'react'
import TourCard from '../tour-card'
import TourFilter from '../tour-filter'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetTours } from '../../api/queries'
import { useToast } from '@/hooks/useToast'
import { logger } from '@/lib/utils'
import { CustomSpinner } from '@/components/ui/spinner'
import Icon from '@/components/icons'
import { Typography } from '@/components/ui/typography'
import ErrorBlock from '@/components/error-block'

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
