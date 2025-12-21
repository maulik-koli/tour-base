import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '@module/tours/utils/schema'

import Icon from '@/components/icons'
import { InputField } from '@/components/form'
import { FieldLabel } from '@ui/field'
import { Button } from '@ui/button'
import { Typography } from '@ui/typography'
import { DEFAULT_HOTEL } from '@module/packages/utils/schema'

interface HotelInputProps {
    packageIndex: number;
}


const HotelInput: React.FC<HotelInputProps> = ({ packageIndex }) => {
    const { control } = useFormContext<CreateTourFormType>();

    const { append, fields, remove } = useFieldArray({
        control,
        name: `packages.${packageIndex}.hotels`,
    })


    return (
        <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-4'>
                <FieldLabel className='text-base font-medium text-foreground'>Hotels</FieldLabel>
                <Button 
                    type='button'
                    variant='outline' 
                    onClick={() => append(DEFAULT_HOTEL)}
                    size='icon' 
                    className='h-7 w-7'
                >
                    <Icon name='Plus' />
                </Button>
            </div>
            <div className='w-full bg-input rounded-md border border-border px-3 py-4'>
                {fields.length === 0 ? (
                    <div className='w-full h-full flex items-center justify-center'>
                        <Typography variant="muted">No hotels added</Typography>
                    </div>   
                ) : (
                    <div className='flex flex-col gap-3'>
                        {fields.map((field, index) => (
                            <div key={field.id} className='flex bg-card justify-between gap-2 p-2 border border-border rounded-md'>
                                <Controller
                                    control={control}
                                    name={`packages.${packageIndex}.hotels.${index}.nightNo`}
                                    render={({ field, fieldState }) => (
                                        <InputField
                                            label='Nights'
                                            type='number'
                                            min={0}
                                            value={String(field.value)}
                                            onChange={(val) => field.onChange(Number(val))}
                                            errMsg={fieldState.error?.message || ''}
                                            placeholder='Number of nights'
                                            containerClass='max-w-40'
                                        />
                                    )}
                                />
                                <div className='w-full grid grid-cols-2 gap-2'>
                                    <Controller
                                        control={control}
                                        name={`packages.${packageIndex}.hotels.${index}.hotelName`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label='Hotel Name'
                                                value={field.value}
                                                onChange={field.onChange}
                                                errMsg={fieldState.error?.message || ''}
                                                placeholder='Enter hotel name'
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`packages.${packageIndex}.hotels.${index}.city`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label='City'
                                                value={field.value}
                                                onChange={field.onChange}
                                                errMsg={fieldState.error?.message || ''}
                                                placeholder='Enter city'
                                            />
                                        )}
                                    />
                                </div>
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HotelInput
