import React from 'react'
import { CldImage } from 'next-cloudinary'

import Icon from '@/components/icons'
import ViewDetailsButton from '../view-details-btn'
import { Typography } from '@/components/ui/typography'
import { TourCard } from '../../api/types'

interface TourListCardProps {
    tour: TourCard
}


export const TourListCard: React.FC = () => {
    return (
        <div className='w-full rounded-xl shadow-xs border border-border/50 flex items-center justify-center hover:shadow-lg'>
            <div className='w-full flex'>
                <div className='relative w-150 h-full aspect-video'>
                    <CldImage
                        src="https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
                        crop="fill"
                        alt=""
                        fill
                        sizes="100vw"
                        className='rounded-l-xl'
                    />
                </div>
                <div className='w-full flex flex-col justify-between p-6'>
                    <div className='w-full h-full flex flex-col gap-4'>
                        <TourContet />
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Typography variant="h3" className='font-semibold text-secondary-foreground'>
                                ₹ 5000 - 12000
                            </Typography>
                        </div>
                        <ViewDetailsButton slug='some-slug' />
                    </div>
                </div>
            </div>
        </div>
    )
}



export const TourGridCard: React.FC = () => {
    return (
        <div className='w-full rounded-xl shadow-xs border border-border/50 flex items-center justify-center hover:shadow-lg'>
            <div className='w-full flex flex-col'>
                <div className='relative w-full h-full aspect-video rounded-t-xl'>
                    <CldImage
                        src="https://res.cloudinary.com/dmcfkem87/image/upload/v1765735247/tour-image_zvcgie.avif"
                        crop="fill"
                        alt=""
                        fill
                        sizes="100vw"
                        className='rounded-t-xl'
                    />
                </div>
                <div className='w-full h-full flex flex-col gap-4 p-6'>
                    <TourContet />
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Typography variant="h3" className='font-semibold text-secondary-foreground'>
                                ₹ 5000 - 12000
                            </Typography>
                        </div>
                        <ViewDetailsButton slug='some-slug' />
                    </div>
                </div>
            </div>
        </div>
    )
}


const TourContet = function() {
    return (
        <>
            <Typography variant="h3">Some title of tour</Typography>
            <Typography variant="large" className='font-normal line-clamp-3'>
                Ancient temples and rich cultural heritage with traditional architecture and spiritual experiences
            </Typography>
            <div className='flex gap-8 items-center'>
                <div className='flex items-center gap-2'>
                    <Icon name='CalendarDays' width={20} height={20} />
                    <Typography variant="p" className='text-muted-foreground font-medium'>
                        5 to 11 Days
                    </Typography>
                </div>
                <div className='flex items-center gap-2'>
                    <Icon name='Ticket' width={20} height={20} />
                    <Typography variant="p" className='text-muted-foreground font-medium'>
                        3 Packages
                    </Typography>
                </div>
            </div>
        </>
    )
}
