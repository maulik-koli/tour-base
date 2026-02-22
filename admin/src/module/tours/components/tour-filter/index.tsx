import React from 'react'
import { SortingOptions } from '@/constants/selectOptions';

import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field';
import { Typography } from '@/components/ui/typography';
import { GetToursParams, TourFilterFields } from '@module/tours/api/types';

interface TourFilterProps {
    onChange: (name: TourFilterFields, value: string | undefined) => void;
    filter: GetToursParams
}


const TourFilter: React.FC<TourFilterProps> = ({ filter, onChange }) => {
    return (
        <div className='w-full flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-6 bg-card border border-border rounded-md p-3'>
            <InputField 
                onChange={(value) => onChange("search", value)}
                value={filter.search || ''}
                leftIcon='Search'
                placeholder='Search tourss by name'
                containerClass='w-full'
            />
            <div className='flex items-center gap-2 min-w-fit'>
                <Typography variant="muted" className='min-w-fit text-xs md:text-sm'>Sort By:</Typography>
                <SelectField
                    containerClass='max-w-40 min-w-40'
                    value={filter.sort}
                    onChange={(value) => onChange("sort", value)}
                    placeholder='Filter by category'
                    options={SortingOptions}
                />
            </div>
        </div>
    )
}

export default React.memo(TourFilter)
