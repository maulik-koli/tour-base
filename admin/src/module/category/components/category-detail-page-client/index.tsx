"use client"
import React, { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCategoryStore } from '@/store'

import UpdateCategoryComponent from '@module/category/components/update-category-component'
import ErrorBlock from '@/components/error-block'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'


const CategoryDetailPageClient: React.FC = () => {
    const router = useRouter();
    const { value } = useParams();
    const categories = useCategoryStore(s => s.categories);

    const categoryData = useMemo(() => 
        categories.find(cat => cat.value === value), 
    [categories, value]);

    return (
        <div className='w-full px-8 py-6 bg-background gap-6 flex flex-col'>
            <div className='flex flex-col gap-2'>
                <Typography variant="h2">Update Category</Typography>
            </div>

            {!categoryData ? (
                <div className='flex flex-col gap-4 items-center'>
                    <ErrorBlock
                        type='no-data' 
                        message='Category not found.'
                        description='Please check the category value and try again.'
                    />
                    <Button variant='outline' onClick={() => router.back()} className='w-fit'>
                        Go Back
                    </Button>
                </div>

            ) : (
                <UpdateCategoryComponent
                    key={categoryData._id || (value as string)}
                    data={{
                        image: categoryData.image,
                        name: categoryData.name,
                        value: categoryData.value,
                        subtitle: categoryData.subtitle,
                    }} 
                    _id={categoryData._id}
                />
            )}
        </div>
    )
}

export default CategoryDetailPageClient
