import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ActivityPayload } from '@module/activities/utils/schema'

import FormSectionWrapper from '@/components/form-section-wrapper'
import { InputField } from '@/components/form'
import { FieldLabel } from '@ui/field'
import { Typography } from '@ui/typography'
import { Switch } from '@ui/switch'


const ActivityOverviewSection: React.FC = () => {
    const { control } = useFormContext<ActivityPayload>();

    return (
        <FormSectionWrapper cardTitle="Overview" contentClassName="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            <Controller
                control={control}
                name='title'
                render={({ field, fieldState }) => (
                    <InputField
                        label="Activity Title"
                        placeholder="Enter activity title"
                        onChange={field.onChange}
                        value={field.value}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='subtitle'
                render={({ field, fieldState }) => (
                    <InputField
                        label="Activity Subtitle"
                        placeholder="Enter activity subtitle"
                        onChange={field.onChange}
                        value={field.value}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='city'
                render={({ field, fieldState }) => (
                    <InputField
                        label="City"
                        placeholder="Enter city"
                        onChange={field.onChange}
                        value={field.value}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='pricePerPerson'
                render={({ field, fieldState }) => (
                    <InputField
                        label="Price Per Person"
                        type="number"
                        placeholder="Enter price"
                        onChange={(value) => field.onChange(value ? Number(value) : 0)}
                        value={field.value?.toString() || '0'}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-primary/10 py-3 md:py-4 px-3 rounded-md md:col-span-2'>
                <div className='flex flex-col gap-1'>
                    <FieldLabel className='text-sm md:text-base'>Activity Status</FieldLabel>
                    <Typography variant="small" className='text-xs md:text-sm'>Activity is visible to customers</Typography>
                </div>
                <Controller
                    control={control}
                    name='isActive'
                    render={({ field }) => (
                        <Switch checked={field.value || false} onCheckedChange={field.onChange} />
                    )}
                />
            </div>
        </FormSectionWrapper>
    )
}

export default ActivityOverviewSection
