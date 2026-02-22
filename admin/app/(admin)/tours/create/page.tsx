"use client"
import React from 'react'
import CreateTourForm from '@module/tours/forms/create-tour-form'


const CreateTourPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <CreateTourForm />
        </div>
    )
}

export default CreateTourPage
