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
        <div className='w-full flex justify-between items-center gap-6 bg-card border border-border rounded-md p-3'>
            <InputField 
                onChange={(value) => onChange("search", value || undefined)}
                value={filter.search || ''}
                leftIcon='Search'
                placeholder='Search by tour name'
                containerClass='w-full'
            />
            <div className='flex items-center gap-2 min-w-fit'>
                <Typography variant="muted" className='min-w-fit'>
                    Showing tours with reviews
                </Typography>
            </div>
        </div>
    )
}

export default React.memo(ReviewFilter)
