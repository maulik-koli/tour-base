import React from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useRequestOtpStore } from '@/store'
import { useGenerateOtp } from '@modules/user-booking/api/mutation'
import { UserRequestType } from '@modules/user-booking/api/types'
import { GenerateOtpFormType } from '@modules/user-booking/utils/schema'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import { DatePicker, InputField } from '@/components/form'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'


const RequestForm: React.FC = () => {
    const { 
        requestType, 
        setStep,
        setRequestType,
        setSessionId
    } = useRequestOtpStore((state) => state);
    

    const { control, handleSubmit } = useForm<GenerateOtpFormType>();

    const { mutate, isPending } = useGenerateOtp();

    const handleRequestType = (type: UserRequestType) => {
        setRequestType(type);
    }
    
    const onSubmit = (data: GenerateOtpFormType) => {
        mutate(data, {
            onSuccess: (response) => {
                if (response.data) {
                    setSessionId(response.data.sessionId);
                    setStep('otp-sent');
                }
            }
        });
    }


    return (
        <>
            <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium'>
                        1
                    </div>
                    <Typography variant="large">
                        What would you like to do?
                    </Typography>
                </div>

                <div className='grid gap-4'>
                    <RequestTypeButton
                        requestType={requestType}
                        handleRequestType={handleRequestType}
                        buttonType="GET_DETAILS"
                    />

                    <RequestTypeButton
                        requestType={requestType}
                        handleRequestType={handleRequestType}
                        buttonType="CANCEL_BOOKING"
                    />
                </div>
            </div>

            {requestType && (
                <div className='animate-in fade-in slide-in-from-top-2 duration-300'>
                    <div className={cn(
                        'rounded-xl p-4 md:p-5 space-y-3',
                        requestType === 'GET_DETAILS' 
                            ? 'bg-secondary/50 border border-secondary' 
                            : 'bg-muted/50 border border-border'
                    )}>
                        <div className='flex items-center gap-2'>
                            <Icon name='Info' className='w-4 h-4 text-primary shrink-0' />
                            <Typography variant="small" className='font-medium text-foreground'>
                                How it works
                            </Typography>
                        </div>
                        
                        {requestType === 'GET_DETAILS' ? (
                            <ul className='space-y-2 text-sm text-muted-foreground'>
                                <li className='flex items-start gap-2'>
                                    <span className='text-primary mt-0.5'>•</span>
                                    Enter the same phone number and travel date that you used while booking.
                                </li>
                                <li className='flex items-start gap-2'>
                                    <span className='text-primary mt-0.5'>•</span>
                                    We will send an OTP to your WhatsApp number for verification.
                                </li>
                                <li className='flex items-start gap-2'>
                                    <span className='text-primary mt-0.5'>•</span>
                                    Once verified, your booking details will be sent to your WhatsApp.
                                </li>
                            </ul>
                        ) : (
                            <>
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-primary mt-0.5'>•</span>
                                        Enter the same phone number and travel date used during booking.
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-primary mt-0.5'>•</span>
                                        We will verify your identity via OTP sent to WhatsApp.
                                    </li>
                                    <li className='flex items-start gap-2'>
                                        <span className='text-primary mt-0.5'>•</span>
                                        After verification, your cancellation request will be submitted to our team.
                                    </li>
                                </ul>
                                <Link 
                                    href="/refund-policy" 
                                    className='inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2'
                                >
                                    Please read our refund policy
                                    <Icon name='ExternalLink' className='w-3 h-3' />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {requestType && (
                <div className='animate-in fade-in slide-in-from-top-2 duration-300 delay-100'>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <div className='w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium'>
                                2
                            </div>
                            <Typography variant="large">
                                Enter your details
                            </Typography>
                        </div>

                        <form className='bg-card border border-border rounded-xl p-4 md:p-6 space-y-4'>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, formState }) => (
                                    <InputField
                                        label='WhatsApp Number'
                                        type='tel'
                                        placeholder='Enter your WhatsApp number'
                                        value={field.value}
                                        onChange={field.onChange}
                                        leftIcon='Phone'
                                        errMsg={formState.errors.phone?.message}
                                        // disabled={step === 'otp-sent'}
                                    />
                                )}
                            />

                            <Controller
                                name='travelDate'
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        label='Travel date used during booking'
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />

                            {/* {step === 'selection' && ( */}
                            <Button
                                className='w-full'
                                type='button'
                                disabled={isPending}
                                onClick={() => handleSubmit(onSubmit)}
                            >
                                {isPending ? (
                                    <>
                                        <Icon name='Loader2' className='w-4 h-4 animate-spin' />
                                        Sending OTP...
                                    </>
                                ) : (
                                    <>
                                        Send OTP
                                        <Icon name='ArrowRight' className='w-4 h-4' />
                                    </>
                                )}
                            </Button>
                            {/* )} */}
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default RequestForm



interface RequestTypeButtonProps {
    requestType: UserRequestType | null
    buttonType: UserRequestType
}

const RequestTypeButton: React.FC<RequestTypeButtonProps> = function({ buttonType }) {
    const isDetailsRequest = buttonType === 'GET_DETAILS';
    const { 
        requestType, 
        setStep,
        setRequestType,
        setSessionId
    } = useRequestOtpStore((state) => state);

    return (
        <button
            type="button"
            onClick={() => handleRequestType(buttonType)}
            className={cn(
                'w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200',
                'hover:shadow-md hover:border-primary/50',
                'focus:outline-none focus:ring-2 focus:ring-primary/20',
                requestType === buttonType
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border bg-card'
            )}
        >
            <div className='flex items-start gap-4'>
                <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                    requestType === buttonType
                        ? 'border-primary' 
                        : 'border-muted-foreground/40'
                )}>
                    {requestType === buttonType && (
                        <div className='w-2.5 h-2.5 rounded-full bg-primary' />
                    )}
                </div>
                <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                        <Icon 
                            name={isDetailsRequest ? 'FileText' : 'CircleX'}
                            className={cn('w-5 h-5', isDetailsRequest ? 'text-primary' : 'text-destructive')}
                        />
                        <Typography variant="h4" className='text-base md:text-lg'>
                            {isDetailsRequest ? 'Get your booking details' : 'Cancel your booking'}
                        </Typography>
                    </div>
                    <Typography variant="muted" className='text-sm'>
                        {isDetailsRequest 
                            ? 'Receive your tour booking details on WhatsApp if your booking is confirmed.'
                            : 'Request cancellation of your tour booking and get assistance from our team.'
                        }
                    </Typography>
                </div>
            </div>
        </button>
    )
}