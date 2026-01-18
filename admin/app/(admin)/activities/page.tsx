"use client"
import React from 'react'
import ActivityHeader from '@module/activities/components/activity-header'
import ActivityGrid from '@module/activities/components/activity-grid'


const ActivitiesPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <ActivityHeader />   
            <ActivityGrid />
        </div>
    )
}

export default ActivitiesPage
