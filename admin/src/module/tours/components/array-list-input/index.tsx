import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { cn } from '@/lib/utils';

import InputField from '@/components/form/input-field';
import Icon from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FieldLabel } from '@/components/ui/field';

interface ArrayListInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    containerClass?: string;
}
    

const ArrayListInput = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Enter value",
    containerClass
}:  ArrayListInputProps<T>) => {

    const { field } = useController({
        control,
        name,
    });

    const values = (field.value || []) as string[];

    const handleAdd = () => {
        const newValues = [...values, ""];
        field.onChange(newValues);
    };

    const handleChange = (index: number, value: string) => {
        const newValues = [...values];
        newValues[index] = value;
        field.onChange(newValues);
    };

    const handleRemove = (index: number) => {
        const newValues = values.filter((_, i) => i !== index);
        field.onChange(newValues);
    };

    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            <div className='flex flex-col gap-1.5'>
                <div className='flex items-center gap-2'>
                    <InputField
                        value={values[0] || ""}
                        onChange={(newValue) => handleChange(0, newValue)}
                        placeholder={placeholder}
                        containerClass='flex-1'
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemove(0)}
                        className='text-destructive border-none'
                    >
                        <Icon name='Trash2' width={16} height={16} stroke='currentColor' />
                    </Button>
                </div>
                    {values.slice(1).map((value, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <InputField
                            value={value}
                            onChange={(newValue) => handleChange(index + 1, newValue)}
                            placeholder={placeholder}
                            containerClass='flex-1'
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemove(index + 1)}
                            className='text-destructive border-none'
                        >
                            <Icon name='Trash2' width={16} height={16} stroke='currentColor' />
                        </Button>
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                onClick={handleAdd}
                className="w-fit border-none"
            >
                <Icon name='Plus' width={16} height={16} />
                Add Item
            </Button>
        </div>
    )
}

export default ArrayListInput