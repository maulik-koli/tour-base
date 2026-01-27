"use client"
import React, { useState } from 'react'
import { GetRequestListParams } from '@module/request/api/types'
import { useGetRequestList } from '@module/request/api/queries'

import ErrorBlock from '@/components/error-block'
import PaginationComponent from '@ui/pagination-component'
import RequestCard from '../request-card'
import { CustomSpinner } from '@ui/spinner'


const RequestListComponent: React.FC = () => {
    const [filters, setFilters] = useState<GetRequestListParams>({
        limit: 25,
        page: 1,
    });

    const { data, error, isLoading } = useGetRequestList({
        limit: filters.limit,
        page: filters.page,
    });

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({
            ...prev,
            page,
        }));
    };

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

        if (!data || !data.data || (data && data.data?.requests.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No requests found.'
                description='There are no customer requests at the moment.'
            />
        }

        return (
            <>
                <div className='flex flex-col gap-4'>
                    {data.data.requests.map((request) => (
                        <RequestCard key={request._id} request={request} />
                    ))}
                </div>
                <PaginationComponent 
                    pagination={data.data.pagination} 
                    onPageChange={handlePageChange}
                />
            </>
        )
    }

    return (
        <>
            {getContent()}
        </>
    )
}

export default RequestListComponent;
