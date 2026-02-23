import React from 'react'
import { Metadata } from 'next'
import ActivityDetailPageClient from '@module/activities/components/activity-detail-page-client'

export const metadata: Metadata = {
    title: 'Activity Details',
    description: 'View and edit activity information and details',
}

const ActivityPage: React.FC = () => {
    return <ActivityDetailPageClient />
}

export default ActivityPage
