import React from 'react'
import Icon from '@/components/icons'
import PaymentSubmit from '../payment-submit'
import PaymentTerms from '../payment-terms'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'


const ReceiptPayment: React.FC = () => {
    return (
        <div className='w-full bg-card py-4 px-8 border border-border rounded-md flex flex-col gap-6'>
            <Typography variant="h3">
                Booking Receipt & Travel Members   
            </Typography>
            <div className='w-full px-12 py-8 flex flex-col gap-8 rounded-lg border border-dashed border-primary bg-primary/15'>
                <div className='w-full flex items-center justify-center'>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center'>
                            <Icon name='TicketCheck' width={50} height={50}  />
                        </div>
                        <Typography variant="h4" className='text-center'>
                            Eklavya Tourism
                        </Typography>
                        <div className='flex items-center gap-4'>
                            <Typography variant="p">
                                Date: 29/12/2025
                            </Typography>
                            <Typography variant="small" className='bg-accent/20 text-accent-foreground py-1 px-2 rounded-lg font-semibold'>
                                Confirm
                            </Typography>
                        </div>
                    </div>
                </div>

                <Separator className='bg-foreground/50' />

                <div className='w-full grid grid-cols-2 gap-12'>
                    <div className='w-full bg-card p-4 rounded-md border border-border flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='MapPinned' width={18} height={18} className='text-primary'/>
                            <Typography variant="large" className='font-medium'>Traveler Details</Typography>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Tour:</Typography>
                                <Typography variant="p" className='font-medium'>Some Tour Name</Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Package Name:</Typography>
                                <Typography variant="p" className='font-medium'>Some Package Name</Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Routes:</Typography>
                                <Typography variant="p" className='font-medium'>City X {`→`} City Y</Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Date:</Typography>
                                <Typography variant="p" className='font-medium'>31/12/2025</Typography>
                            </div>
                        </div>
                    </div>
                    <div className='w-full bg-card p-4 rounded-md border border-border flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='User' width={18} height={18} className='text-primary'/>
                            <Typography variant="large" className='font-medium'>Customer Details</Typography>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Name:</Typography>
                                <Typography variant="p" className='font-medium'>Some Name</Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Phone 1:</Typography>
                                <Typography variant="p" className='font-medium'>9988776655</Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Phone 2:</Typography>
                                <Typography variant="p" className='font-medium'>9988776655</Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="p">Total Person:</Typography>
                                <Typography variant="p" className='font-medium'>4 person(s)</Typography>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full bg-card p-4 rounded-md border border-border flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                        <Icon name='Calculator' width={18} height={18} className='text-primary'/>
                        <Typography variant="large" className='font-medium'>Price Breakdown</Typography>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between p-1'>
                            <div className='flex items-center gap-4'>
                                <div className='h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary'>
                                    <Icon name='User' width={14} height={14} />
                                </div>
                                <Typography variant="p">Some Name <span className='ml-1 text-muted-foreground'>(21 years old)</span></Typography>

                            </div>
                            <Typography variant="p" className='font-medium'>₹ 4000</Typography>
                        </div>
                        <div className='flex items-center justify-between p-1'>
                            <div className='flex items-center gap-4'>
                                <div className='h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary'>
                                    <Icon name='User' width={14} height={14} />
                                </div>
                                <Typography variant="p">Some Name <span className='ml-1 text-muted-foreground'>(20 years old)</span></Typography>

                            </div>
                            <Typography variant="p" className='font-medium'>₹ 4000</Typography>
                        </div>
                    </div>
                    <Separator />
                    <div className='flex flex-col gap-2'>
                        <div className='w-full flex items-center justify-between p-1'>
                            <Typography variant="h4">Total Amount</Typography>
                            <Typography variant="h4" className='font-semibold'>₹ 8000</Typography>
                        </div>
                        <div className='w-full flex items-center justify-between p-1'>
                            <Typography variant="p" className='text-primary font-semibold'>Payment amount (50%)</Typography>
                            <Typography variant="p" className='text-primary font-semibold'>₹ 4000</Typography>
                        </div>
                        <div className='w-full flex items-center justify-between p-1'>
                            <Typography variant="p" className='text-accent font-semibold'>Due Amount (Remaining 50%)</Typography>
                            <Typography variant="p" className='text-accent font-semibold'>₹ 4000</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <PaymentSubmit />
            <PaymentTerms />
        </div>
    )
}

export default ReceiptPayment
