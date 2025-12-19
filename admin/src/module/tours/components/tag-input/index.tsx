import React from 'react'
import { CreateTourFormType } from '../../utils/schema';
import { useController, useFormContext } from 'react-hook-form';

import Icon from '@/components/icons';
import SelectField from '@/components/form/select-field';
import { FieldLabel } from '@/components/ui/field';
import { Typography } from '@/components/ui/typography';

export const CATEGORY_OPTIONS = [
    { label: "Adventure", value: "69457de82f9499279c5a4af2" },
    { label: "Cultural", value: "cultural" },
    { label: "Relaxation", value: "relaxation" },
    { label: "Wildlife", value: "wildlife" },
    { label: "Spiritual", value: "spiritual" },
    { label: "Nature", value: "nature" },
];


interface TagInputsProps {
    label?: string;
    placeholder?: string;
}

// call api in this component to get categories
// set the values for the categories which display labels
// do not let user to add same value more than once

const TagInputs: React.FC<TagInputsProps> = ({ label, placeholder }) => {
    const { control } = useFormContext<CreateTourFormType>();
    const { field } = useController({
        control,
        name: 'tour.categories',
    })

    const categories = (field.value || []) as string[];

    const handleAdd = (value: string) => {
        const newCategory = [...categories, value];
        field.onChange(newCategory);
    };

    const handleRemove = (index: number) => {
        const newCategory = categories.filter((_, i) => i !== index);
        field.onChange(newCategory);
    };


    return (
        <div className='flex flex-col gap-1.5'>
            {label && <FieldLabel>{label}</FieldLabel>}
            <div className='w-full rounded-md bg-card p-3 border border-border flex flex-col gap-2'>
                <div className='p-4 bg-input border border-border rounded-md'>
                    {categories.length === 0 ? (
                        <div className='w-full h-full flex items-center justify-center'>
                            <Typography variant="small" className='font-medium'>Empty</Typography>
                        </div>   
                    ) : (
                        <div className='flex gap-2 items-center flex-wrap'>
                            {categories.map((category, index) => (
                                <div className='flex text-sm items-center justify-center rounded-lg px-3 py-1 bg-muted gap-2 border border-border' key={index}>
                                    <div>
                                        {category}
                                    </div>
                                    <Icon name='X' width={12} height={12} className='cursor-pointer' onClick={() => handleRemove(index)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-4'>
                    <Typography variant="muted">{placeholder || "Select a item"}</Typography>
                    <SelectField
                        onChange={(value) => handleAdd(value)}
                        options={CATEGORY_OPTIONS}
                        value={""}
                        containerClass='max-w-xs flex-1'
                    />
                </div>
            </div>
        </div>
    )
}

export default TagInputs
