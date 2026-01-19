import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CreateTourFormType, DEFAILT_DAY_PLAN } from '@module/tours/utils/schema';

import Icon from '@/components/icons';
import CollapsibleComponent from '@ui/collapsible/index';
import FormSectionWrapper from '@/components/form-section-wrapper';
import { InputField, RichTextEditor } from '@/components/form';
import { Button } from '@ui/button';
import { Typography } from '@ui/typography';
import { cn } from '@/lib/utils';


const ToursFormDaysSections: React.FC = () => {
    const { control, formState: { errors } } = useFormContext<CreateTourFormType>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tour.dayPlans',
    });


    return (
        <FormSectionWrapper
            cardTitle="Days Plan"
            contentClassName='flex flex-col gap-4'
            isChildrenEmpty={fields.length === 0}
            headerNode={
                <Button 
                    size="sm"
                    className='text-xs'
                    type='button'
                    onClick={() => append(DEFAILT_DAY_PLAN)}
                >
                    <Icon name="Plus" />
                    Add Day
                </Button>
            }
        >
            <CollapsibleComponent
                contentClassName='px-4'
                triggerClassName='px-0 p-0'
                className='gap-4'
                items={fields.map((_, index) => {
                    const hasMembersError = !!errors.tour?.dayPlans?.[index]

                    return {
                        label: (
                            <div className={cn('flex items-center justify-between px-4 p-2 rounded-md',
                                hasMembersError && "bg-destructive/30"
                            )}>
                                <Typography variant='p' className='font-semibold'>Day {index + 1}</Typography>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    type='button'
                                    onClick={() => remove(index)}
                                    className='text-destructive border-none'
                                >
                                    <Icon name="Trash2" width={16} height={16}  />
                                </Button>
                            </div>
                        ),
                        children: (
                            <div className='space-y-6 pb-2'>
                                <div className='grid grid-cols-2 gap-6'>
                                    <Controller
                                        control={control}
                                        name={`tour.dayPlans.${index}.title`}
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
                                        name={`tour.dayPlans.${index}.subtitle`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label="Subtitle"
                                                placeholder="Enter day subtitle"
                                                onChange={(value) => field.onChange(value || null)}
                                                value={field.value || ""}
                                                errMsg={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <Controller
                                    control={control}
                                    name={`tour.dayPlans.${index}.description`}
                                    render={({ field, fieldState }) => (
                                        <RichTextEditor
                                            label="Description"
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            errMsg={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </div>
                        )
                    }
                })}
            />
        </FormSectionWrapper>
    )
}

export default ToursFormDaysSections
