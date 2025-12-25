"use client"
import React from 'react'
import CreateTourForm from '@module/tours/forms/create-tour-form'


const CreateTourPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <CreateTourForm />
        </div>
    )
}

export default CreateTourPage
