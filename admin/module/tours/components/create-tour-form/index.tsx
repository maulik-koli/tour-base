"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTourFormType, createTourSchema, defaultCreateTourSchema } from '../../utils/schema'

import Icon from '@/components/icons'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { 
    TourOverviewSection, 
    TourDetailsSection, 
    TourImageSection,
    ToursFormDaysSections
} from '../form-sections'
import TourFormPackageSection from '../form-sections/tour-package-sec'
import { logger } from '@/lib/utils'


const CreateTourForm: React.FC = () => {
    const form = useForm<CreateTourFormType>({
        resolver: zodResolver(createTourSchema),
        mode: 'onSubmit',
        defaultValues: defaultCreateTourSchema
    })

    useEffect(() => {
        logger('watch', form.watch());
    }, [form.watch]);

    const onSumbit = (data: CreateTourFormType) => {
        console.log("data onSumbit", data);
    }

    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            console.log("data", form.getValues());
            console.log("error", form.formState.errors);
        }
    }, [form.formState.errors]);


    return (
        <FormProvider {...form}>
            <div className='flex items-center justify-between'>
                <Typography variant="h1">Create Tour</Typography>
                <Button type='submit' onClick={form.handleSubmit(onSumbit)}>
                    <Icon name='Save' className='mr-2' />
                    Save Tour
                </Button>
            </div>

            <form className='w-full flex flex-col gap-8'>
                <TourOverviewSection />
                <TourDetailsSection />
                <TourImageSection />
                <ToursFormDaysSections />
                <TourFormPackageSection />
            </form>
        </FormProvider>
    )
}

export default CreateTourForm