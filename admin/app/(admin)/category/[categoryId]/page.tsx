import React from 'react'
import { Typography } from '@ui/typography'
import UpdateCategoryComponent from '@module/category/components/update-category-component'
import { defaultCategoryValues } from '@module/category/utils/schema'


const CategoryDetail: React.FC = () => {
    return (
        <div className='w-full px-8 py-6 bg-background gap-6 flex flex-col'>
            <div className='flex flex-col gap-2'>
                <Typography variant="h2">Update Category</Typography>
            </div>

            <UpdateCategoryComponent data={defaultCategoryValues} />
        </div>
    )
}

export default CategoryDetail