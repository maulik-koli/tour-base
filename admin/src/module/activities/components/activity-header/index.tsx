"use client"
import React from 'react'
import { useRouter } from 'next/navigation' 

import Icon from '@/components/icons'
import PageTitle from '@/components/page-title'
import { Button } from '@ui/button'


const ActivityHeader: React.FC = () => {
    const router = useRouter();
    
    const handleAddButton = () => {
        router.push('/activities/create');
    }

    return (
        <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
            <PageTitle
                title='Activities'
                subtitle='Manage your activities'
            />
            <Button variant="default" onClick={handleAddButton} className='text-xs md:text-sm w-fit'>
                <Icon name="Plus" width={14} height={14} className='md:w-4 md:h-4' fill="none" stroke="currentColor" />
                Create New Activity
            </Button>
        </div>
    )
}

export default ActivityHeader
