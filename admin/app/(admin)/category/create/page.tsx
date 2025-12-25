import React from 'react'
import CreateCategoryComponent from '@module/category/components/create-category-component'
import { Typography } from '@ui/typography'


const CreateCategoryPage: React.FC = () => {
    return (
        <div className='w-full px-8 py-6 bg-background gap-6 flex flex-col'>
            <div className='flex flex-col gap-2'>
                <Typography variant="h2">Create Category</Typography>
            </div>

            <CreateCategoryComponent />
        </div>
    )
}

export default CreateCategoryPage