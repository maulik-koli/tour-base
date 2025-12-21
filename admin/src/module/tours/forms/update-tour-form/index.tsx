"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/useToast'
import { useSubmitTour } from '@module/tours/hooks/useSubmitTour'
import { CreateTourFormType, createTourSchema } from '@module/tours/utils/schema'
import { GetTourResponse } from '@module/tours/api/types'
import { flatZodError } from '@/lib/flatZodError'

import Icon from '@/components/icons'
import TourFormPackageSection from '../sections/tour-package-sec'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'
import { 
    TourOverviewSection, 
    TourDetailsSection, 
    TourImageSection,
    ToursFormDaysSections
} from '../sections'
import { logger } from '@/lib/utils'


interface UpdateTourFormProps {
    data: GetTourResponse
}


const UpdateTourForm: React.FC<UpdateTourFormProps> = ({ data }) => {
    const form = useForm<CreateTourFormType>({
        resolver: zodResolver(createTourSchema),
        mode: 'onSubmit',
        defaultValues: data
    })

    const { getValues, formState, handleSubmit } = form;
    const { onUpdateSubmit } = useSubmitTour();
    const toast = useToast();

    useEffect(() => {
        if(Object.keys(formState.errors).length > 0) {
            logger("Form data", getValues())
            const error = flatZodError(createTourSchema, getValues())
            if(error) toast.error(error)
        }
    }, [formState.errors]);

    
    return (
        <>
            <div className='flex items-center justify-between'>
                <Typography variant="h1">Update Tour</Typography>
                <Button type='button' onClick={handleSubmit(onUpdateSubmit)} >
                    <Icon name='Save' className='mr-2' />
                    Save Tour
                </Button>
            </div>

            <div className='w-full flex flex-col gap-8'>
                <FormProvider {...form}>
                    <form className='w-full flex flex-col gap-8'>
                        <TourOverviewSection />
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