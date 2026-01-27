import React from 'react'
import RequestListComponent from '@module/request/components/request-list'
import { Typography } from '@ui/typography'

const RequestsPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h2" className='font-semibold'>Requests</Typography>
                    <Typography variant="small" className='text-muted-foreground font-normal'>
                        View and manage all customer requests
                    </Typography>
                </div>
            </div>

            <RequestListComponent />
        </div>
    )
}

export default RequestsPage
