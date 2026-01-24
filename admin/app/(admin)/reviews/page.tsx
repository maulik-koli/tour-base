import React from 'react'
import ReviewListComponents from '@module/review/components/review-list-components'
import { Typography } from '@ui/typography'

const ReviewsPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h2" className='font-semibold'>Reviews</Typography>
                    <Typography variant="small" className='text-muted-foreground font-normal'>
                        View and manage tour reviews
                    </Typography>
                </div>
            </div>

            <ReviewListComponents />
        </div>
    )
}

export default ReviewsPage
