"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/useToast'
import { useSubmitTour } from '@module/tours/hooks/useSubmitTour'
import { CreateTourFormType, createTourSchema, defaultTourFormValues } from '@module/tours/utils/schema'
import { flatZodError } from '@/lib/zod/flatZodError'


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


const CreateTourForm: React.FC = () => {
    const form = useForm<CreateTourFormType>({
        resolver: zodResolver(createTourSchema),
        mode: 'onSubmit',
        defaultValues: defaultTourFormValues
    })

    const { onCreateSubmit } = useSubmitTour();
    const toast = useToast();

    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            logger("Form data", form.getValues())
            const error = flatZodError(createTourSchema, form.getValues())
            if(error) toast.error(error)
        }
    }, [form.formState.errors]);

    
    return (
        <>
            <div className='flex items-center justify-between'>
                <Typography variant="h2">Create Tour</Typography>
                <Button type='submit' onClick={form.handleSubmit(onCreateSubmit)}>
                    <Icon name='Save' />
                    Save Tour
                </Button>
            </div>

            <FormProvider {...form}>
                <form className='w-full flex flex-col gap-8'>
                    <TourOverviewSection />
                    <TourDetailsSection />
                    <TourImageSection />
                    <ToursFormDaysSections />
                    <TourFormPackageSection />
                </form>
            </FormProvider>
        </>
    )
}

export default CreateTourForm