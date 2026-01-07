import React from 'react'
import { TourListType } from '@modules/tours/api/types'
import { ViewMode } from '../tours-page-components'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import ViewDetailsButton from '../view-details-btn'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'

interface TourListCardProps {
    tour: TourListType;
    view: ViewMode
}


const TourCard: React.FC<TourListCardProps> = ({ tour, view }) => {
    const isList = view === "list";
    return (
        <div className='w-full rounded-xl shadow-xs border border-border flex items-center justify-center hover:shadow-lg transition-shadow'>
            <div className={cn(
                "w-full flex flex-col",
                isList && "md:flex-row"
            )}>
                <div className={cn(
                    'relative h-full aspect-video w-full',
                    isList && "md:w-110 md:shrink-0"
                )}>
                    <FallbackImage
                        src={tour.thumbnailImage}
                        alt={`${tour.name} Thumbnail Image`}
                        crop="fill"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={cn(
                            'rounded-t-xl',
                            isList && 'md:rounded-t-none md:rounded-l-xl'
                        )}
                    />
                </div>
                <div className='w-full flex flex-col p-4 md:p-6 justify-between gap-3 md:gap-4'>
                    <TourContent tour={tour} />
                    <TourPriceBlock minPrice={tour.minPrice} maxPrice={tour.maxPrice} slug={tour.slug} />
                </div>
            </div>
        </div>
    )
}

export default TourCard;


const TourContent: React.FC<{ tour: TourListType }> = function({ tour }) {
    return (
        <div className='flex flex-col gap-3 md:gap-4'>
            <div className='flex flex-col gap-1.5 md:gap-2 w-full h-full'>
                <Typography variant="h3" className='truncate leading-[1.4]'>{tour.name}</Typography>
                <Typography variant="large" className='font-normal line-clamp-2'>
                    {tour.tagLine}
                </Typography>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-8'>
                <div className='flex items-center gap-2'>
                    <Icon name='CalendarDays' className='w-4 h-4 md:w-5 md:h-5 shrink-0' />
                    <Typography variant="p" className='text-muted-foreground font-medium'>
                        {tour.minDays === tour.maxDays ? `${tour.minDays} Days` : `${tour.minDays} Days to ${tour.maxDays} Days`}
                    </Typography>
                </div>
                <div className='flex items-center gap-2'>
                    <Icon name='Ticket' className='w-4 h-4 md:w-5 md:h-5 shrink-0' />
                    <Typography variant="p" className='text-muted-foreground font-medium'>
                        {tour.packageCount} Packages
                    </Typography>
                </div>
            </div>
        </div>
    )
}

const TourPriceBlock: React.FC<Pick<TourListType, 'minPrice' | 'maxPrice' | "slug">> = function({ minPrice, maxPrice, slug }) {
    return (
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0'>
            <div className='flex items-center gap-2'>
                <Typography variant="h3" className='font-semibold text-secondary-foreground'>
                    ₹ {maxPrice === minPrice ? minPrice : `${minPrice} - ${maxPrice}`} 
                </Typography>
            </div>
            <ViewDetailsButton slug={slug} />
        </div>
    )
}
