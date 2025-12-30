import React from 'react'
import Icon from '@/components/icons'
import { Typography } from '@ui/typography'
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';

// this will shift into api/types later
export const paymentOptionsEnum = ["PARTIAL", "FULL"] as const;
type PaymentOption = typeof paymentOptionsEnum[number];


const PaymentSubmit: React.FC = () => {
    const [selectedPaymentOption, setSelectedPaymentOption] = React.useState<PaymentOption>("FULL");

    return (
        <div className='w-full p-6 bg-card flex flex-col gap-6 border border-border rounded-lg'>
            <div className='flex items-center gap-2'>
                <Icon name='CreditCard' width={24} height={24} className='text-primary'/>
                <Typography variant="h4" className='font-medium'>Payment Options</Typography>
            </div>
            <div className='w-full grid grid-cols-2 gap-6'>
                <SelectCard 
                    selectedValue={selectedPaymentOption}
                    onChange={setSelectedPaymentOption}
                    valueId={0}
                    dispalyValue={{
                        title: "Full Payment (100%)",
                        description: "Pay the complete amount now",
                        amount: 1200
                    }}
                />
                <SelectCard 
                    selectedValue={selectedPaymentOption}
                    onChange={setSelectedPaymentOption}
                    valueId={1}
                    dispalyValue={{
                        title: "Partial Payment (50%)",
                        description: "Pay 50% now, rest later",
                        amount: 600
                    }}
                />
            </div>
            <Button 
                size='lg' 
                type='button'
                className='w-full h-12 mt-4 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg cursor-pointer whitespace-nowrap flex items-center justify-center'
            >
                Proceed to Payment
            </Button>
        </div>
    )
}

export default PaymentSubmit



interface SelectCardProps {
    selectedValue: PaymentOption;
    onChange: (value: PaymentOption) => void;
    valueId: number;
    dispalyValue: {
        title: string;
        description: string;
        amount: number;
    }
}


const SelectCard: React.FC<SelectCardProps> = function({ selectedValue, onChange, valueId, dispalyValue }) {
    return (
        <div 
            className={cn(
                'w-full flex gap-4 items-center p-4 hover:bg-accent/10 hover:border-accent cursor-pointer rounded-md border',
                selectedValue === paymentOptionsEnum[valueId] ? 'bg-primary/10 border-primary' : "bg-card border-border"
            )}
            onClick={() => onChange(paymentOptionsEnum[valueId])}
        >
            <input 
                type="radio"
                id={paymentOptionsEnum[valueId]}
                name="paymentMethod"
                value={paymentOptionsEnum[valueId]}
                checked={selectedValue === paymentOptionsEnum[valueId]}
                onChange={() => onChange(paymentOptionsEnum[valueId])}
            />
            <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex items-center justify-between'>
                    <Typography variant="p" className='font-medium'>{dispalyValue.title}</Typography>
                    <Typography variant="p" className='font-semibold text-primary'>₹ {dispalyValue.amount}</Typography>
                </div>
                <Typography variant="small" >
                    {dispalyValue.description}
                </Typography>
            </div>
        </div>
    )
}