"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/useToast'
import { useSubmitTour } from '@module/tours/hooks/useSubmitTour'
import { CreateTourFormType, createTourSchema } from '@module/tours/utils/schema'
import { GetTourResponse } from '@module/tours/api/types'
import { flatZodError } from '@/lib/zod/flatZodError'
import { logger } from '@/lib/utils'

import Icon from '@/components/icons'
import PageTitle from '@/components/page-title'
import TourFormPackageSection from '../sections/tour-package-sec'
import DeleteTourButton from '../delete-tour-btn'
import ToggleFeaturedButton from '../toggle-feature-button'
import { Button } from '@ui/button'
import { 
    TourOverviewSection, 
    TourDetailsSection, 
    TourImageSection,
    ToursFormDaysSections
} from '../sections'


interface UpdateTourFormProps {
    data: GetTourResponse
}


const UpdateTourForm: React.FC<UpdateTourFormProps> = ({ data }) => {
    const form = useForm<CreateTourFormType>({
        resolver: zodResolver(createTourSchema),
        mode: 'onSubmit',
        defaultValues: data
    })

    const { getValues, formState: { errors, isDirty }, handleSubmit } = form;
    const { onUpdateSubmit, isUpdatingTour } = useSubmitTour();
    const toast = useToast();

    useEffect(() => {
        if(Object.keys(errors).length > 0) {
            logger("Form data", getValues())
            const error = flatZodError(createTourSchema, getValues())
            if(error) toast.error(error)
        }
    }, [errors]);

    
    return (
        <>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
                <PageTitle 
                    title='Update Tour'
                    subtitle='Modify your tour details and packages'
                />
                <div className='flex items-center gap-2 md:gap-3 lg:gap-4 flex-wrap'>
                    <DeleteTourButton slug={data.tour.slug} /> 
                    <Button 
                        type='button'
                        onClick={handleSubmit(onUpdateSubmit)}
                        disabled={!isDirty || isUpdatingTour}
                        className='text-xs md:text-sm w-fit'
                    >
                        <Icon name='Save' className='w-4 h-4' />
                        Save Tour
                    </Button>
                </div>
            </div>

            <div className='w-full flex flex-col gap-4 md:gap-6 lg:gap-8'>
                <FormProvider {...form}>
                    <form className='w-full flex flex-col gap-4 md:gap-6 lg:gap-8'>
                        <TourOverviewSection featuredButton={(
                            <ToggleFeaturedButton
                                isFeatured={data.tour.isFeatured}
                                slug={data.tour.slug}
                            />
                        )}/>
                        <TourDetailsSection />
                        <TourImageSection />
                        <ToursFormDaysSections />
                        <TourFormPackageSection type='update' />
                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export default UpdateTourForm