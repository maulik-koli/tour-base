import React from 'react'
import { cn } from '@/lib/utils';

import { Slider } from '@/components/ui/slider'
import { FieldLabel } from '@/components/ui/field';
import { Typography } from '@/components/ui/typography';
import { on } from 'events';

interface SliderComponentProps extends Omit<React.ComponentProps<typeof Slider>, 'onChange'> {
  onChange: (value: number[]) => void;
  label?: string;
  containerClass?: string;
}

// right now this is only using in the price range that is why have use ₹ symbol directly
// can shift to that props and make this componet more generic if needed in future

const SliderComponent: React.FC<SliderComponentProps> = ({ label, containerClass, onChange, ...props }) => {
  const [value, setValue] = React.useState<number[] | undefined>([props.defaultValue ?? 0] as number[]);

  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className='flex flex-col gap-2'>
        <Slider
          value={value}
          onValueChange={(value) => {
            setValue(value)
            onChange(value)
          }}
          {...props}
        />
        <div className='flex justify-between'>
          <Typography variant="small">₹ {props.min}</Typography>
          <Typography variant="small">₹ {value}</Typography>
        </div>
      </div>
    </div>
  )
}

export default SliderComponent
