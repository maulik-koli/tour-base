import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

interface SelectFieldProps extends Omit<React.ComponentProps<typeof Select>, 'onValueChange'> {
    onChange: (value: string | undefined) => void;
    options: Array<{ label: string; value: string }>;
    clearable?: boolean;
    label?: string;
    containerClass?: string;
    selectTriggerClass?: string;
    placeholder?: string;
    className?: string;
}


const SelectField: React.FC<SelectFieldProps> = ({ 
    label, 
    containerClass, 
    selectTriggerClass, 
    onChange, 
    placeholder, 
    options,
    className,
    clearable,
    ...props 
}) => {
    const hasValue = props.value !== undefined;

    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            <Select onValueChange={onChange} {...props} >
                <SelectTrigger type="button" className={cn("w-full h-9", selectTriggerClass)}>
                    <SelectValue placeholder={placeholder}  />
                </SelectTrigger>
                <SelectContent position='popper' className={className} >
                    {options.map((opt, index) => (
                        <SelectItem 
                            key={`${opt.label}-${index}`} 
                            value={opt.value}
                            className='cursor-pointer data-[state=checked]:bg-primary/10'
                        >
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}

export default SelectField