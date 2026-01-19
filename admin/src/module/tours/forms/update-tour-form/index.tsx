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
import TourFormPackageSection from '../sections/tour-package-sec'
import DeleteTourButton from '../delete-tour-btn'
import ToggleFeaturedButton from '../toggle-feature-button'
import { Typography } from '@ui/typography'
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
            <div className='flex items-center justify-between'>
                <Typography variant="h2">Update Tour</Typography>
                <div className='flex items-center gap-4'>
                    <DeleteTourButton slug={data.tour.slug} /> 
                    <Button 
                        type='button'
                        onClick={handleSubmit(onUpdateSubmit)}
                        disabled={!isDirty || isUpdatingTour}
                    >
                        <Icon name='Save' />
                        Save Tour
                    </Button>
                </div>
            </div>

            <div className='w-full flex flex-col gap-8'>
                <FormProvider {...form}>
                    <form className='w-full flex flex-col gap-8'>
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