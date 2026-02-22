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
import { Button } from '@ui/button'
import { 
    TourOverviewSection, 
    TourDetailsSection, 
    TourImageSection,
    ToursFormDaysSections
} from '../sections'
import { logger } from '@/lib/utils'
import PageTitle from '@/components/page-title'


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
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
                <PageTitle
                    title='Create Tour'
                />
                <Button type='submit' onClick={form.handleSubmit(onCreateSubmit)} className='text-xs md:text-sm w-fit'>
                    <Icon name='Save' className='w-4 h-4' />
                    Save Tour
                </Button>
            </div>

            <FormProvider {...form}>
                <form className='w-full flex flex-col gap-4 md:gap-6 lg:gap-8'>
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