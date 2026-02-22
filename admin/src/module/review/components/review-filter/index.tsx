import React from 'react'
import { TourReviewFilterFields, GetTourReviewListParams } from '@module/review/api/types'

import InputField from '@/components/form/input-field'
import { Typography } from '@/components/ui/typography'

interface ReviewFilterProps {
    onChange: (name: TourReviewFilterFields, value: string | undefined) => void;
    filter: GetTourReviewListParams
}


const ReviewFilter: React.FC<ReviewFilterProps> = ({ filter, onChange }) => {
    return (
        <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 md:gap-6 bg-card border border-border rounded-md p-3 md:p-4'>
            <InputField 
                onChange={(value) => onChange("search", value || undefined)}
                value={filter.search || ''}
                leftIcon='Search'
                placeholder='Search by tour name'
                containerClass='w-full sm:flex-1'
            />
            <div className='flex items-center gap-2 min-w-fit'>
                <Typography variant="muted" className='min-w-fit text-xs md:text-sm'>
                    Showing tours with reviews
                </Typography>
            </div>
        </div>
    )
}

export default React.memo(ReviewFilter)
