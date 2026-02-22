"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { cn, formatDate } from '@/lib/utils'
import { TourListType } from '@module/tours/api/types'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'
import { Button } from '@ui/button'

interface TourCardProps {
    tour: TourListType
    className?: string
}


const TourCard: React.FC<TourCardProps> = ({ tour, className }) => {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(`/tours/${tour.slug}`);
    }

    return (
        <div className={cn('w-full flex flex-col rounded-md border hover:shadow-lg bg-card', className)}>
            <div className='relative w-full aspect-6/3 bg-muted rounded-t-md'>
                <FallbackImage
                    src={tour.thumbnailImage}
                    alt={tour.name}
                    fill
                    crop="fill"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className='rounded-t-md'
                />
            </div>
            <div className='w-full p-3 md:p-4 flex flex-col gap-2.5 md:gap-3'>
                <Typography variant="h4" className='truncate text-base md:text-lg'>{tour.name}</Typography>
                <div className='grid grid-cols-2 gap-y-2.5 md:gap-y-3 text-muted-foreground'>
                    <div className='flex gap-1.5 md:gap-2 items-center'>
                        <Icon name="Calendar" width={14} height={14} className='md:w-4 md:h-4' stroke="currentColor" />
                        <Typography variant="small" className='text-xs md:text-sm'>{tour.daysCount} Days</Typography>
                    </div>
                    <div className='flex gap-1.5 md:gap-2 items-center'>
                        <Icon name="Package" width={14} height={14} className='md:w-4 md:h-4' stroke="currentColor" />
                        <Typography variant="small" className='text-xs md:text-sm'>{tour.packagesCount} Packages</Typography>
                    </div>
                    <div className='flex gap-1 md:gap-1.5 items-center'>
                        <Icon name="IndianRupee" width={14} height={14} className='md:w-4 md:h-4' stroke="currentColor" />
                        <Typography variant="small" className='text-xs md:text-sm'>
                            {tour.minPrice === tour.maxPrice ? tour.minPrice : `${tour.minPrice} - ${tour.maxPrice}`}
                        </Typography>
                    </div>
                </div>
                <Separator />
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-muted-foreground'>
                    <Typography variant="small" className='text-xs md:text-sm'>Last Updated: {formatDate(tour.updatedAt)}</Typography>
                    <Button variant="default" size='sm' onClick={handleNavigation} className='text-xs md:text-sm w-fit'>
                        <Icon name="SquarePen" width={14} height={14} className='md:w-4 md:h-4' stroke="currentColor" />
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TourCard)