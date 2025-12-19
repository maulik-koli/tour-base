"use client"
import React from 'react'
import { Typography } from '@/components/ui/typography'

import Icon from '@/components/icons'
import { cn, formatDate } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { TourListType } from '../../apis/types'
import FallbackImage from '@/components/fallback-image'

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
            <div className='w-full p-3 flex flex-col gap-3'>
                <Typography variant="h4" className='truncate'>{tour.name}</Typography>
                <div className='grid grid-cols-2 gap-y-3 text-muted-foreground'>
                    <div className='flex gap-2 items-center'>
                        <Icon name="Calendar" width={16} height={16} stroke="currentColor" />
                        <Typography variant="small">{tour.daysCount} Days</Typography>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Icon name="Package" width={16} height={16} stroke="currentColor" />
                        <Typography variant="small">{tour.packagesCount} Packages</Typography>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Icon name="IndianRupee" width={16} height={16} stroke="currentColor" />
                        <Typography variant="small">{tour.minPrice} - {tour.maxPrice}</Typography>
                    </div>
                </div>
                <Separator />
                <div className='flex items-center justify-between text-muted-foreground'>
                    <Typography variant="small">Last Updated: {formatDate(tour.updatedAt)}</Typography>
                    <Button variant="default" size='sm' onClick={handleNavigation}>
                        <Icon name="SquarePen" width={16} height={16} stroke="currentColor" />
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TourCard
