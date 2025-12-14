"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ViewDetailsButtonProps {
    slug: string
}


const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ slug }) => {
    const router = useRouter();
    const redirectToDetails = (slug: string) => {
        router.push(`/tours/${slug}`);
    }

    return (
        <Button
            type='button' 
            onClick={() => redirectToDetails("some-slug")}
        >
            View Details
        </Button>
    )
}

export default ViewDetailsButton
