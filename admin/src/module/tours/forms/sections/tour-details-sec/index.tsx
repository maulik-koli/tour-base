import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '@module/tours//utils/schema'

import FormSectionWrapper from '@/components/form-section-wrapper'
import { ArrayListInput, CategorySelect } from '@module/tours/forms/fields'
import { RichTextEditor } from '@/components/form'


const TourDetailsSection: React.FC = () => {
    const { control } = useFormContext<CreateTourFormType>();

    return (
        <FormSectionWrapper cardTitle="Details" contentClassName='flex flex-col gap-4 md:gap-5 lg:gap-6'>
            <Controller
                control={control}
                name='tour.description'
                render={({ field, fieldState }) => (
                    <RichTextEditor
                        label="Description"
                        onChange={field.onChange}
                        value={field.value || ""}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <CategorySelect />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 lg:gap-x-8'>
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
        </FormSectionWrapper>
    )
}

export default TourDetailsSection
