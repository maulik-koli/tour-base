"use client"
import React from 'react'
import { SortingOptions } from '@/constants/selectOptions';

import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field';
import { Typography } from '@/components/ui/typography';


const TourFilter: React.FC = () => {
    const [searchTour, setSearchTour] = React.useState<string>('');
    const [selectedCategory, setSelectedCategory] = React.useState<string>(SortingOptions[0].value);

    return (
        <div className='w-full flex justify-between items-center gap-6'>
            <InputField 
                onChange={(value) => setSearchTour(value)}
                value={searchTour}
                leftIcon='Search'
                placeholder='Search tourss by name'
                containerClass='w-full'
            />
            <div className='flex items-center gap-2 min-w-fit'>
                <Typography variant="muted" className='min-w-fit'>Sort By:</Typography>
                <SelectField
                    containerClass='max-w-40 min-w-40'
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    placeholder='Filter by category'
                    options={SortingOptions}
                />
            </div>
        </div>
    )
}

export default TourFilter
