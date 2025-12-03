import React from 'react'
import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import { formatDate, Tour } from '../../utils/tempConst'

interface TourCardProps {
    tour: Tour
}


const TourCard: React.FC<TourCardProps> = ({ tour }) => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-full flex flex-col border-2 rounded-lg'>
                <div className='relative w-full aspect-5/3'>
                    <Image
                        // src="/placeholder.jpg"
                        src={tour.image}
                        alt="Tour Image"
                        fill
                        className='object-fill max-w-full max-h-full overflow-hidden rounded-t-lg'
                    />
                </div>
                <div className='w-full p-2 flex flex-col gap-1'>
                    <Typography variant="h4" className='truncate'>{tour.tourName}</Typography>
                    <Typography variant="muted">Last Update at {formatDate(tour.updatedAt)}</Typography>
                </div>
            </div>
        </div>
    )
}

export default TourCard
