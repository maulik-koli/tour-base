"use client"
import React from 'react'
import { useActivityFilters } from '@/hooks/useActivityFilters'

import Icon from '@/components/icons'
import { InputField } from '@/components/form'
import { Button } from '@ui/button'


const ActivityFilterHeader: React.FC = () => {
    const { filter, applyFilters, resetFilters } = useActivityFilters();

    return (
        <div className='w-full p-3 md:p-4 bg-card rounded-xl border border-border'>
            <div className='flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4'>
                <InputField
                    value={filter.search || ''}
                    onChange={(value) => applyFilters({ ...filter, search: value, page: 1 })}
                    leftIcon='Search'
                    placeholder='Search activities by name or city'
                    className='w-full'
                    containerClass='w-full md:flex-1'
                />

                {filter.search && filter.search.length > 0 && (
                    <Button
                        variant="ghost"
                        className='text-destructive hover:text-destructive shrink-0'
                        onClick={resetFilters}
                    >
                        <Icon name='X' className='w-4 h-4' />
                        <span className='hidden sm:inline'>Clear</span>
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ActivityFilterHeader
