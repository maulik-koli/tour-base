"use client"
import React from 'react'
import { DefaultPage } from '../../page'
import { useParams } from 'next/navigation'

const TourPage: React.FC = () => {
    const tour = useParams().tour;
    return (
        <DefaultPage page={tour as string || "no tour"} />
    )
}

export default TourPage
