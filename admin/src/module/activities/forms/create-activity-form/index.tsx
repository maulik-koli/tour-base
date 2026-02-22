"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/useToast'
import { useSubmitActivity } from '@module/activities/hooks/useSubmitActivity'
import { ActivityPayload, activitySchema, defaultActivityFormValues } from '@module/activities/utils/schema'
import { flatZodError } from '@/lib/zod/flatZodError'
import { logger } from '@/lib/utils'

import Icon from '@/components/icons'
import { Button } from '@ui/button'
import { 
    ActivityOverviewSection, 
    ActivityDetailsSection, 
    ActivityImageSection
} from '../sections'
import PageTitle from '@/components/page-title'


const CreateActivityForm: React.FC = () => {
    const form = useForm<ActivityPayload>({
        resolver: zodResolver(activitySchema),
        mode: 'onSubmit',
        defaultValues: defaultActivityFormValues
    })

    const { onCreateSubmit } = useSubmitActivity();
    const toast = useToast();

    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            logger("Form data", form.getValues())
            const error = flatZodError(activitySchema, form.getValues())
            if(error) toast.error(error)
        }
    }, [form.formState.errors]);

    
    return (
        <>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
                <PageTitle title='Create Activity' />
                <Button type='submit' onClick={form.handleSubmit(onCreateSubmit)} className='text-xs md:text-sm w-fit'>
                    <Icon name='Save' className='w-4 h-4' />
                    Save Activity
                </Button>
            </div>

            <FormProvider {...form}>
                <form className='w-full flex flex-col gap-4 md:gap-6 lg:gap-8'>
                    <ActivityOverviewSection />
                    <ActivityDetailsSection />
                    <ActivityImageSection />
                </form>
            </FormProvider>
        </>
    )
}

export default CreateActivityForm
