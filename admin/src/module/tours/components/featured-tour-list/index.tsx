"use client"
import React from 'react'
import { useGetFeaturedTours } from '@module/tours/api/queries'

import ErrorBlock from '@/components/error-block'
import { RemoveFeaturedButton } from '@module/tours/forms/toggle-feature-button'
import { Separator } from '@ui/separator'
import { Card, CardContent, CardHeader } from '@ui/card'
import { Typography } from '@ui/typography'
import { CustomSpinner } from '@ui/spinner'


const FeaturedTourList: React.FC = () => {
    const { data, isLoading, error, refetch } = useGetFeaturedTours();

    const getContent = () => {
        if (isLoading) {
            return <CustomSpinner className='w-full min-h-30 flex items-center justify-center' />
        }

        if (error) {
            return <ErrorBlock
                type='error' 
                message={error?.message} 
                description='Please try again later.'
                className='min-h-30'
            />;
        }

        if(!data || (data && data.data?.length === 0)) {
            return <ErrorBlock 
                type='no-data'
                message='No featured tours found.'
                description='You have not marked any tours as featured yet.'
                className='min-h-30'
            />
        }

        return (
            <>
                {data.data?.map((tour) => (
                    <li key={tour._id} className='w-full flex items-center justify-between'>
                        <Typography className='font-medium'>{tour.name}</Typography>
                        <RemoveFeaturedButton slug={tour.slug} onSuccessAction={refetch} />
                    </li>
                ))}
            </>
        )
    }

    
    return (
        <Card className='w-full h-fit col-span-4 pb-0'>
            <CardHeader className='gap-0'>
                <Typography variant="lead">Featured Tours</Typography>
            </CardHeader>
            <CardContent className='px-0'>
                <Separator />
                <ul className='flex flex-col gap-4 p-6'>
                    {getContent()}
                </ul>
            </CardContent>
        </Card>
    )
}

export default FeaturedTourList
