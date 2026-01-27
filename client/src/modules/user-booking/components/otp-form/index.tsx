"use client"
import React from 'react'
import { useVerifyOtp } from '@modules/user-booking/api/mutation';
import { useRequestOtpStore } from '@/store';
import { VerifyOtpPayload } from '@modules/user-booking/api/types';

import ResendOtp from '../resend-otp';
import Icon from '@/components/icons';
import { InputOtp } from '@/components/form';
import { Button } from '@ui/button';
import { Typography } from '@ui/typography';
import { RequestCardHeader } from '../static-components';


const OtpForm: React.FC = () => {
    const {
        setStep,
        sessionId
    } = useRequestOtpStore((state) => state);
    const [otp, setOtp] = React.useState('');

    const { mutate, isPending } = useVerifyOtp()

    const onSubmit = () => {
        const payload: VerifyOtpPayload = {
            sessionId,
            otp
        }

        mutate(payload, {
            onSuccess: (response) => {
                if (response.data) {
                    setStep('verified');
                }
            }
        })
    }


    return (
        <div className='animate-in fade-in slide-in-from-top-2 duration-300'>
            <div className='space-y-4'>
                <RequestCardHeader stepNumber={3} title='Verify Otp'  />

                <div className='bg-card border border-border rounded-xl p-4 md:p-6 space-y-4'>
                    <div className='space-y-2'>
                        <Typography variant="small" className='text-muted-foreground'>
                            Enter the 6-digit OTP sent to your WhatsApp number
                        </Typography>
                        
                        <div className='flex gap-2'>
                            <InputOtp onChange={(value) => setOtp(value)} />
                        </div>
                    </div>

                    <ResendOtp
                        isPending={isPending}
                        handleOtp={setOtp}
                    />

                    <Button
                        className='w-full'
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Icon name='Loader2' className='w-4 h-4 animate-spin' />
                                Verifying...
                            </>
                        ) : (
                            <>
                                Verify OTP
                                <Icon name='CheckCircle' className='w-4 h-4' />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OtpForm