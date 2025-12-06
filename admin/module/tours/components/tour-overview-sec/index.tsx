import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import TourFormCardWrapper from '../tour-form-card-wrapper'
import InputField from '@/components/form/input-field'
import { Separator } from '@/components/ui/separator'
import { FieldLabel } from '@/components/ui/field'
import { Typography } from '@/components/ui/typography'
import { Switch } from '@/components/ui/switch'
import { TourFormType } from '../../utils/schema'


const TourOverviewSection: React.FC = () => {
    const { control } = useFormContext<TourFormType>();

    return (
        <TourFormCardWrapper cardTitle="Overview" contentClassName="grid grid-cols-2 gap-y-4 gap-x-8">
            <Controller
                control={control}
                name='name'
                render={({ field, fieldState }) => (
                    <InputField
                        label="Tour Name"
                        placeholder="Enter tour name"
                        onChange={field.onChange}
                        value={field.value}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='youtubeVideoUrl'
                render={({ field, fieldState }) => (
                    <InputField
                        label="YouTube Video URL"
                        placeholder="https://www.youtube.com/watch?v=..."
                        onChange={field.onChange}
                        value={field.value || ""}
                    />
                )}
            />
            <Separator className='col-span-2' />
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-1'>
                    <FieldLabel>Tour Status</FieldLabel>
                    <Typography variant="small">Tour is visible to customers</Typography>
                </div>
                <Controller
                    control={control}
                    name='isActive'
                    render={({ field }) => (
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                />
            </div>
        </TourFormCardWrapper>
    )
}

export default TourOverviewSection
