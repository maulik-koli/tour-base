import React from 'react'
import TourFormCardWrapper from '../tour-form-card-wrapper'
import TextareaComponent from '@/components/form/textarea'
import ArrayListInput from '../array-list-input'
import { Controller, useFormContext } from 'react-hook-form'
import { TourFormType } from '../../utils/schema'

const TourDetailsSection: React.FC = () => {
    const { control } = useFormContext<TourFormType>();

    return (
        <TourFormCardWrapper cardTitle="Details" contentClassName='flex flex-col gap-4'>
            <Controller
                control={control}
                name='description'
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
            <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                <ArrayListInput
                    control={control}
                    name='includes'
                    label='Includes'
                    placeholder='What is included'
                />
                <ArrayListInput
                    control={control}
                    name='excludes'
                    label='Excludes'
                    placeholder='What is excluded'
                />
            </div>
        </TourFormCardWrapper>
    )
}

export default TourDetailsSection
