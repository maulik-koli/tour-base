"use client"
import React, { useState } from 'react'
import { BookingFilterFields, GetBookingListParams } from '@module/booking/api/types';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetBookingList } from '@module/booking/api/queries';

import ErrorBlock from '@/components/error-block';
import BookingsTable from '../booking-table';
import PaginationComponent from '@ui/pagination-component';
import BookingFilter from '../booking-filter';
import { CustomSpinner } from '@ui/spinner';


const BookingsComponents: React.FC = () => {
    const [filters, setFilters] = useState<GetBookingListParams>({
        search: undefined,
        status: undefined,
        limit: 20,
        page: 1,
    });

    const debouncedSearch = useDebounce(filters.search, 300);

    const { data, error, isLoading } = useGetBookingList({
        search: debouncedSearch,
        status: filters.status,
        limit: filters.limit,
        page: filters.page,
    })

    const handleFilterChange = (name: BookingFilterFields, value: string | number | undefined) => {
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
            />
        }

        if(!data || !data.data || (data && data.data?.bookings.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No bookings found.'
                description='Please change your search criteria or create a new booking.'
            />
        }

        return (
            <>
                <BookingsTable bookingsList={data.data.bookings || []} />
                <PaginationComponent 
                    pagination={data.data.pagination} 
                    onPageChange={(page) => handleFilterChange("page", page)}
                />
            </>
        )
    }


    return (
        <>
            <BookingFilter filter={filters} onChange={handleFilterChange} />
            {getContent()}
        </>
    )
}

export default BookingsComponents
