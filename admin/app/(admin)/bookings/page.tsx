import React from 'react'
import BookingsComponents from '@module/booking/components/bookings-components'
import { Typography } from '@ui/typography'

const BookingsPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h2" className='font-semibold'>Bookings</Typography>
                    <Typography variant="small" className='text-muted-foreground font-normal'>
                        View and manage all tour bookings
                    </Typography>
                </div>
            </div>

            <BookingsComponents />
        </div>
    )
}

export default BookingsPage
