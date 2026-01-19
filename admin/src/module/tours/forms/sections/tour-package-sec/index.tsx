"use client"
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CreateTourFormType } from '@module/tours/utils/schema';
import { DEFAULT_PACKAGE } from '@module/packages/utils/schema';
import { TourStarHirarchyOptions } from '@/constants/selectOptions';
import { usePackageActions } from '@module/packages/hooks/usePackageActions';
import { PackageFieldType } from '@module/packages/utils/helper';
import { useModelStore } from '@/store';
import { cn, logger } from '@/lib/utils';

import Icon from '@/components/icons';
import CollapsibleComponent from '@ui/collapsible/index';
import FormSectionWrapper from '@/components/form-section-wrapper';
import { InputField, CounterInput, SelectField } from '@/components/form';
import { HotelInput } from '@module/tours/forms/fields';
import { Button } from '@ui/button';
import { Typography } from '@ui/typography';

interface TourFormPackageSectionProps {
    type?: 'create' | 'update';
}


const TourFormPackageSection: React.FC<TourFormPackageSectionProps> = ({ type = "create" }) => {
    const { control, getValues, setValue, formState: { errors } } = useFormContext<CreateTourFormType>();
    const showModel = useModelStore(s => s.showModel);
    
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'packages',
    });

    const { 
        handleAddPackage, 
        handleUpdatePackage, 
        handleDeletePackage, 
        isLoading 
    } = usePackageActions();

    const isUpdateMode = type === 'update';

    const handleSavePackage = async (index: number) => {
        const data = getValues(`packages.${index}`) as PackageFieldType;
        logger("Saving package data", data);

        if(isUpdateMode) {
            const isAddPckage = !data._id;

            if(isAddPckage) {
                const resData = await handleAddPackage(data);

                if(resData) setValue(`packages.${index}`, resData);
            } else {
                logger("Updating package data", data);
                const resData = await handleUpdatePackage(data);
                if(resData) setValue(`packages.${index}`, resData);
            }
        }
    }

    const handleRemovePackage = async (index: number) => {
        const data = getValues(`packages.${index}`) as PackageFieldType;

        if(isUpdateMode && data._id) {
            await handleDeletePackage(data._id);
            remove(index);
        }
        else {
            remove(index);
        }
    }

    const handleSaveClick = (index: number) => {
        showModel(() => handleSavePackage(index), {
            title: 'Save Package',
            description: 'Do you want to save the changes made to this package?',
            actionText: 'Save',
            canclelText: 'Cancel',
        });
    }

    const handleDeleteClick = (index: number) => {
        showModel(() => handleRemovePackage(index), {
            title: 'Delete Package',
            description: 'Are you sure you want to delete this package?',
            actionText: 'Delete',
            canclelText: 'Cancel',
        });
    }


    return (
        <FormSectionWrapper 
            cardTitle="Packages" 
            contentClassName='flex flex-col gap-4'
            isChildrenEmpty={fields.length === 0}
            headerNode={
                <Button
                    type='button'
                    className='text-xs'
                    onClick={() => append(DEFAULT_PACKAGE)}
                    disabled={isUpdateMode && isLoading}
                >
                    <Icon name="Plus" />
                    Add Packge
                </Button>
            }
        >
            <CollapsibleComponent
                className='gap-4'
                contentClassName='px-4 border-t'
                triggerClassName='px-0 p-0'
                items={fields.map((_, index) => {
                    const hasMembersError = !!errors.packages?.[index]

                    return {
                        label: (
                            <div className={cn('flex items-center justify-between px-4 p-2 rounded-md',
                                hasMembersError && "bg-destructive/30"
                            )}>
                                <Typography variant='p' className='font-semibold'>
                                    Package No. {index + 1}
                                </Typography>
                                <div className='flex items-center gap-2 w-fit'>
                                    {isUpdateMode && (
                                        <Button
                                            variant="secondary"
                                            type='button'
                                            size="sm"
                                            onClick={() => handleSaveClick(index)}
                                            className='bg-green-400 text-foreground hover:bg-green-400/80 h-8'
                                            disabled={isUpdateMode && isLoading}
                                        >
                                            Save
                                        </Button>
                                    )}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        type='button'
                                        onClick={() => handleDeleteClick(index)}
                                        className='text-destructive border-none'
                                        disabled={isUpdateMode && isLoading}

                                    >
                                        <Icon name="Trash2" width={16} height={16}  />
                                    </Button>
                                </div>
                            </div>
                        ),
                        children: (
                            <div className='flex flex-col gap-4 pb-3'>
                                <div className='grid grid-cols-2 gap-6'>
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
                                    <div className='grid grid-cols-2 gap-6'>
                                        <Controller
                                            control={control}
                                            name={`packages.${index}.days`}
                                            render={({ field, fieldState }) => (
                                                <CounterInput
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label='Days'
                                                    errMsg={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name={`packages.${index}.nights`}
                                            render={({ field, fieldState }) => (
                                                <CounterInput
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label='Nights'
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
                                <div className='grid grid-cols-3 gap-6'>
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
                                    <Controller
                                        control={control}
                                        name={`packages.${index}.childrenPrice`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                type='number'
                                                min={0}
                                                label="Children Price"
                                                placeholder="Enter package price for 6-11 years old"
                                                onChange={(value) => field.onChange(Number(value))}
                                                value={String(field.value)}
                                                errMsg={fieldState.error?.message}
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
        </FormSectionWrapper>
    )
}

export default TourFormPackageSection