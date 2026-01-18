"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/useToast'
import { useSubmitActivity } from '@module/activities/hooks/useSubmitActivity'
import { ActivityPayload, activityZodSchema } from '@module/activities/utils/schema'
import { GetActivityResponse } from '@module/activities/api/types'
import { flatZodError } from '@/lib/flatZodError'
import { logger } from '@/lib/utils'

import Icon from '@/components/icons'
import DeleteActivityButton from '../delete-activity-btn'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'
import { 
    ActivityOverviewSection, 
    ActivityDetailsSection, 
    ActivityImageSection
} from '../sections'


interface UpdateActivityFormProps {
    data: GetActivityResponse
}


const UpdateActivityForm: React.FC<UpdateActivityFormProps> = ({ data }) => {
    const form = useForm<ActivityPayload>({
        resolver: zodResolver(activityZodSchema),
        mode: 'onSubmit',
        defaultValues: data.activity
    })

    const { getValues, formState: { errors, isDirty }, handleSubmit } = form;
    const { onUpdateSubmit, isUpdatingActivity } = useSubmitActivity();
    const toast = useToast();

    useEffect(() => {
        if(Object.keys(errors).length > 0) {
            logger("Form data", getValues())
            const error = flatZodError(activityZodSchema, getValues())
            if(error) toast.error(error)
        }
    }, [errors]);

    
    return (
        <>
            <div className='flex items-center justify-between'>
                <Typography variant="h2">Update Activity</Typography>
                <div className='flex items-center gap-4'>
                    <DeleteActivityButton slug={data.activity.slug} /> 
                    <Button 
                        type='button'
                        onClick={handleSubmit(onUpdateSubmit)}
                        disabled={!isDirty || isUpdatingActivity}
                    >
                        <Icon name='Save' />
                        Save Activity
                    </Button>
                </div>
            </div>

            <div className='w-full flex flex-col gap-8'>
                <FormProvider {...form}>
                    <form className='w-full flex flex-col gap-8'>
                        <ActivityOverviewSection />
                        <ActivityDetailsSection />
                        <ActivityImageSection />
                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export default UpdateActivityForm
