"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/useToast'
import { useDeleteCategory, useUpdateCategory } from '@module/category/api/mutations'
import { categorySchema, CategoryFormType } from '@module/category/utils/schema'
import { flatZodError } from '@/lib/flatZodError'
import { logger } from '@/lib/utils'

import CategoryForm from '../category-form'
import { Card, CardContent, CardFooter } from '@ui/card'
import { Button } from '@ui/button'

interface UpdateCategoryComponentProps {
    data: CategoryFormType
    _id: string
}

const UpdateCategoryComponent: React.FC<UpdateCategoryComponentProps> = ({ data, _id }) => {
    const router = useRouter();
    const form = useForm<CategoryFormType>({
        resolver: zodResolver(categorySchema),
        defaultValues: data
    })
    const { getValues, formState } = form

    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
    const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
    const toast = useToast();

    const onSubmit = (data: CategoryFormType) => {
        const payload = { _id, data };

        updateCategory(payload, {
            onSuccess: () => {
                toast.success("Category updated successfully");
                router.push('/');
            }
        });
    }

    const handleDelete = () => {
        deleteCategory({ _id }, {
            onSuccess: () => {
                toast.success("Category deleted successfully");
                router.push('/');
            }
        });
    }


    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            logger("Form data", getValues())
            const error = flatZodError(categorySchema, getValues())
            if(error) toast.error(error)
        }
    }, [formState.errors]);

    toast.isLoading(isUpdating, "Updating category...");
    toast.isLoading(isDeleting, "Deleting category...");

    
    return (
        <Card className='shadow-none'>
            <FormProvider {...form}>
                <form>
                    <CardContent className='flex flex-col gap-4'>
                        <CategoryForm />
                    </CardContent>
                    <CardFooter className='flex justify-end items-center gap-4 pt-0'>
                        <Button 
                            type='button'
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Button 
                            type='submit'
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            Save
                        </Button>
                    </CardFooter>
                </form>
            </FormProvider>
        </Card>
    )
}

export default UpdateCategoryComponent
