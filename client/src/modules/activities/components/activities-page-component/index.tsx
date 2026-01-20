"use client"
import React, { useEffect, useState } from 'react'
import { useGetActivities } from '@modules/activities/api/quries'
import { useActivityFilters } from '@/hooks/useActivityFilters'
import { PaginationType } from '@/types/api'

import PageHeader from '@/components/page-header'
import ErrorBlock from '@/components/error-block'
import ActivityFilterHeader from '../activity-filter-header'
import PaginationComponent from '@/components/pagination'
import ActivityCard from '../activity-card'
import { Typography } from '@ui/typography'
import { CustomSpinner } from '@ui/spinner'


const ActivitiesPageComponent: React.FC = () => {
    const { filter } = useActivityFilters();
    const [pagination, setPagination] = useState<PaginationType | null>(null);

    const { data, error, isLoading } = useGetActivities({
        search: filter.search,
        page: filter.page,
        limit: filter.limit,
    });

    useEffect(() => {
        if (data?.data?.pagination) {
            setPagination(data.data.pagination);
        } else {
            setPagination(null);
        }
    }, [data]);


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

        if(!data || !data.data || (data && data.data?.activities.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No activities found.'
                description='Please change your search criteria or create a new activity.'
            />
        }

        const { totalItems, page, limit } = data.data?.pagination
        const start = (page - 1) * limit + 1;
        const end = Math.min(page * limit, totalItems);
        const activities = data.data.activities

        return (
            <>
                <Typography variant="small" className='my-2'>
                    Showing {start}-{end} of {totalItems} activities
                </Typography>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                    {activities.map((activity) => (
                        <ActivityCard key={activity._id} activity={activity} />
                    ))}
                </div>
            </>
        )
    }



    return (
        <div className='bg-background min-h-screen'>
            <PageHeader 
                title="Explore Activities"
                subtitle="Discover amazing experiences and adventures in beautiful destinations"
                align="left"
            />
            
            <div className='px-4 md:px-12 lg:px-20 pt-6 md:pt-8 pb-8 md:pb-12 lg:pb-16 flex flex-col gap-4 md:gap-6'>
                <ActivityFilterHeader />
                
                {getContent()}
                
                {pagination && <PaginationComponent pagination={pagination} />}
            </div>
        </div>
    )
}

export default ActivitiesPageComponent
