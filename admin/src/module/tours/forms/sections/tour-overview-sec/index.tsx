import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '@module/tours/utils/schema'

import FormSectionWrapper from '@/components/form-section-wrapper'
import { InputField } from '@/components/form'
import { FieldLabel } from '@ui/field'
import { Typography } from '@ui/typography'
import { Switch } from '@ui/switch'
import { Separator } from '@ui/separator'

interface TourOverviewSectionProps {
    featuredButton?: React.ReactNode;
}


const TourOverviewSection: React.FC<TourOverviewSectionProps> = ({ featuredButton }) => {
    const { control } = useFormContext<CreateTourFormType>();

    return (
        <FormSectionWrapper cardTitle="Overview" contentClassName="grid grid-cols-2 gap-6">
            <Controller
                control={control}
                name='tour.name'
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
                name='tour.youtubeVideoUrl'
                render={({ field, fieldState }) => (
                    <InputField
                        label="YouTube Video URL"
                        placeholder="https://www.youtube.com/watch?v=..."
                        onChange={(value) => field.onChange(value !== '' ? value : null)}
                        value={field.value || ''}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='tour.tagLine'
                render={({ field, fieldState }) => (
                    <InputField
                        label="Tour Tag Line"
                        placeholder="Enter tour tag line"
                        onChange={field.onChange}
                        value={field.value}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <div className='flex justify-between items-center bg-primary/10 py-4 px-3 rounded-md '>
                <div className='flex flex-col gap-1'>
                    <FieldLabel>Tour Status</FieldLabel>
                    <Typography variant="small">Tour is visible to customers</Typography>
                </div>
                <Controller
                    control={control}
                    name='tour.isActive'
                    render={({ field }) => (
                        <Switch checked={field.value || false} onCheckedChange={field.onChange} />
                    )}
                />
            </div>
            {featuredButton && (
                <>
                    <Separator className='col-span-2' />
                    {featuredButton}
                </>
            )}
        </FormSectionWrapper>
    )
}

export default TourOverviewSection
