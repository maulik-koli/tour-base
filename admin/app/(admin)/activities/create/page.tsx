import React from 'react'
import { Metadata } from 'next'
import CreateActivityForm from '@module/activities/forms/create-activity-form'

export const metadata: Metadata = {
    title: 'Create Activity',
    description: 'Add a new activity or experience to your tour offerings',
}

const CreateActivityPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <CreateActivityForm />
        </div>
    )
}

export default CreateActivityPage
