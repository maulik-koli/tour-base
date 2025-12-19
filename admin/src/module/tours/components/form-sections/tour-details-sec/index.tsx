import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '@/module/tours//utils/schema'

import TourFormCardWrapper from '@/module/tours/components/tour-form-card-wrapper'
import ArrayListInput from '@/module/tours/components/array-list-input'
import TextareaComponent from '@/components/form/textarea'
import TagInputs from '../../tag-input'


const TourDetailsSection: React.FC = () => {
    const { control } = useFormContext<CreateTourFormType>();

    return (
        <TourFormCardWrapper cardTitle="Details" contentClassName='flex flex-col gap-4'>
            <Controller
                control={control}
                name='tour.description'
                render={({ field, fieldState }) => (
                    <TextareaComponent
                        label="Tour Description"
                        placeholder="Enter tour description"
                        onChange={field.onChange}
                        value={field.value}
                        rows={8}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <TagInputs label='Categories' />
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
