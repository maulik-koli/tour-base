"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/useToast'
import { useUpdateCategory } from '@module/category/api/mutations'
import { categorySchema, CategoryFormType } from '@module/category/utils/schema'
import { flatZodError } from '@/lib/flatZodError'
import { logger } from '@/lib/utils'

import Icon from '@/components/icons'
import CategoryForm from '../category-form'
import DeleteCategoryButton from '../delete-category-btn'
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
    const { getValues, formState: { errors, isDirty } } = form

    const { mutate, isPending } = useUpdateCategory();
    const toast = useToast();

    const onSubmit = (data: CategoryFormType) => {
        const payload = { _id, data };

        mutate(payload, {
            onSuccess: () => {
                toast.success("Category updated successfully");
                router.push('/');
            }
        });
    }

    useEffect(() => {
        if(Object.keys(errors).length > 0) {
            logger("Form data", getValues())
            const error = flatZodError(categorySchema, getValues())
            if(error) toast.error(error)
        }
    }, [errors]);

    toast.isLoading(isPending, "Updating category...");

    
    return (
        <Card className='shadow-none'>
            <FormProvider {...form}>
                <form>
                    <CardContent className='flex flex-col gap-4'>
                        <CategoryForm />
                    </CardContent>
                    <CardFooter className='flex justify-end items-center gap-4 pt-0'>
                        <DeleteCategoryButton _id={_id} />
                        <Button 
                            type='submit'
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={!isDirty || isPending}
                        >
                            <Icon name="Save" />
                            Save
                        </Button>
                    </CardFooter>
                </form>
            </FormProvider>
        </Card>
    )
}

export default UpdateCategoryComponent
