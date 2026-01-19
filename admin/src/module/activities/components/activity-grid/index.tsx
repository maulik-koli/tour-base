"use client"
import React, { useCallback, useState } from 'react'
import { useGetActivities } from '@module/activities/api/queries'
import { useDebounce } from '@/hooks/useDebounce'

import ActivityCard from '../activity-card'
import ActivityFilter from '../activity-filter'
import ErrorBlock from '@/components/error-block'
import { CustomSpinner } from '@ui/spinner'


const ActivityGrid: React.FC = () => {
    const [searchFilters, setSearchFilters] = useState<string | undefined>(undefined);

    const debouncedSearch = useDebounce(searchFilters, 300);

    const { data, error, isLoading } = useGetActivities({
        search: debouncedSearch,
    });

    const handleFilterChange = useCallback((value: string | undefined) => {
        setSearchFilters(value);
    }, []);


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

        if(!data || (data && data.data?.activities.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No activities found.'
                description='Please change your search criteria or create a new activity.'
            />
        }

        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2'>
                {data.data?.activities.map((activity) => (
                    <ActivityCard activity={activity} key={activity.slug} />
                ))}
            </div>
        )
    }


    return (
        <>
            <ActivityFilter searchFilters={searchFilters} onChange={handleFilterChange} />
            {getContent()}
        </>
    )
}

export default ActivityGrid
