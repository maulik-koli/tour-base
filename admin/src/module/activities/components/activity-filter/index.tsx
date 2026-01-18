import React from 'react'
import { SortingOptions } from '@/constants/selectOptions';

import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field';
import { Typography } from '@/components/ui/typography';
import { FilterFields, FilterType } from '../activity-grid';

interface ActivityFilterProps {
    onChange: (name: FilterFields, value: string | undefined) => void;
    filter: FilterType
}


const ActivityFilter: React.FC<ActivityFilterProps> = ({ filter, onChange }) => {
    return (
        <div className='w-full flex justify-between items-center gap-6 bg-card border border-border rounded-md p-3'>
            <InputField 
                onChange={(value) => onChange("search", value)}
                value={filter.search || ''}
                leftIcon='Search'
                placeholder='Search activities by title'
                containerClass='w-full'
            />
            <div className='flex items-center gap-2 min-w-fit'>
                <Typography variant="muted" className='min-w-fit'>Sort By:</Typography>
                <SelectField
                    containerClass='max-w-40 min-w-40'
                    value={filter.sort}
                    onChange={(value) => onChange("sort", value)}
                    placeholder='Sort by'
                    options={SortingOptions}
                />
            </div>
        </div>
    )
}

export default React.memo(ActivityFilter)
