"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTourFormType, createTourSchema } from '../../utils/schema'

import Icon from '@/components/icons'
import TourOverviewSection from '../tour-overview-sec'
import TourDetailsSection from '../tour-details-sec'
import TourImageSection from '../tour-image-sec'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'


const CreateTourForm: React.FC = () => {
    const form = useForm<CreateTourFormType>({
        resolver: zodResolver(createTourSchema),  
    })

    const onSumbit = (data: CreateTourFormType) => {
        console.log("data", data);
    }

    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
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
            </form>
        </FormProvider>
    )
}

export default CreateTourForm