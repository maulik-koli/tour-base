import React from 'react'
import { cn } from '@/lib/utils';

import InputOtp from '@/components/form/input-otp';
import Icon from '@/components/icons';
import { Button } from '@ui/button';
import { Typography } from '@ui/typography';


const OtpForm: React.FC = () => {

    const onSubmit = () => {
        console.log('submit');
    }

    const onReset = () => {
        console.log('reset');
    }


    return (
        <div className='animate-in fade-in slide-in-from-top-2 duration-300'>
            <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium'>
                        3
                    </div>
                    <Typography variant="large">
                        Verify OTP
                    </Typography>
                </div>

                <div className='bg-card border border-border rounded-xl p-4 md:p-6 space-y-4'>
                    <div className='space-y-2'>
                        <Typography variant="small" className='text-muted-foreground'>
                            Enter the 6-digit OTP sent to your WhatsApp number
                        </Typography>
                        
                        <div className='flex gap-2'>
                            <InputOtp
                                onChange={(value) => console.log(value)}
                            />
                            {/* {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    type='text'
                                    maxLength={1}
                                    value={otp[index] || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!/^\d*$/.test(value)) return;
                                        
                                        const newOtp = otp.split('');
                                        newOtp[index] = value;
                                        setOtp(newOtp.join(''));
                                        
                                        // Auto-focus next input
                                        if (value && index < 5) {
                                            const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                                            nextInput?.focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        // Handle backspace
                                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                                            const prevInput = e.currentTarget.parentElement?.children[index - 1] as HTMLInputElement;
                                            prevInput?.focus();
                                        }
                                    }}
                                    className={cn(
                                        'w-10 h-12 md:w-12 md:h-14 text-center text-lg font-semibold rounded-lg border-2 bg-card transition-colors',
                                        'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                                        otp[index] ? 'border-primary' : 'border-border'
                                    )}
                                />
                            ))} */}
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <button
                            type='button'
                            onClick={onReset}
                            // disabled={resendTimer > 0 || isLoading}
                            className={cn(
                                'text-sm transition-colors',
                                resendTimer > 0 
                                    ? 'text-muted-foreground cursor-not-allowed' 
                                    : 'text-primary hover:underline'
                            )}
                        >
                            {resendTimer > 0 
                                ? `Resend OTP in ${resendTimer}s` 
                                : 'Resend OTP'
                            }
                        </button>
                        
                        <button
                            type='button'
                            onClick={() => {
                                // setStep('selection');
                                // setOtp('');
                            }}
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Change number
                        </button>
                    </div>

                    <Button
                        className='w-full'
                        onClick={onSubmit}
                        // disabled={!isOtpValid || isLoading}
                    >
                        {/* TODO: to add pending, of mutation */}
                        {false ? (
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