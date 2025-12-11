import React from 'react'
import { FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icons';
import { cn } from '@/lib/utils';

interface CounterInputProps {   
    value: number;
    label?: string;
    onChange: (value: number) => void;
    containerClassName?: string
}

const CounterInput: React.FC<CounterInputProps> = ({ label, onChange, value, containerClassName }) => {

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
        </div>
    )
}

export default CounterInput
