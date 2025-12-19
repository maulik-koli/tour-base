"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTourFormType, createTourSchema, defaultTourFormValues } from '../../utils/schema'

import Icon from '@/components/icons'
import TourFormPackageSection from '../form-sections/tour-package-sec'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { 
    TourOverviewSection, 
    TourDetailsSection, 
    TourImageSection,
    ToursFormDaysSections
} from '../form-sections'
import { logger } from '@/lib/utils'
import { useCreateTour } from '../../apis/mutations'
import { useToast } from '@/hooks/useToast'
import { useRouter } from 'next/navigation'


const CreateTourForm: React.FC = () => {
    const router = useRouter();
    const { mutate, isPending } = useCreateTour();
    const toast = useToast();

    const form = useForm<CreateTourFormType>({
        resolver: zodResolver(createTourSchema),
        mode: 'onSubmit',
        defaultValues: defaultTourFormValues
    })

    
    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            logger("data", form.getValues());
            logger("error", form.formState.errors);
        }
    }, [form.formState.errors]);


    const onSumbit = (data: CreateTourFormType) => {
        logger("data onSumbit", data);
        mutate(data, {
            onSuccess: (res) => {
                toast.success("Tour created successfully!");
                logger("Create Tour Response", res);
                router.push(`/tours`);
            },
            onError: (err) => {
                toast.error(err.message || "Failed to create tour. Please try again.");
                logger("Create Tour Error", err);
            }
        })
    }

    toast.isLoading(isPending, "Creating Tour...");

    
    return (
        <>
            <div className='flex items-center justify-between'>
                <Typography variant="h1">Create Tour</Typography>
                <Button type='submit' onClick={form.handleSubmit(onSumbit)}>
                    <Icon name='Save' className='mr-2' />
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