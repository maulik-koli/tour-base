import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ActivityPayload } from '@module/activities/utils/schema'

import ActivityFormCardWrapper from '../activity-form-card-wrapper'
import { RichTextEditor } from '@module/tours/forms/fields'


const ActivityDetailsSection: React.FC = () => {
    const { control } = useFormContext<ActivityPayload>();

    return (
        <ActivityFormCardWrapper cardTitle="Details" contentClassName='flex flex-col gap-6'>
            <Controller
                control={control}
                name='description'
                render={({ field, fieldState }) => (
                    <RichTextEditor
                        label="Description"
                        onChange={field.onChange}
                        value={field.value || ""}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='extraNote'
                render={({ field, fieldState }) => (
                    <RichTextEditor
                        label="Extra Note"
                        onChange={field.onChange}
                        value={field.value || ""}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
        </ActivityFormCardWrapper>
    )
}

export default ActivityDetailsSection
