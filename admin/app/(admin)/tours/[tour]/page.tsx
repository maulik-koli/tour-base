"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetTour } from '@module/tours/api/queries'
import { SpinnerOverlay } from '@ui/spinner'
import ErrorBlock from '@/components/error-block'
import UpdateTourForm from '@module/tours/forms/update-tour-form'

const TourPage: React.FC = () => {
    const tour = useParams().tour;
    const { data, error, isLoading } = useGetTour({ slug: tour as string });

    
    const getContent = () => {
        if (isLoading) {
            return <SpinnerOverlay />
        }
        else if (error) {
            return <ErrorBlock type='error' message={error.message} />
        }
        else if (!data?.data?.tour || !data?.data?.packages) {
            return <ErrorBlock type='no-data' message="Tour not found!" />
        }
        else {
            return (
                <div className='flex flex-col gap-4'>
                    <UpdateTourForm data={data.data} />
                </div>
            )
        }
    }

    return (
        <div className='py-3 px-8 bg-background'>
            {getContent()}
        </div>
    )
}

export default TourPage
