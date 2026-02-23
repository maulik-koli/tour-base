import React from 'react'
import { Metadata } from 'next'
import ActivityHeader from '@module/activities/components/activity-header'
import ActivityGrid from '@module/activities/components/activity-grid'

export const metadata: Metadata = {
    title: 'Activities',
    description: 'Manage tour activities and experiences offered to customers',
}

const ActivitiesPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <ActivityHeader />   
            <ActivityGrid />
        </div>
    )
}

export default ActivitiesPage
