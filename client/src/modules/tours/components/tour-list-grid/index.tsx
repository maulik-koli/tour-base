import React from 'react'
import { Typography } from '@/components/ui/typography'

const TourListGrid: React.FC = () => {
    return (
        <div className='flex flex-col gap-8 mt-4'>
            <Typography variant="small" className=''>
                Showing 1-9 of 9 tours
            </Typography>
            <div className='grid grid-cols-3 gap-6'>
                {/* Tour items will go here */}
            </div>
        </div>
    )
}

export default TourListGrid
