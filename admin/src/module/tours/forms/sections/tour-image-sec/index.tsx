"use client"
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '@module/tours/utils/schema'

import TourFormCardWrapper from '../tour-form-card-wrapper'
import { ImageUploadGrid } from '@module/tours/forms/fields'
import { ImageDropzone } from '@/components/form'


const TourImageSection: React.FC = () => {
    const { control } = useFormContext<CreateTourFormType>();

    return (
        <TourFormCardWrapper cardTitle="Images & Media" contentClassName="grid grid-cols-2 gap-6">
            <ImageUploadGrid
                control={control}
                name="tour.images"
                imageType='tour-slider'
                label="Slider Images"
            />
            <ImageUploadGrid
                control={control}
                name="tour.galleryImages"
                imageType='tours'
                label="Gallery Images"
            />
            <Controller
                control={control}
                name='tour.thumbnailImage'
                render={({ field }) => (
                    <ImageDropzone 
                        label='Thumbnail Image'
                        imageType='tour-thumbnails'
                        onChange={field.onChange}
                        value={field.value}
                        imageClassName="h-full max-h-80 min-h-60"
                    />
                )}
            />
        </TourFormCardWrapper>
    )
}

export default TourImageSection
