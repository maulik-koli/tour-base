import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { CreateTourFormType } from '@module/tours/utils/schema'

import Icon from '@/components/icons'
import { InputField } from '@/components/form'
import { FieldLabel } from '@ui/field'
import { Button } from '@ui/button'
import { Typography } from '@ui/typography'
import { getDefaultPriceSlot } from '@module/packages/utils/schema'

interface PriceSlotInputProps {
    packageIndex: number;
}


const PriceSlotInput: React.FC<PriceSlotInputProps> = ({ packageIndex }) => {
    const { control } = useFormContext<CreateTourFormType>();
    
    const { append, fields, remove } = useFieldArray({
        control,
        name: `packages.${packageIndex}.priceSlots`,
    })


    return (
        <div className='flex flex-col gap-1.5'>
            <div className='flex items-center gap-4'>
                <FieldLabel className='text-base font-medium text-foreground'>Price Slots</FieldLabel>
                <Button 
                    type='button'
                    variant='outline' 
                    onClick={() => append(getDefaultPriceSlot(fields.length))}
                    size='icon' 
                    className='h-7 w-7'
                >
                    <Icon name='Plus' />
                </Button>
            </div>
            <div className='w-full bg-input rounded-md border border-border px-3 py-4'>
                {fields.length === 0 ? (
                    <div className='w-full h-full flex items-center justify-center py-4'>
                        <Typography variant="muted">No price slots added</Typography>
                    </div>   
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {fields.map((field, index) => (
                            <div key={field.id} className='flex bg-card gap-2 px-3 py-3 border border-border rounded-md'>
                                <div className='flex-1 flex gap-2'>
                                    <Controller
                                        control={control}
                                        name={`packages.${packageIndex}.priceSlots.${index}.persons`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label='Persons'
                                                type='number'
                                                min={2}
                                                max={12}
                                                value={String(field.value)}
                                                onChange={(val) => field.onChange(Number(val))}
                                                errMsg={fieldState.error?.message || ''}
                                                placeholder='2-12'
                                                containerClass='flex-1'
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`packages.${packageIndex}.priceSlots.${index}.price`}
                                        render={({ field, fieldState }) => (
                                            <InputField
                                                label='Price'
                                                type='number'
                                                min={1}
                                                value={String(field.value)}
                                                onChange={(val) => field.onChange(Number(val))}
                                                errMsg={fieldState.error?.message || ''}
                                                placeholder='Price'
                                                containerClass='flex-1'
                                            />
                                        )}
                                    />
                                </div>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    type='button'
                                    onClick={() => remove(index)}
                                    className='text-destructive h-9 w-9 mt-5'
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

export default PriceSlotInput
