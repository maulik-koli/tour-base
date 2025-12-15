import React from 'react'
import { TourCardType } from '../../api/types'
import { CldImage } from 'next-cloudinary'
import { ViewMode } from '@app/tours/page'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import ViewDetailsButton from '../view-details-btn'
import { Typography } from '@/components/ui/typography'

interface TourListCardProps {
    tour: TourCardType;
    view: ViewMode
}


const TourCard: React.FC<TourListCardProps> = ({ tour, view }) => {
    const isList = view === "list";
    return (
        <div className='w-full rounded-xl shadow-xs border border-border flex items-center justify-center hover:shadow-lg'>
            <div className={cn( "w-full flex", isList ? 'flex-row' : 'flex-col')}>
                <div className={cn('relative h-full aspect-video', isList ? "w-100 shrink-0" : "w-full")}>
                    <CldImage
                        src={tour.image}
                        crop="fill"
                        alt={tour.title}
                        fill
                        sizes="100vw 100vh"
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


const TourContent: React.FC<{ tour: TourCardType }> = function({ tour }) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2 w-full h-full'>
                <Typography variant="h3" className='truncate'>{tour.title}</Typography>
                <Typography variant="large" className='font-normal line-clamp-2'>
                    {tour.subtitle}
                </Typography>
            </div>
            <div className='flex gap-8 items-center'>
                <div className='flex items-center gap-2'>
                    <Icon name='CalendarDays' width={20} height={20} />
                    <Typography variant="p" className='text-muted-foreground font-medium'>
                        {tour.minDuration} to {tour.maxDuration}
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

const TourPriceBlock: React.FC<Pick<TourCardType, 'minPrice' | 'maxPrice' | "slug">> = function({ minPrice, maxPrice, slug }) {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Typography variant="h3" className='font-semibold text-secondary-foreground'>
                    ₹ {minPrice} - {maxPrice}
                </Typography>
            </div>
            <ViewDetailsButton slug={slug} />
        </div>
    )
}
