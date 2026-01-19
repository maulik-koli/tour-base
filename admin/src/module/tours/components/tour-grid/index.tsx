import React, { useState } from 'react'
import { useGetTours } from '@module/tours/api/queries'
import { useDebounce } from '@/hooks/useDebounce'

import TourCard from '../tour-card'
import TourFilter from '../tour-filter'
import ErrorBlock from '@/components/error-block'
import PaginationComponent from '@ui/pagination-component'
import { CustomSpinner } from '@ui/spinner'
import { GetToursParams, TourFilterFields } from '@module/tours/api/types'


const TourGrid: React.FC = () => {
    const [filters, setFilters] = useState<GetToursParams>({
        search: undefined,
        sort: undefined,
        page: 1,
        limit: 21,
    });

    const debouncedSearch = useDebounce(filters.search, 300);

    const { data, error, isLoading } = useGetTours({
        search: debouncedSearch,
        sort: filters.sort,
        page: filters.page,
        limit: filters.limit,
    });

    const handleFilterChange = (name: TourFilterFields, value: string | undefined) => {
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

        if(!data || !data.data || (data && data.data?.tours.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No tours found.'
                description='Please change your search criteria or create a new tour.'
            />
        }

        return (
            <>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2'>
                    {data.data?.tours.map((tour) => (
                        <TourCard tour={tour} key={tour.slug} />
                    ))}
                </div>
                <PaginationComponent 
                    pagination={data.data.pagination} 
                    onPageChange={(page) => handleFilterChange("page", page.toString())}
                />
            </>
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
