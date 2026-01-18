"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/useToast'
import { useSubmitActivity } from '@module/activities/hooks/useSubmitActivity'
import { ActivityPayload, activityZodSchema, defaultActivityFormValues } from '@module/activities/utils/schema'
import { flatZodError } from '@/lib/flatZodError'
import { logger } from '@/lib/utils'

import Icon from '@/components/icons'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'
import { 
    ActivityOverviewSection, 
    ActivityDetailsSection, 
    ActivityImageSection
} from '../sections'


const CreateActivityForm: React.FC = () => {
    const form = useForm<ActivityPayload>({
        resolver: zodResolver(activityZodSchema),
        mode: 'onSubmit',
        defaultValues: defaultActivityFormValues
    })

    const { onCreateSubmit } = useSubmitActivity();
    const toast = useToast();

    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            logger("Form data", form.getValues())
            const error = flatZodError(activityZodSchema, form.getValues())
            if(error) toast.error(error)
        }
    }, [form.formState.errors]);

    
    return (
        <>
            <div className='flex items-center justify-between'>
                <Typography variant="h2">Create Activity</Typography>
                <Button type='submit' onClick={form.handleSubmit(onCreateSubmit)}>
                    <Icon name='Save' />
                    Save Activity
                </Button>
            </div>

            <FormProvider {...form}>
                <form className='w-full flex flex-col gap-8'>
                    <ActivityOverviewSection />
                    <ActivityDetailsSection />
                    <ActivityImageSection />
                </form>
            </FormProvider>
        </>
    )
}

export default CreateActivityForm
