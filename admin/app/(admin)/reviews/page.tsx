import React from 'react'
import ReviewListComponents from '@module/review/components/review-list-components'
import PageTitle from '@/components/page-title'


const ReviewsPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                <PageTitle
                    title='Reviews'
                    subtitle="Manage and respond to customer reviews for your tours"
                />
                
            </div>

            <ReviewListComponents />
        </div>
    )
}

export default ReviewsPage
