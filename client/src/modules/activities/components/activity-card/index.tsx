"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { ActivityListType } from '@modules/activities/api/types'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'

interface ActivityCardProps {
    activity: ActivityListType;
}


const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const router = useRouter();

    const handleViewDetails = () => {
        router.push(`/activities/${activity.slug}`);
    }

    return (
        <div className='w-full rounded-xl shadow-xs border border-border flex flex-col hover:shadow-lg transition-shadow bg-card overflow-hidden'>
            <div className='relative aspect-4/3 w-full'>
                <FallbackImage
                    src={activity.thumbnailImage}
                    alt={`${activity.title} Thumbnail`}
                    crop="fill"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className='object-cover'
                />
                <div className='absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md'>
                    <Typography variant="large" className='text-primary font-bold text-sm'>
                        ₹{activity.pricePerPerson.toLocaleString('en-IN')}
                    </Typography>
                </div>
            </div>
            <div className='flex flex-col p-4 md:p-5 gap-3 flex-1'>
                <div className='flex items-center gap-1.5'>
                    <Icon name='MapPin' className='w-4 h-4 text-accent mt-0.5' />
                    <Typography variant="small" className='text-muted-foreground uppercase tracking-wide font-medium'>
                        {activity.city}
                    </Typography>
                </div>

                <Typography variant="h4" className='font-bold leading-tight line-clamp-2'>
                    {activity.title}
                </Typography>

                <Typography variant="muted" className='line-clamp-2 flex-1'>
                    {activity.subtitle}
                </Typography>

                <div className='flex items-center justify-between pt-2 mt-auto border-t border-border'>
                    <div className='flex items-center gap-1.5'>
                        <Icon name='Ticket' className='w-4 h-4 text-muted-foreground mt-0.5' />
                        <Typography variant="small" className='text-muted-foreground'>
                            Book Online
                        </Typography>
                    </div>
                    <Button 
                        variant="link" 
                        className='p-0 h-auto font-semibold'
                        onClick={handleViewDetails}
                    >
                        View Details
                        <Icon name='ArrowRight' className='w-4 h-4 ml-1' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard
