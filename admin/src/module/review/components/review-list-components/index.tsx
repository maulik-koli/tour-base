"use client"
import React, { useState } from 'react'
import { TourReviewFilterFields, GetTourReviewListParams } from '@module/review/api/types';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetTourReviewList } from '@module/review/api/queries';

import ErrorBlock from '@/components/error-block';
import ReviewTourTable from '../review-tour-table';
import PaginationComponent from '@ui/pagination-component';
import ReviewFilter from '../review-filter';
import { CustomSpinner } from '@ui/spinner';


const ReviewListComponents: React.FC = () => {
    const [filters, setFilters] = useState<GetTourReviewListParams>({
        search: undefined,
        limit: 25,
        page: 1,
    });

    const debouncedSearch = useDebounce(filters.search, 300);

    const { data, error, isLoading } = useGetTourReviewList({
        search: debouncedSearch,
        limit: filters.limit,
        page: filters.page,
    });

    const handleFilterChange = (
        name: TourReviewFilterFields, 
        value: string | number | undefined
    ) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
            ...(name !== 'page' && { page: 1 }), // reset page when other filters change
        }));
    };

    const getContent = () => {
        if (isLoading) {
            return (
                <CustomSpinner
                    className='w-full min-h-80 flex items-center justify-center' 
                />
            );
        }

        if (error) {    
            return (
                <ErrorBlock 
                    type='error' 
                    message={error.message} 
                    description='Please try again later.'
                />
            );
        }

        if (!data || !data.data || data.data.tours.length === 0) {
            return (
                <ErrorBlock 
                    type='no-data'
                    message='No tours with reviews found.'
                    description='Tours will appear here once they have reviews.'
                />
            );
        }

        const pageOffset = ((filters.page || 1) - 1) * (filters.limit || 25);

        return (
            <>
                <ReviewTourTable 
                    tourList={data.data.tours} 
                    pageOffset={pageOffset}
                />
                <PaginationComponent 
                    pagination={data.data.pagination} 
                    onPageChange={(page) => handleFilterChange("page", page)}
                />
            </>
        );
    };


    return (
        <>
            <ReviewFilter filter={filters} onChange={handleFilterChange} />
            {getContent()}
        </>
    );
};

export default ReviewListComponents;
