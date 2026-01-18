"use client"
import React, { useState } from 'react'
import { useGetBookingList } from '@module/booking/api/queries'
import { useDebounce } from '@/hooks/useDebounce'
import { GetBookingListParams } from '@module/booking/api/types'

import BookingsTable from '@module/booking/components/booking-table'
import BookingFilter from '@module/booking/components/booking-filter'
import ErrorBlock from '@/components/error-block'
import PaginationComponent from '@ui/pagination-component'
import { Typography } from '@ui/typography'
import { CustomSpinner } from '@ui/spinner'

export type FilterFields = keyof GetBookingListParams;


const BookingsPage: React.FC = () => {
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

    const handleFilterChange = (name: FilterFields, value: string | number | undefined) => {
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
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h2" className='font-semibold'>Bookings</Typography>
                    <Typography variant="small" className='text-muted-foreground font-normal'>
                        View and manage all tour bookings
                    </Typography>
                </div>
            </div>

            <BookingFilter filter={filters} onChange={handleFilterChange} />
            {getContent()}
        </div>
    )
}

export default BookingsPage
