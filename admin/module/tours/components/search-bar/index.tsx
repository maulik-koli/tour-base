"use client"
import React from 'react'
import InputField from '@/components/form/input-field'

const SearchBar: React.FC = () => {
    const [searchTour, setSearchTour] = React.useState<string>('');

    return (
        <InputField 
            onChange={(value) => setSearchTour(value)}
            value={searchTour}
            leftIcon='Search'
            placeholder='Search tours...'
            className='max-w-100'
        />
    )
}

export default SearchBar
