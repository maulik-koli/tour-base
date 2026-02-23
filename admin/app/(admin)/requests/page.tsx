import React from 'react'
import { Metadata } from 'next'
import RequestListComponent from '@module/request/components/request-list'
import PageTitle from '@/components/page-title'

export const metadata: Metadata = {
    title: 'Customer Requests',
    description: 'View and manage all customer requests and support inquiries',
}

const RequestsPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                <PageTitle
                    title='Customer Requests'
                    subtitle='View and manage all customer requests in one place'
                />
            </div>

            <RequestListComponent />
        </div>
    )
}

export default RequestsPage
