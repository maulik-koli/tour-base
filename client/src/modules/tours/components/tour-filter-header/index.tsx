"use client"
import React, { useState } from 'react'
import InputField from '@/components/form/input-field'
import SelectField from '@/components/form/select-field'
import { Button } from '@/components/ui/button'
import Icon from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import SliderComponent from '@/components/form/slider-component'

const SELECT_OPTIONS = [
    { label: "Newest First", value: "new" },
    { label: "Price: Low to hight", value: "price-low" },
    { label: "Price: High to low", value: "price-high" },
    { label: "Duration", value: "duration" },
]


const TourFilterHeader: React.FC = () => {
    const [filterPannel, setFilterPannel] = useState<boolean>(false);

    return (
        <div className='w-full p-4 bg-secondary rounded-xl'>
            <div className='flex items-center justify-between gap-4'>
                <InputField
                    value=''
                    onChange={() => {}}
                    leftIcon='Search'
                    placeholder='Search tours...'
                    className='w-full'
                    containerClass='w-full'
                />
                <div className='flex items-center gap-4'>
                    <SelectField
                        onChange={() => {}}
                        options={SELECT_OPTIONS}
                        value={SELECT_OPTIONS[0].value}
                        containerClass='min-w-42'
                    />
                    <Button variant="outline" onClick={() => setFilterPannel(fp => !fp)}>
                        <Icon name='Funnel' width={16} height={16} />
                        Filters
                    </Button>
                    <div className='flex items-center'>
                        <Button variant="none" size={'icon'} className='bg-background border-y border-l shadow-none border-border rounded-l rounded-r-none'>
                            <Icon name='LayoutGrid' width={16} height={16} />
                        </Button>
                        <Button variant="none" size={'icon'} className='bg-background border-y border-r shadow-none border-border rounded-r rounded-l-none '>
                            <Icon name='List' width={16} height={16} />
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
                                className='w-full bg-red-200'
                                containerClass='w-full'
                            />
                            <SelectField
                                label='Duration'
                                onChange={() => {}}
                                options={SELECT_OPTIONS}
                                value={SELECT_OPTIONS[0].value}
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
