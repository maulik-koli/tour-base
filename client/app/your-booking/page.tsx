"use client";
import React from 'react'
import DefaultPage from '@/components/default-page';
import FallbackImage from '@/components/fallback-image';

const TicketPage: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <DefaultPage page="Ticket Page" />
            <div className='relative bg-red-300 h-64 w-full'>
                <FallbackImage
                    src="/some-bs"
                    alt="Invalid Image"
                    className='object-cover'
                />
            </div>
        </div>
    )
}

export default TicketPage
