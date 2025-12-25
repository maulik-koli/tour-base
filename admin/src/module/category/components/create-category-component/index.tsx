"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema, CreateCategoryFormType, defaultCategoryValues } from '@module/category/utils/schema'
import { useToast } from '@/hooks/useToast'
import { flatZodError } from '@/lib/flatZodError'
import { logger } from '@/lib/utils'

import CategoryForm from '../category-form'
import { Card, CardContent, CardFooter } from '@ui/card'
import { Button } from '@ui/button'


const CreateCategoryComponent: React.FC = () => {
    const form = useForm<CreateCategoryFormType>({
        resolver: zodResolver(categorySchema),
        defaultValues: defaultCategoryValues
    })
    const { control, getValues, formState } = form

    const toast = useToast();

    const onSubmit = (data: CreateCategoryFormType) => {
        logger("Category Data:", data)
    }

    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            logger("Form data", getValues())
            const error = flatZodError(categorySchema, getValues())
            if(error) toast.error(error)
        }
    }, [formState.errors]);

    
    return (
        <Card className='shadow-none'>
            <form>
                <CardContent className='flex flex-col gap-4'>
                    <CategoryForm<CreateCategoryFormType> control={control} />
                </CardContent>
                <CardFooter className='flex justify-end pt-0'>
                    <Button 
                        type='submit'
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Create Category
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default CreateCategoryComponent