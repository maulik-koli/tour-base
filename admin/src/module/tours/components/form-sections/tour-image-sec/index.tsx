"use client"
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '../../../utils/schema'

import ImageDropzone from '@/components/form/image-dropzone'
import TourFormCardWrapper from '../../tour-form-card-wrapper'
import ImageUploadGrid from '../../image-upload-grid'


const TourImageSection: React.FC = () => {
    const { control } = useFormContext<CreateTourFormType>();

    return (
        <TourFormCardWrapper cardTitle="Images & Media" contentClassName="grid grid-cols-2 gap-y-4 gap-x-8">
            <Controller
                control={control}
                name='tour.thumbnailImage'
                render={({ field }) => (
                    <ImageDropzone 
                        label='Thumbnail Image'
                        onChange={field.onChange}
                        value={field.value}
                        imageClassName="h-full max-h-78"
                    />
                )}
            />
            <ImageUploadGrid />
        </TourFormCardWrapper>
    )
}

export default TourImageSection
