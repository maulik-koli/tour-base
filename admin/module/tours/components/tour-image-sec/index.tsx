"use client"
import React from 'react'
import TourFormCardWrapper from '../tour-form-card-wrapper'
import ImageDropzone from '@/components/form/image-dropzone'


const TourImageSection: React.FC = () => {
    

    return (
        <TourFormCardWrapper cardTitle="Images & Media" contentClassName="grid grid-cols-2 gap-y-4 gap-x-8">
            <ImageDropzone label='Thumbnail Image' />
        </TourFormCardWrapper>
    )
}

export default TourImageSection
