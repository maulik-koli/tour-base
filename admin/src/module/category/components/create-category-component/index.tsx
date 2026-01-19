"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateCategory } from '@module/category/api/mutations'
import { useToast } from '@/hooks/useToast'
import { CategoryFormType, categorySchema, defaultCategoryValues } from '@module/category/utils/schema'
import { flatZodError } from '@/lib/zod/flatZodError'
import { logger } from '@/lib/utils'

import Icon from '@/components/icons'
import CategoryForm from '../category-form'
import { Card, CardContent, CardFooter } from '@ui/card'
import { Button } from '@ui/button'


const CreateCategoryComponent: React.FC = () => {
    const router = useRouter();
    const form = useForm<CategoryFormType>({
        resolver: zodResolver(categorySchema),
        defaultValues: defaultCategoryValues
    })
    const { getValues, formState } = form

    const { mutate, isPending } = useCreateCategory();
    const toast = useToast();

    const onSubmit = (data: CategoryFormType) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Category created successfully");
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

    toast.isLoading(isPending, "Creating category...");

    
    return (
        <Card className='shadow-none'>
            <FormProvider {...form}>
                <form>
                    <CardContent className='flex flex-col gap-4'>
                        <CategoryForm />
                    </CardContent>
                    <CardFooter className='flex justify-end pt-0'>
                        <Button 
                            type='submit'
                            onClick={form.handleSubmit(onSubmit)}
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

export default CreateCategoryComponent