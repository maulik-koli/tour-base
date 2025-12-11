import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { DayDetailsType, TourFormType } from '@/module/tours/utils/schema';

import Icon from '@/components/icons';
import TourFormCardWrapper from '@/module/tours/components/tour-form-card-wrapper'
import InputField from '@/components/form/input-field';
import RichTextEditor from '@/module/tours/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import CollapsibleComponent from '@/components/ui/collapsible/index';

const DEFAILT_DAY_PLAN: DayDetailsType = {
    subtitle: '',
    title: '',
    description: '',
};


const ToursFormDaysSections: React.FC = () => {
    const { control } = useFormContext<TourFormType>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'dayPlans',
    });


    return (
        <TourFormCardWrapper
            cardTitle="Days Plan"
            contentClassName='flex flex-col gap-4'
            headerNode={
                <Button 
                    size="sm"
                    className='text-xs'
                    type='button'
                    onClick={() => append(DEFAILT_DAY_PLAN)}
                >
                    Add Day
                </Button>
            }
        >
            <CollapsibleComponent
                items={fields.map((field, index) => {
                    return {
                        label: (
                            <div className='flex items-center justify-between'>
                                <Typography variant='p' className='font-semibold'>Day {index + 1}</Typography>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    type='button'
                                    onClick={() => remove(index)}
                                >
                                    <Icon name="Trash2" width={16} height={16}  />
                                </Button>
                            </div>
                        ),
                        children: (
                            <div className='flex flex-col gap-4'>
                                <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                                    <Controller
                                        control={control}
                                        name={`dayPlans.${index}.title`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label="Title"
                                                placeholder="Enter day title"
                                                onChange={field.onChange}
                                                value={field.value}
                                                errMsg={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`dayPlans.${index}.subtitle`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label="Subtitle"
                                                placeholder="Enter day subtitle"
                                                onChange={field.onChange}
                                                value={field.value || ""}
                                                errMsg={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name={`dayPlans.${index}.description`}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            label="Description"
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                        />
                                    )}
                                />
                            </div>
                        )
                    }
                })}
            />
        </TourFormCardWrapper>
    )
}

export default ToursFormDaysSections
