"use client"
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ActivityPayload } from '@module/activities/utils/schema'

import FormSectionWrapper from '@/components/form-section-wrapper'
import { ImageDropzone, ImageUploadGrid } from '@/components/form'


const ActivityImageSection: React.FC = () => {
    const { control } = useFormContext<ActivityPayload>();

    return (
        <FormSectionWrapper cardTitle="Images & Media" contentClassName="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
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
        </FormSectionWrapper>
    )
}

export default ActivityImageSection
