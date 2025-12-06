import React from 'react'
import { Typography } from '@/components/ui/typography'
import CreateTourForm from '@/module/tours/components/create-tour-form'

const CreateTourPage: React.FC = () => {
    return (
         <div className='py-3 px-8'>
            <div className='flex flex-col gap-4'>
                <Typography variant="h1">Create Tour</Typography>
                
                <CreateTourForm />
            </div>
        </div>
    )
}

export default CreateTourPage
