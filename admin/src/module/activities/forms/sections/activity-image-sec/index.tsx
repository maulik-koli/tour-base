"use client"
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ActivityPayload } from '@module/activities/utils/schema'

import ActivityFormCardWrapper from '../activity-form-card-wrapper'
import { ImageUploadGrid } from '@module/tours/forms/fields'
import { ImageDropzone } from '@/components/form'


const ActivityImageSection: React.FC = () => {
    const { control } = useFormContext<ActivityPayload>();

    return (
        <ActivityFormCardWrapper cardTitle="Images & Media" contentClassName="grid grid-cols-2 gap-6">
            <Controller
                control={control}
                name='thumbnailImage'
                render={({ field }) => (
                    <ImageDropzone 
                        label='Thumbnail Image'
                        imageType='activity-thumbnails'
                        onChange={field.onChange}
                        value={field.value}
                        imageClassName="h-full max-h-80 min-h-60"
                    />
                )}
            />
            <ImageUploadGrid
                control={control}
                name="images"
                imageType='activities'
                label="Activity Images"
            />
        </ActivityFormCardWrapper>
    )
}

export default ActivityImageSection
