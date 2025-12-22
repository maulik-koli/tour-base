import React from 'react'
import { TourListType } from '@modules/tours/api/types'
import { ViewMode } from '@app/tours/page'
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
        <div className='w-full rounded-xl shadow-xs border border-border flex items-center justify-center hover:shadow-lg'>
            <div className={cn( "w-full flex", isList ? 'flex-row' : 'flex-col')}>
                <div className={cn('relative h-full aspect-video', isList ? "w-110 shrink-0" : "w-full")}>
                    <FallbackImage
                        src={tour.thumbnailImage}
                        crop="fill"
                        alt={tour.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={cn(isList ? 'rounded-l-xl' : 'rounded-t-xl')}
                    />
                </div>
                {isList ? (
                    <div className='w-full flex flex-col p-6 justify-between'>
                        <div className='w-full h-full flex flex-col gap-4'>
                            <TourContent tour={tour} />
                        </div>
                        <TourPriceBlock minPrice={tour.minPrice} maxPrice={tour.maxPrice} slug={tour.slug} />
                    </div>
                ) : (
                    <div className='w-full h-full min-h-60 flex justify-between flex-col gap-4 p-6'>
                        <TourContent tour={tour} />
                        <TourPriceBlock minPrice={tour.minPrice} maxPrice={tour.maxPrice} slug={tour.slug} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TourCard;


const TourContent: React.FC<{ tour: TourListType }> = function({ tour }) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2 w-full h-full'>
                <Typography variant="h3" className='truncate leading-[1.4]'>{tour.name}</Typography>
                <Typography variant="large" className='font-normal line-clamp-2'>
                    {tour.tagLine}
                </Typography>
            </div>
            <div className='flex gap-8 items-center'>
                <div className='flex items-center gap-2'>
                    <Icon name='CalendarDays' width={20} height={20} />
                    <Typography variant="p" className='text-muted-foreground font-medium'>
                        {tour.minDays} Days to {tour.maxDays} Days
                    </Typography>
                </div>
                <div className='flex items-center gap-2'>
                    <Icon name='Ticket' width={20} height={20} />
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
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Typography variant="h3" className='font-semibold text-secondary-foreground'>
                    ₹ {maxPrice === minPrice ? minPrice : `${minPrice} - ${maxPrice}`} 
                </Typography>
            </div>
            <ViewDetailsButton slug={slug} />
        </div>
    )
}
