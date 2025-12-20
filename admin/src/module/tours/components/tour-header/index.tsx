"use client"
import React from 'react'
import { useRouter } from 'next/navigation' 

import Icon from '@/components/icons'
import { Button } from '@ui/button'
import { Typography } from '@ui/typography'


const TourHeader: React.FC = () => {
    const router = useRouter();
    
    const handleAddButton = () => {
        router.push('/tours/create');
    }

    return (
        <div className='w-full flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
                <Typography variant="h2" className='font-semibold'>Tours</Typography>
                <Typography variant="small" className='text-muted-foreground font-normal'>
                    Manage your tours and thier packages
                </Typography>
            </div>
            <Button variant="default" onClick={handleAddButton}>
                <Icon name="Plus" width={16} height={16} fill="none" stroke="currentColor" />
                Create New Tour
            </Button>
        </div>
    )
}

export default TourHeader
