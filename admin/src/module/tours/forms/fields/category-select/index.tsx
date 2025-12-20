import React, { useMemo } from 'react'
import { CreateTourFormType } from '@module/tours/utils/schema';
import { useController, useFormContext } from 'react-hook-form';
import { useGetCategoryOptions } from '@module/category/api/queries';

import Icon from '@/components/icons';
import SelectField from '@/components/form/select-field';
import { FieldLabel } from '@ui/field';
import { Typography } from '@ui/typography';
import { CustomSpinner } from '@ui/spinner';


const CategorySelect: React.FC = () => {
    const { control } = useFormContext<CreateTourFormType>();
    const { field } = useController({
        control,
        name: 'tour.categories',
    })
    
    const idValues = field.value as string[];

    const { data, isLoading, error } = useGetCategoryOptions();

    const categoryMap = useMemo(() => {
        if (!data?.data) return new Map<string, string>()
        return new Map(data.data.map(c => [c._id, c.name]))
    }, [data])

    const displayCategories = useMemo(() => {
        return idValues.map(id => categoryMap.get(id) ?? id)
    }, [idValues, categoryMap])


    const handleAdd = (value: string) => {
        if(idValues.includes(value)) return;
        field.onChange([...idValues, value]);
    };

    const handleRemove = (index: number) => {
        field.onChange(idValues.filter((_, i) => i !== index));
    };


    return (
        <div className='flex flex-col gap-1.5'>
            <FieldLabel>Tour Category</FieldLabel>
            <div className='w-full rounded-md bg-card p-3 border border-border flex flex-col gap-2'>
                <div className='p-4 bg-input border border-border rounded-md'>
                    {isLoading ? (
                        <div className='w-full h-full flex items-center justify-center'>
                            <CustomSpinner />
                        </div>   
                    ) : idValues.length === 0 ? (
                        <div className='w-full h-full flex items-center justify-center'>
                            <Typography variant="small" className='font-medium'>Empty</Typography>
                        </div>   
                    ) : (
                        <div className='flex gap-2 items-center flex-wrap'>
                            {displayCategories.map((category, index) => (
                                <div 
                                    className='flex text-sm items-center justify-center rounded-lg px-3 py-1 bg-muted gap-2 border border-border' 
                                    key={`${category}-${index}`}
                                >
                                    <span>{category}</span>
                                    <Icon 
                                        name='X' 
                                        width={12} 
                                        height={12} 
                                        className='cursor-pointer' 
                                        onClick={() => handleRemove(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-4'>
                    <Typography variant="muted">Select a category</Typography>
                    {error && (
                        <Typography variant="muted" className='text-destructive'>Error loading categories</Typography>
                    )}
                    {!isLoading && !error && data?.data && (
                        <SelectField
                            onChange={(value) => handleAdd(value)}
                            options={data.data.map((category) => ({
                                label: category.name,
                                value: category._id,
                            }))}
                            value={undefined}
                            placeholder='Select Category'
                            containerClass='max-w-xs flex-1'
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategorySelect
