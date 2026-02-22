"use client"
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/useToast'
import { useSubmitActivity } from '@module/activities/hooks/useSubmitActivity'
import { ActivityPayload, activitySchema } from '@module/activities/utils/schema'
import { GetActivityResponse } from '@module/activities/api/types'
import { flatZodError } from '@/lib/zod/flatZodError'
import { logger } from '@/lib/utils'

import Icon from '@/components/icons'
import PageTitle from '@/components/page-title'
import DeleteActivityButton from '../delete-activity-btn'
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
        resolver: zodResolver(activitySchema),
        mode: 'onSubmit',
        defaultValues: data
    })

    const { getValues, formState: { errors, isDirty }, handleSubmit } = form;
    const { onUpdateSubmit, isUpdatingActivity } = useSubmitActivity();
    const toast = useToast();

    useEffect(() => {
        if(Object.keys(errors).length > 0) {
            logger("Form data", getValues())
            const error = flatZodError(activitySchema, getValues())
            if(error) toast.error(error)
        }
    }, [errors]);

    
    return (
        <>
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
                <PageTitle 
                    title='Update Activity'
                    subtitle='Modify your activity details'
                />
                <div className='flex items-center gap-2 md:gap-3 lg:gap-4 flex-wrap'>
                    <DeleteActivityButton slug={data.slug} /> 
                    <Button 
                        type='button'
                        onClick={handleSubmit(onUpdateSubmit)}
                        disabled={!isDirty || isUpdatingActivity}
                        className='text-xs md:text-sm w-fit'
                    >
                        <Icon name='Save' className='w-4 h-4' />
                        Save Activity
                    </Button>
                </div>
            </div>

            <div className='w-full flex flex-col gap-4 md:gap-6 lg:gap-8'>
                <FormProvider {...form}>
                    <form className='w-full flex flex-col gap-4 md:gap-6 lg:gap-8'>
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
