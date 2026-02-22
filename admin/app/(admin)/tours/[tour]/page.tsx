"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGetTour } from '@module/tours/api/queries'

import ErrorBlock from '@/components/error-block'
import UpdateTourForm from '@module/tours/forms/update-tour-form'
import { SpinnerOverlay } from '@ui/spinner'


const TourPage: React.FC = () => {
    const tour = useParams().tour;
    const [isMount, setIsMount] = React.useState(false);

    const { data, error, isLoading } = useGetTour(
        { slug: tour as string },
        isMount
    );

    useEffect(() => {
        if (isMount) return;
        setIsMount(true);
    }, [isMount]);
    
    const getContent = () => {
        if (isLoading || !isMount) {
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
                <UpdateTourForm data={data.data} />
            )
        }
    }

    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            {getContent()}
        </div>
    )
}

export default TourPage
