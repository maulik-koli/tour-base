"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

import InputField from '@/components/form/input-field'
import { Button } from '@/components/ui/button'


const SearchButtonBar: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = React.useState<string>('')

    const handleSearch = () => {
        router.replace(`/tours?search=${encodeURIComponent(searchQuery)}`);
    }

    return (
        <div className='relative w-full max-w-md'>
            <InputField
                type='text'
                placeholder='Search for tours...'
                containerClass='w-full max-w-md'
                className='bg-card h-15 rounded-2xl pr-30'
                leftIcon='Search'
                value={searchQuery}
                onChange={(value) => setSearchQuery(value)}
            />
            
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <Button 
                    variant="default"
                    size='sm'
                    onClick={handleSearch}
                    type='button'
                >
                    Search Tour
                </Button>
            </div>
        </div>
    )
}

export default SearchButtonBar
