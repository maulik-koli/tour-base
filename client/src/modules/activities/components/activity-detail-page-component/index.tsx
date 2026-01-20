"use client"
import React from 'react'
import { useGetActivityDetails } from '@modules/activities/api/quries'

import ActivityDetailContent from '../activity-detail-content'
import ErrorBlock from '@/components/error-block'
import { SpinnerOverlay } from '@ui/spinner'


const ActivityDetailPageComponent: React.FC<{ slug: string}> = ({ slug }) => {
    const { data, isLoading, error } = useGetActivityDetails({
        slug: slug
    })

    if (isLoading) {
        return <div className='h-screen'><SpinnerOverlay /></div>
    }

    if (error) {
        return <ErrorBlock type='error' message="Unable to load activity details" />
    }

    if (!data || !data.data) {
        return <ErrorBlock type='no-data' message="Activity not found!" redirectUrl="/activities" />
    }

    return <ActivityDetailContent activity={data.data} />
}

export default ActivityDetailPageComponent
