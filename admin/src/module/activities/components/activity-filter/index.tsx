import React from 'react'

import InputField from '@/components/form/input-field'

interface ActivityFilterProps {
    onChange: (value: string | undefined) => void;
    searchFilters: string | undefined;
}


const ActivityFilter: React.FC<ActivityFilterProps> = ({ searchFilters, onChange }) => {
    return (
        <div className='w-full flex justify-between items-center gap-3 md:gap-6 bg-card border border-border rounded-md p-3'>
            <InputField 
                onChange={(value) => onChange(value)}
                value={searchFilters || ''}
                leftIcon='Search'
                placeholder='Search activities by title'
                containerClass='w-full'
            />
        </div>
    )
}

export default React.memo(ActivityFilter)
