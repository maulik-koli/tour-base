"use client"
import React, { useState } from 'react'
import { useTourFilters } from '@/hooks/useTourFilters'
import { DURATION_OPTIONS, SORT_OPTIONS } from '@/constants/select-options'
import { ViewMode } from '@app/tours/page'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import CategorySelect from '@modules/category/components/category-select'
import { SliderComponent, InputField, SelectField } from '@/components/form'
import { Separator } from '@ui/separator'
import { Button } from '@ui/button'

interface TourFilterHeaderProps {
    viewMode: ViewMode;
    onToggleViewMode: (mode: ViewMode) => void;
}


const TourFilterHeader: React.FC<TourFilterHeaderProps> = ({ viewMode, onToggleViewMode }) => {
    const { filter, applyFilters, resetFilters } = useTourFilters()
    const [filterPannel, setFilterPannel] = useState<boolean>(false);

    return (
        <div className='w-full p-4 bg-card rounded-xl border border-border'>
            <div className='flex items-center justify-between gap-4'>
                <InputField
                    value={filter.search || ''}
                    onChange={(value) => applyFilters({ ...filter, search: value })}
                    leftIcon='Search'
                    placeholder='Search tours...'
                    className='w-full'
                    containerClass='w-full'
                />
                <div className='flex items-center gap-4'>
                    <SelectField
                        clearable
                        onChange={(value) => applyFilters({ ...filter, sort: value })}
                        options={SORT_OPTIONS}
                        value={filter.sort || SORT_OPTIONS[0].value}
                        containerClass='min-w-50'
                    />
                    <Button 
                        variant="outline" 
                        onClick={() => setFilterPannel(fp => !fp)}
                        className={cn(filterPannel && "bg-primary/80 text-primary-foreground")}
                    >
                        <Icon name='Funnel' width={16} height={16} />
                        Filters
                    </Button>
                    <div className='flex items-center'>
                        <Button 
                            variant="outline" 
                            size='icon' 
                            className={cn(
                                'border-y border-l border-border rounded-l rounded-r-none',
                                viewMode === 'list' ? 'bg-primary/80 text-primary-foreground' : 'bg-card'
                            )}
                            onClick={() => onToggleViewMode('list')}
                        >
                            <Icon name='List' width={16} height={16} />
                        </Button>
                        <Button 
                            variant="outline" 
                            size='icon' 
                            className={cn(
                                'border-y border-r border-border rounded-r rounded-l-none',
                                viewMode === 'grid' ? 'bg-primary/80 text-primary-foreground' : 'bg-card'
                            )}
                            onClick={() => onToggleViewMode('grid')}
                        >
                            <Icon name='LayoutGrid' width={16} height={16} />
                        </Button>
                    </div>
                </div>
            </div>
            {filterPannel && (
                <>
                    <Separator className='my-4' />
                    <div className='w-full flex gap-4 items-center'>
                        <div className='w-full grid grid-cols-3 gap-8 items-center'>
                            <SliderComponent 
                                label='Price Range'
                                defaultValue={[50000]}
                                max={50000}
                                min={0}
                                value={[filter.maxPrice || 50000]}
                                onChange={(value) => applyFilters({ ...filter, maxPrice: value[0] })}
                                className='w-full'
                                containerClass='w-full'
                            />
                            <SelectField
                                clearable
                                label='Duration'
                                onChange={(value) => applyFilters({ ...filter, duration: value })}
                                options={DURATION_OPTIONS}
                                value={filter.duration}
                                placeholder='Select duration of tour'
                                containerClass='w-full'
                            />
                            <CategorySelect
                                label='Category'
                                handleChange={(value) => applyFilters({ ...filter, category: value })}
                                className='w-full'
                            />
                        </div>
                        <Button
                            variant="link"
                            className='text-destructive'
                            onClick={resetFilters}
                        >
                            Clear All Filters
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default TourFilterHeader
