import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { ImageDropzone, InputField } from '@/components/form';
import { CreateCategoryFormType, UpdateCategoryFormType } from '@module/category/utils/schema';

type CategoryFormValues = CreateCategoryFormType | UpdateCategoryFormType;

interface CategoryFormProps<T extends FieldValues> {
  control: Control<T>;
}

function CategoryForm<T extends CategoryFormValues>({ control }: CategoryFormProps<T>) {

    return (
        <>
            <div className='w-full grid grid-cols-2 gap-y-4 gap-x-8'>
                <Controller
                    control={control}
                    name={'name' as Path<T>}
                    render={({ field, fieldState }) => (
                        <InputField
                            label="Category Name"
                            placeholder="Enter category name"
                            onChange={field.onChange}
                            value={field.value || ""}
                            errMsg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={'value' as Path<T>}
                    render={({ field, fieldState }) => (
                        <InputField
                            label="Category Value"
                            placeholder="Enter category value"
                            onChange={field.onChange}
                            value={field.value || ""}
                            errMsg={fieldState.error?.message}
                        />
                    )}
                />
            </div>
            <Controller
                control={control}
                name={'subtitle' as Path<T>}
                render={({ field, fieldState }) => (
                    <InputField
                        label="Category Subtitle"
                        placeholder="Enter category subtitle"
                        onChange={field.onChange}
                        value={field.value || ""}
                        errMsg={fieldState.error?.message}
                    />
                )}
            />
            <div className='grid grid-cols-2'>
                <Controller
                    control={control}
                    name={'image' as Path<T>}
                    render={({ field }) => (
                        <ImageDropzone
                            label='Category Image'
                            onChange={field.onChange}
                            value={field.value || ""}
                            imageClassName="h-full max-h-80"
                        />
                    )}
                />
            </div>
        </>
    )
}

export default CategoryForm
