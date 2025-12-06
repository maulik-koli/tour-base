"use client"
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTourFormType, createTourSchema } from '../../utils/schema'

import TourFormCardWrapper from '../tour-form-card-wrapper'
import TextareaComponent from '@/components/form/textarea'
import TourOverviewSection from '../tour-overview-sec'
import TourDetailsSection from '../tour-details-sec'


const CreateTourForm: React.FC = () => {
    const form = useForm<CreateTourFormType>({
        resolver: zodResolver(createTourSchema),  
    })

    return (
        <FormProvider {...form}>

            <form className='w-full flex flex-col gap-8'>
                <TourOverviewSection />
                <TourDetailsSection />
            </form>
        </FormProvider>
    )
}

export default CreateTourForm