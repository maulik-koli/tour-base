"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { cn, formatDate } from '@/lib/utils'
import { ActivityListType } from '@module/activities/api/types'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'
import { Button } from '@ui/button'

interface ActivityCardProps {
    activity: ActivityListType
    className?: string
}


const ActivityCard: React.FC<ActivityCardProps> = ({ activity, className }) => {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(`/activities/${activity.slug}`);
    }

    return (
        <div className={cn('w-full flex flex-col rounded-md border hover:shadow-lg bg-card', className)}>
            <div className='relative w-full aspect-6/3 bg-muted rounded-t-md'>
                <FallbackImage
                    src={activity.thumbnailImage}
                    alt={activity.title}
                    fill
                    crop="fill"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className='rounded-t-md'
                />
            </div>
            <div className='w-full p-3 flex flex-col gap-3'>
                <Typography variant="h4" className='truncate'>{activity.title}</Typography>
                <div className='grid grid-cols-2 gap-y-3 text-muted-foreground'>
                    <div className='flex gap-1 items-center'>
                        <Icon name="IndianRupee" width={16} height={16} stroke="currentColor" />
                        <Typography variant="small">{activity.pricePerPerson}</Typography>
                    </div>
                </div>
                <Separator />
                <div className='flex items-center justify-between text-muted-foreground'>
                    <Typography variant="small">Last Updated: {formatDate(activity.updatedAt)}</Typography>
                    <Button variant="default" size='sm' onClick={handleNavigation}>
                        <Icon name="SquarePen" width={16} height={16} stroke="currentColor" />
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ActivityCard)
