import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { CategoryFormType } from '@module/category/utils/schema';
import { ImageDropzone, InputField } from '@/components/form';


const CategoryForm: React.FC = () => {
    const { control } = useFormContext<CategoryFormType>();

    return (
        <>
            <div className='w-full grid grid-cols-2 gap-y-4 gap-x-8'>
                <Controller
                    control={control}
                    name='name'
                    render={({ field, fieldState }) => (
                        <InputField
                            label="Category Name"
                            placeholder="Enter category name"
                            onChange={field.onChange}
                            value={field.value}
                            errMsg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='value'
                    render={({ field, fieldState }) => (
                        <InputField
                            label="Category Value"
                            placeholder="Enter category value"
                            onChange={field.onChange}
                            value={field.value}
                            errMsg={fieldState.error?.message}
                        />
                    )}
                />
            </div>
            <Controller
                control={control}
                name='subtitle'
                render={({ field, fieldState }) => (
                    <InputField
                        label="Category Subtitle"
                        placeholder="Enter category subtitle"
                        onChange={field.onChange}
                        value={field.value}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <div className='grid grid-cols-2'>
                <Controller
                    control={control}
                    name='image'
                    render={({ field }) => (
                        <ImageDropzone
                            label='Category Image'
                            onChange={field.onChange}
                            value={field.value}
                            imageClassName="h-full max-h-80"
                        />
                    )}
                />
            </div>
        </>
    )
}

export default CategoryForm
