import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '@module/tours//utils/schema'

import TourFormCardWrapper from '../tour-form-card-wrapper'
import { ArrayListInput, CategorySelect, RichTextEditor } from '@module/tours/forms/fields'


const TourDetailsSection: React.FC = () => {
    const { control } = useFormContext<CreateTourFormType>();

    return (
        <TourFormCardWrapper cardTitle="Details" contentClassName='flex flex-col gap-6'>
            <Controller
                control={control}
                name='tour.description'
                render={({ field }) => (
                    <RichTextEditor
                        label="Description"
                        onChange={field.onChange}
                        value={field.value || ""}
                    />
                )}
            />
            <CategorySelect />
            <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                <ArrayListInput
                    control={control}
                    name='tour.includes'
                    label='Includes'
                    placeholder='What is included'
                />
                <ArrayListInput
                    control={control}
                    name='tour.excludes'
                    label='Excludes'
                    placeholder='What is excluded'
                />
            </div>
        </TourFormCardWrapper>
    )
}

export default TourDetailsSection
