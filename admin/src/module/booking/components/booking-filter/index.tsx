import React from 'react'
import {  BookingStatusOptions } from '@/constants/selectOptions'

import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field'
import { Typography } from '@/components/ui/typography'
import { BookingFilterFields, GetBookingListParams } from '@module/booking/api/types'

interface BookingFilterProps {
    onChange: (name: BookingFilterFields, value: string | undefined) => void;
    filter: GetBookingListParams
}


const BookingFilter: React.FC<BookingFilterProps> = ({ filter, onChange }) => {
    return (
        <div className='w-full flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-6 bg-card border border-border rounded-md p-3'>
            <InputField 
                onChange={(value) => onChange("search", value)}
                value={filter.search || ''}
                leftIcon='Search'
                placeholder='Search bookings by customer name'
                containerClass='w-full'
            />
            <div className='flex items-center gap-2 min-w-fit'>
                <Typography variant="muted" className='min-w-fit text-xs md:text-sm'>Sort By:</Typography>
                <SelectField
                    containerClass='max-w-40 min-w-40'
                    value={filter.status || 'NONE'}
                    onChange={(value) => onChange("status", value)}
                    placeholder='Select Status'
                    options={BookingStatusOptions}
                />
            </div>
        </div>
    )
}

export default React.memo(BookingFilter)
