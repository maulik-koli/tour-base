import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CreateTourFormType, PackageFormType } from '@module/tours/utils/schema';
import { TourStarHirarchyOptions } from '@/constants/selectOptions';

import Icon from '@/components/icons';
import TourFormCardWrapper from '../tour-form-card-wrapper';
import CollapsibleComponent from '@ui/collapsible/index';
import { InputField, CounterInput, SelectField } from '@/components/form';
import { HotelInput } from '@module/tours/forms/fields';
import { Button } from '@ui/button';
import { Typography } from '@ui/typography';

const DEFAULT_PACKAGE : PackageFormType = {
    name: "",
    days: 0,
    nights: 0,
    startCity: "",
    endCity: "",
    pricePerPerson: 0,
    starHierarchy: 1,
    hotels: [],
}


const TourFormPackageSection: React.FC = () => {
    const { control } = useFormContext<CreateTourFormType>();
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'packages',
    });
    
    return (
        <TourFormCardWrapper 
            cardTitle="Packages" 
            contentClassName='flex flex-col gap-4'
            headerNode={
                <Button
                    type='button'
                    className='text-xs'
                    onClick={() => append(DEFAULT_PACKAGE)}
                >
                    <Icon name="Plus" />
                    Add Packge
                </Button>
            }
        >
            <CollapsibleComponent
                items={fields.map((_, index) => {
                    return {
                        label: (
                            <div className='flex items-center justify-between'>
                                <Typography variant='p' className='font-semibold'>
                                    Package No. {index + 1}
                                </Typography>
                                <div className='flex items-center gap-2 w-fit'>
                                    <Button
                                        variant="secondary"
                                        type='button'
                                        size="sm"
                                        onClick={() => remove(index)}
                                        className='bg-green-400 text-foreground hover:bg-green-400/80 h-8'
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        type='button'
                                        onClick={() => remove(index)}
                                        className='text-destructive border-none'
                                        disabled={fields.length === 1}
                                    >
                                        <Icon name="Trash2" width={16} height={16}  />
                                    </Button>
                                </div>
                            </div>
                        ),
                        children: (
                            <div className='flex flex-col gap-4 border-t pt-6 pb-3'>
                                <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                                    <Controller
                                        control={control}
                                        name={`packages.${index}.name`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label="Package Name"
                                                placeholder="Enter package name"
                                                onChange={field.onChange}
                                                value={field.value}
                                                errMsg={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                    <div className='grid grid-cols-3 gap-5'>
                                        <Controller
                                            control={control}
                                            name={`packages.${index}.days`}
                                            render={({ field }) => (
                                                <CounterInput
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label='Days'
                                                    containerClassName="min-w-25"
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name={`packages.${index}.nights`}
                                            render={({ field }) => (
                                                <CounterInput
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label='Nights'
                                                    containerClassName="min-w-25"
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name={`packages.${index}.pricePerPerson`}
                                            render={({ field, fieldState }) => (
                                                <InputField
                                                    type='number'
                                                    min={0}
                                                    label="Package Price"
                                                    placeholder="Enter package price per person"
                                                    onChange={(value) => field.onChange(Number(value))}
                                                    value={String(field.value)}
                                                    errMsg={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <Controller
                                        control={control}
                                        name={`packages.${index}.startCity`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label="Start City"
                                                placeholder="Enter name of city where tour starts"
                                                onChange={field.onChange}
                                                value={field.value}
                                                errMsg={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`packages.${index}.endCity`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label="End City"
                                                placeholder="Enter name of city where tour ends"
                                                onChange={field.onChange}
                                                value={field.value}
                                                errMsg={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Controller
                                        control={control}
                                        name={`packages.${index}.starHierarchy`}
                                        render={({ field }) => (
                                            <SelectField
                                                label="Star"
                                                options={TourStarHirarchyOptions}
                                                onChange={(value) => field.onChange(Number(value))}
                                                value={field.value.toString()}
                                                containerClass='min-w-50'
                                            />
                                        )}
                                    />
                                </div>
                                <HotelInput packageIndex={index} />
                            </div>
                        )
                    }
                })}
            />
        </TourFormCardWrapper>
    )
}

export default TourFormPackageSection
