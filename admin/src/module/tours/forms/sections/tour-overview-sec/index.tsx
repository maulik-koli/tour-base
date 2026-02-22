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
        <FormSectionWrapper cardTitle="Overview" contentClassName="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
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
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-primary/10 py-3 md:py-4 px-3 rounded-md'>
                <div className='flex flex-col gap-1'>
                    <FieldLabel className='text-sm md:text-base'>Tour Status</FieldLabel>
                    <Typography variant="small" className='text-xs md:text-sm'>Tour is visible to customers</Typography>
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
                    <Separator className='col-span-1 md:col-span-2' />
                    {featuredButton}
                </>
            )}
        </FormSectionWrapper>
    )
}

export default TourOverviewSection
