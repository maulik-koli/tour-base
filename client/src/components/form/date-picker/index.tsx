"use client"
import React, { useMemo } from 'react'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import { Calendar } from '@ui/calendar'
import { FieldLabel } from '@ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'

interface DatePickerProps {
    label?: string
    containerClass?: string
    value: string
    onChange: (date: string) => void
    isDisabled?: boolean
}


const DatePicker: React.FC<DatePickerProps> = ({ label, containerClass, value, onChange, isDisabled = false }) => {
    const [open, setOpen] = React.useState(false)

    const date = useMemo(() => {
        return value ? new Date(value) : undefined
    }, [value])

    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div 
                        className={cn(
                            'h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm text-foreground bg-transparent border flex items-center justify-between cursor-pointer hover:shadow-sm',
                            open ? "border-primary" : "border-border"
                        )}>
                        {date ? date.toLocaleDateString() : "Select date"}
                        <Icon name="Calendar" width={16} height={16} stroke="currentColor" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    disabled={isDisabled}
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        onChange(date ? date.toISOString() : '')
                        setOpen(false)
                    }}
                />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DatePicker
