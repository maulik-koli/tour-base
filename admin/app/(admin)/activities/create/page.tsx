import React from 'react'
import CreateActivityForm from '@module/activities/forms/create-activity-form'


const CreateActivityPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <CreateActivityForm />
        </div>
    )
}

export default CreateActivityPage
