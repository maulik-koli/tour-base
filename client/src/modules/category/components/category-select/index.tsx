"use client";
import React from 'react'
import { useGetCategoryOptions } from '@modules/category/api/queries';
import { cn } from '@/lib/utils';

import SelectField from '@/components/form/select-field';
import { Typography } from '@ui/typography';

interface CategorySelectProps {
    handleChange: (value: string) => void;
    label?: string;
    className?: string;
}


const CategorySelect: React.FC<CategorySelectProps> = ({ handleChange, label, className }) => {
    const { data, isLoading, error } = useGetCategoryOptions();

    const getContent = () => {
        if (isLoading) {
            return <Typography variant="muted">Loading categories...</Typography>;
        }
        if (error) {
            return <Typography variant="muted" className='text-destructive'>Error loading categories</Typography>;
        }
        if (!data?.data || data.data.length === 0) {
            return null;
        }

        return (
            <SelectField
                clearable
                label={label}
                onChange={(value) => handleChange(value as string)}
                options={data.data.map((category) => ({
                    label: category.name,
                    value: category.value,
                }))}
                value={undefined}
                placeholder='Select Category'
                containerClass={cn('flex-1', className)}
            />
        );
    }

    return (
        <div>{getContent()}</div>
    )
}

export default CategorySelect
