import React from 'react'
import { PaymentOption } from '@modules/booking/api/types';
import { useBookingPayment } from '@modules/booking/api/mutations';
import { useCashfree } from '@/hooks/useCashfree';
import { cn } from '@/lib/utils';

import Icon from '@/components/icons'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button';
import { SpinnerOverlay } from '@ui/spinner';

interface PaymentSubmitProps {
    bookingId: string,
    totalAmount: number
    options: PaymentOption
    onOptionChange: (op: PaymentOption) => void
}


const PaymentSubmit: React.FC<PaymentSubmitProps> = ({ onOptionChange, options, totalAmount, bookingId }) => {
    const { mutate, isPending } = useBookingPayment()
    const { cashfree, isLoaded } = useCashfree()

    const onProceedPayment = () => {
        if (!cashfree) return;

        mutate({
            bookingId,
            paymentOption: options
        }, {
            onSuccess: async (data) => {
                if(data.data) {
                    await cashfree.checkout({
                        paymentSessionId: data.data.paymentSessionId
                    })
                }
            }
        })
    }

    if(isPending || !isLoaded) {
        return <div className='h-screen'><SpinnerOverlay /></div>
    }

    return (
        <div className='w-full p-4 md:p-6 bg-card flex flex-col gap-4 md:gap-6 border border-border rounded-lg'>
            <div className='flex items-center gap-2'>
                <Icon name='CreditCard' className='w-5 h-5 md:w-6 md:h-6 text-primary'/>
                <Typography variant="h4" className='font-medium'>Payment Options</Typography>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                <SelectCard 
                    selectedValue={options}
                    onChange={onOptionChange}
                    cardValue="FULL"
                    dispalyValue={{
                        title: "Full Payment (100%)",
                        description: "Pay the complete amount now",
                        amount: totalAmount
                    }}
                />
                <SelectCard 
                    selectedValue={options}
                    onChange={onOptionChange}
                    cardValue='PARTIAL'
                    dispalyValue={{
                        title: "Partial Payment (50%)",
                        description: "Pay 50% now, rest later",
                        amount: totalAmount / 2
                    }}
                />
            </div>
            <Button 
                size='lg' 
                type='button'
                onClick={onProceedPayment}
                className='w-full h-11 md:h-12 mt-2 md:mt-4 bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg font-semibold text-base md:text-lg cursor-pointer whitespace-nowrap flex items-center justify-center'
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
    cardValue: PaymentOption;
    dispalyValue: {
        title: string;
        description: string;
        amount: number;
    }
}


const SelectCard: React.FC<SelectCardProps> = function({ selectedValue, onChange, cardValue, dispalyValue }) {
    return (
        <div 
            className={cn(
                'w-full flex gap-4 items-center p-4 hover:bg-accent/10 hover:border-accent cursor-pointer rounded-md border',
                selectedValue === cardValue ? 'bg-primary/10 border-primary' : "bg-card border-border"
            )}
            onClick={() => onChange(cardValue)}
        >
            <input 
                type="radio"
                id={cardValue}
                name="paymentMethod"
                value={cardValue}
                checked={selectedValue === cardValue}
                onChange={() => onChange(cardValue)}
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