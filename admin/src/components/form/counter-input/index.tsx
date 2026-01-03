import React from 'react'
import { cn } from '@/lib/utils';

import Icon from '@/components/icons';
import { FieldDescription, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

interface CounterInputProps {   
    value: number;
    onChange: (value: number) => void;
    errMsg?: string;
    label?: string;
    containerClassName?: string
}

const CounterInput: React.FC<CounterInputProps> = ({ label, onChange, value, containerClassName, errMsg }) => {

    const handleIncrement = () => {
        onChange(value + 1);
    }

    const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    }

    return (
        <div className='flex flex-col gap-1.5'>
            {label && <FieldLabel>{label}</FieldLabel>}
            <div 
                className={cn(
                    'flex justify-between items-center border rounded-md min-w-30',
                    errMsg ? "border-destructive ring-2 ring-destructive/60" : "border-border",
                    containerClassName
                )}
            >
                <Button
                    variant="outline"
                    size="icon"
                    type='button'
                    onClick={handleDecrement}
                    className='border-none'
                >
                    <Icon name='Minus' width={16} height={16} />
                </Button>
                <div className='flex items-center justify-center'>
                    {value}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    type='button'
                    onClick={handleIncrement}
                    className='border-none'
                >
                    <Icon name='Plus' width={16} height={16} />
                </Button>
            </div>
            {errMsg && <FieldDescription>{errMsg}</FieldDescription>}
        </div>
    )
}

export default CounterInput
