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
                    <Avatar className="h-15 w-15 rounded-lg">
                        <AvatarImage src="/avatars/admin.jpg" alt={data.data?.name} />
                        <AvatarFallback 
                            className="rounded-lg bg-secondary-foreground/50 text-secondary flex ic justify-center"
                        >
                            LOGO
                        </AvatarFallback>
                    </Avatar>
                    <Typography variant="lead">
                        {data.data?.name}
                    </Typography>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <div className='w-full flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-2'>
                            <Icon name='Mail' width={18} height={18} />
                            <Typography>Email:</Typography>
                        </div>
                        <Typography className='font-medium'>{data.data?.email}</Typography>
                    </div>
                    <div className='w-full flex items-center justify-between gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='Phone' width={18} height={18} />
                            <Typography>Phone:</Typography>
                        </div>
                        <Typography className='font-medium'>{data.data?.phone}</Typography>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Card className='w-full col-span-4'>
            <CardContent className='h-full flex flex-col gap-4 justify-between'>
                {getContent()}
            </CardContent>
        </Card>
    )
}

export default ProfileCard
