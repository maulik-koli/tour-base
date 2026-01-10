import React from 'react'
import { BookingSortingOptions } from '@/constants/selectOptions'

import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field'
import { Typography } from '@/components/ui/typography'
import { FilterFields, FilterType } from '@app/(admin)/bookings/page'

interface BookingFilterProps {
    onChange: (name: FilterFields, value: string | undefined) => void;
    filter: FilterType
}


const BookingFilter: React.FC<BookingFilterProps> = ({ filter, onChange }) => {
    return (
        <div className='w-full flex justify-between items-center gap-6 bg-card border border-border rounded-md p-3'>
            <InputField 
                onChange={(value) => onChange("search", value)}
                value={filter.search || ''}
                leftIcon='Search'
                placeholder='Search bookings by customer, booking ID, or tour name'
                containerClass='w-full'
            />
            <div className='flex items-center gap-2 min-w-fit'>
                <Typography variant="muted" className='min-w-fit'>Sort By:</Typography>
                <SelectField
                    containerClass='max-w-40 min-w-40'
                    value={filter.sort}
                    onChange={(value) => onChange("sort", value)}
                    placeholder='Sort by date'
                    options={BookingSortingOptions}
                />
            </div>
        </div>
    )
}

export default React.memo(BookingFilter)
