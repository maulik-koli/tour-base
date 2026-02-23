"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGetActivity } from '@module/activities/api/queries'

import ErrorBlock from '@/components/error-block'
import UpdateActivityForm from '@module/activities/forms/update-activity-form'
import { SpinnerOverlay } from '@ui/spinner'


const ActivityDetailPageClient: React.FC = () => {
    const slug = useParams().slug;
    const [isMount, setIsMount] = React.useState(false);

    const { data, error, isLoading } = useGetActivity(
        { slug: slug as string },
        isMount
    );

    useEffect(() => {
        if (isMount) return;
        setIsMount(true);
    }, [isMount]);
    
    const getContent = () => {
        if (isLoading || !isMount) {
            return <SpinnerOverlay />
        }
        else if (error) {
            return <ErrorBlock type='error' message={error.message} />
        }
        else if (!data?.data) {
            return <ErrorBlock type='no-data' message="Activity not found!" />
        }
        else {
            return (
                <UpdateActivityForm data={data.data} />
            )
        }
    }

    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            {getContent()}
        </div>
    )
}

export default ActivityDetailPageClient
