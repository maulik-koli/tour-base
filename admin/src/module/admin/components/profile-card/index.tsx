"use client"
import React from 'react'
import { useGetProfile } from '@module/admin/api/queries'

import Icon from '@/components/icons'
import ErrorBlock from '@/components/error-block'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Typography } from '@ui/typography'
import { Card, CardContent } from '@ui/card'
import { CustomSpinner } from '@ui/spinner'


const ProfileCard: React.FC = () => {
    const { data, error, isLoading } = useGetProfile();

    const getContent = () => {
        if (isLoading) {
            return <CustomSpinner className='w-full min-h-30 flex items-center justify-center' />
        }

        if (error) {
            return <ErrorBlock
                type='error' 
                message={error?.message} 
                description='Please try again later.'
                className='min-h-45'
            />;
        }

        if(!data) {
            return <ErrorBlock 
                type='no-data'
                message='No featured tours found.'
                description='You have not marked any tours as featured yet.'
                className='min-h-30'
            />
        }

        return (
            <>
                <div className='flex flex-col gap-2 items-center'>
                    <Avatar className="h-12 w-24 md:h-15 md:w-30 rounded-sm">
                        <AvatarImage src="/logo.png" alt={data.data?.name} />
                        <AvatarFallback 
                            className="rounded-lg bg-secondary-foreground/50 text-secondary flex ic justify-center text-xs md:text-sm"
                        >
                            LOGO
                        </AvatarFallback>
                    </Avatar>
                    <Typography variant="lead" className='text-base md:text-lg text-center'>
                        {data.data?.name}
                    </Typography>
                </div>

                <div className='w-full flex flex-col gap-2.5 md:gap-3'>
                    <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4'>
                        <div className='flex items-center gap-2'>
                            <Icon name='Mail' width={16} height={16} className='md:w-[18px] md:h-[18px]' />
                            <Typography className='text-sm md:text-base'>Email:</Typography>
                        </div>
                        <Typography className='font-medium text-sm md:text-base break-all'>{data.data?.email}</Typography>
                    </div>
                    <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='Phone' width={16} height={16} className='md:w-[18px] md:h-[18px]' />
                            <Typography className='text-sm md:text-base'>Phone:</Typography>
                        </div>
                        <Typography className='font-medium text-sm md:text-base'>{data.data?.phone}</Typography>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Card className='w-full lg:col-span-4'>
            <CardContent className='h-full flex flex-col gap-3 md:gap-4 justify-between'>
                {getContent()}
            </CardContent>
        </Card>
    )
}

export default ProfileCard
