"use client"
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { setFilter } from '@/store/slices/tourSlice'
import { DURATION_OPTIONS, SORT_OPTIONS } from '@/constant/select-options'
import { ViewMode } from '@app/tours/page'
import { cn, logger } from '@/lib/utils'

import Icon from '@/components/icons'
import SliderComponent from '@/components/form/slider-component'
import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface TourFilterHeaderProps {
    viewMode: ViewMode;
    onToggleViewMode: (mode: ViewMode) => void;
}


const TourFilterHeader: React.FC<TourFilterHeaderProps> = ({ viewMode, onToggleViewMode }) => {
    const dispatch = useAppDispatch();

    const { filter } = useAppSelector(state => state.tour);
    const [filterPannel, setFilterPannel] = useState<boolean>(false);

    const onFilterChange = (name: string, value: string | number) => {
        dispatch(setFilter({ [name]: value }));
    }
    

    return (
        <div className='w-full p-4 bg-card rounded-xl border border-border'>
            <div className='flex items-center justify-between gap-4'>
                <InputField
                    value={filter.search}
                    onChange={(value) => onFilterChange('search', value)}
                    leftIcon='Search'
                    placeholder='Search tours...'
                    className='w-full'
                    containerClass='w-full'
                />
                <div className='flex items-center gap-4'>
                    <SelectField
                        onChange={(value) => onFilterChange('sortBy', value)}
                        options={SORT_OPTIONS}
                        value={filter.sortBy}
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
                    <div className='grid grid-cols-2 gap-8 items-center'>
                        <div className='grid grid-cols-2 gap-8 items-center'>
                            <SliderComponent 
                                label='Price Range'
                                defaultValue={[50000]}
                                max={50000}
                                min={0}
                                value={[filter.maxPrice]}
                                onChange={(value) => onFilterChange('maxPrice', value[0])}
                                className='w-full'
                                containerClass='w-full'
                            />
                            <SelectField
                                label='Duration'
                                onChange={(value) => onFilterChange('duration', value)}
                                options={DURATION_OPTIONS}
                                value={filter.duration}
                                containerClass='w-full'
                            />
                        </div>
                        <InputField
                            label='Locations'
                            value=''
                            onChange={() => {}}
                            placeholder='Search tours...'
                            className='w-full'
                            containerClass='w-full'
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default TourFilterHeader
