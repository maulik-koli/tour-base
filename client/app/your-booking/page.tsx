"use client";
import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Icon from '@/components/icons'
import { Button } from '@ui/button'
import { Typography } from '@ui/typography'
import InputField from '@/components/form/input-field'
import DatePicker from '@/components/form/date-picker'

type RequestType = 'get-details' | 'cancel-booking' | null;
type Step = 'selection' | 'otp-sent' | 'verified';

interface FormData {
    phoneNumber: string;
    travelDate: string;
}

const YourBookingPage: React.FC = () => {
    const [requestType, setRequestType] = useState<RequestType>(null);
    const [step, setStep] = useState<Step>('selection');
    const [formData, setFormData] = useState<FormData>({
        phoneNumber: '',
        travelDate: ''
    });
    const [otp, setOtp] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const isFormValid = formData.phoneNumber.length >= 10 && formData.travelDate;
    const isOtpValid = otp.length === 6;

    const handleSendOtp = useCallback(async () => {
        if (!isFormValid) return;
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep('otp-sent');
        setResendTimer(30);
        
        // Start countdown
        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [isFormValid]);

    const handleVerifyOtp = useCallback(async () => {
        if (!isOtpValid) return;
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep('verified');
    }, [isOtpValid]);

    const handleResendOtp = useCallback(async () => {
        if (resendTimer > 0) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setResendTimer(30);
        
        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [resendTimer]);

    const handleReset = useCallback(() => {
        setRequestType(null);
        setStep('selection');
        setFormData({ phoneNumber: '', travelDate: '' });
        setOtp('');
    }, []);

    return (
        <div className='min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-20'>
            <div className='max-w-2xl mx-auto'>
                <div className='mb-8 md:mb-10 text-center'>
                    <Typography variant="h1" className='mb-3'>
                        Your Booking
                    </Typography>
                    <Typography variant="muted" className='text-base max-w-xl mx-auto'>
                        Retrieve your booking details or request a cancellation using the phone number you used during booking.
                    </Typography>
                </div>

                {/* Success State */}
                {step === 'verified' && (
                    <div className='bg-card border border-border rounded-xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300'>
                        <div className='flex justify-center'>
                            <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
                                <Icon name='CheckCircle' className='w-10 h-10 text-primary' />
                            </div>
                        </div>
                        
                        <div className='text-center space-y-2'>
                            <Typography variant="h3" className='text-primary'>
                                {requestType === 'get-details' 
                                    ? 'Request Submitted Successfully!' 
                                    : 'Cancellation Request Submitted!'
                                }
                            </Typography>
                            <Typography variant="p" className='text-muted-foreground'>
                                {requestType === 'get-details'
                                    ? 'Your booking details will be sent to your WhatsApp number shortly.'
                                    : 'Our team will review your cancellation request and get back to you within 24 hours.'
                                }
                            </Typography>
                        </div>

                        <div className='bg-accent/10 border border-accent rounded-lg p-4 flex items-start gap-3'>
                            <Icon name='whatspp' className='w-5 h-5 mt-0.5 shrink-0' fill='#64B161'/>
                            <Typography variant="small" className='text-accent-foreground'>
                                {requestType === 'get-details'
                                    ? 'Check your WhatsApp for booking confirmation and tour details.'
                                    : 'You will receive updates about your cancellation request on WhatsApp or we will contact you directly.'
                                }
                            </Typography>
                        </div>

                        <Button 
                            variant="outline" 
                            className='w-full'
                            onClick={handleReset}
                        >
                            <Icon name='ArrowLeft' className='w-4 h-4' />
                            Back to Start
                        </Button>
                    </div>
                )}

                {/* Main Flow */}
                {step !== 'verified' && (
                    <div className='space-y-6'>
                        {/* Step 1: Request Type Selection */}
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
                                {/* Card 1: Get Booking Details */}
                                <button
                                    type="button"
                                    onClick={() => setRequestType('get-details')}
                                    className={cn(
                                        'w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200',
                                        'hover:shadow-md hover:border-primary/50',
                                        'focus:outline-none focus:ring-2 focus:ring-primary/20',
                                        requestType === 'get-details' 
                                            ? 'border-primary bg-primary/5 shadow-md' 
                                            : 'border-border bg-card'
                                    )}
                                >
                                    <div className='flex items-start gap-4'>
                                        <div className={cn(
                                            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                                            requestType === 'get-details' 
                                                ? 'border-primary' 
                                                : 'border-muted-foreground/40'
                                        )}>
                                            {requestType === 'get-details' && (
                                                <div className='w-2.5 h-2.5 rounded-full bg-primary' />
                                            )}
                                        </div>
                                        <div className='flex-1 space-y-1'>
                                            <div className='flex items-center gap-2'>
                                                <Icon name='FileText' className='w-5 h-5 text-primary' />
                                                <Typography variant="h4" className='text-base md:text-lg'>
                                                    Get your booking details
                                                </Typography>
                                            </div>
                                            <Typography variant="muted" className='text-sm'>
                                                Receive your tour booking details on WhatsApp if your booking is confirmed.
                                            </Typography>
                                        </div>
                                    </div>
                                </button>

                                {/* Card 2: Cancel Booking */}
                                <button
                                    type="button"
                                    onClick={() => setRequestType('cancel-booking')}
                                    className={cn(
                                        'w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200',
                                        'hover:shadow-md hover:border-primary/50',
                                        'focus:outline-none focus:ring-2 focus:ring-primary/20',
                                        requestType === 'cancel-booking' 
                                            ? 'border-primary bg-primary/5 shadow-md' 
                                            : 'border-border bg-card'
                                    )}
                                >
                                    <div className='flex items-start gap-4'>
                                        <div className={cn(
                                            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                                            requestType === 'cancel-booking' 
                                                ? 'border-primary' 
                                                : 'border-muted-foreground/40'
                                        )}>
                                            {requestType === 'cancel-booking' && (
                                                <div className='w-2.5 h-2.5 rounded-full bg-primary' />
                                            )}
                                        </div>
                                        <div className='flex-1 space-y-1'>
                                            <div className='flex items-center gap-2'>
                                                <Icon name='CircleX' className='w-5 h-5 text-destructive' />
                                                <Typography variant="h4" className='text-base md:text-lg'>
                                                    Cancel your booking
                                                </Typography>
                                            </div>
                                            <Typography variant="muted" className='text-sm'>
                                                Request cancellation of your tour booking and get assistance from our team.
                                            </Typography>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Contextual Description */}
                        {requestType && (
                            <div className='animate-in fade-in slide-in-from-top-2 duration-300'>
                                <div className={cn(
                                    'rounded-xl p-4 md:p-5 space-y-3',
                                    requestType === 'get-details' 
                                        ? 'bg-secondary/50 border border-secondary' 
                                        : 'bg-muted/50 border border-border'
                                )}>
                                    <div className='flex items-center gap-2'>
                                        <Icon name='Info' className='w-4 h-4 text-primary shrink-0' />
                                        <Typography variant="small" className='font-medium text-foreground'>
                                            How it works
                                        </Typography>
                                    </div>
                                    
                                    {requestType === 'get-details' ? (
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

                        {/* Step 3: Input Form */}
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

                                    <div className='bg-card border border-border rounded-xl p-4 md:p-6 space-y-4'>
                                        <InputField
                                            label='WhatsApp Number'
                                            type='tel'
                                            placeholder='Enter your WhatsApp number'
                                            value={formData.phoneNumber}
                                            onChange={(value) => setFormData(prev => ({ ...prev, phoneNumber: value }))}
                                            leftIcon='Phone'
                                            disabled={step === 'otp-sent'}
                                        />

                                        <DatePicker
                                            label='Travel date used during booking'
                                            value={formData.travelDate}
                                            onChange={(date) => setFormData(prev => ({ ...prev, travelDate: date }))}
                                        />

                                        {step === 'selection' && (
                                            <Button 
                                                className='w-full'
                                                disabled={!isFormValid || isLoading}
                                                onClick={handleSendOtp}
                                            >
                                                {isLoading ? (
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
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: OTP Verification */}
                        {step === 'otp-sent' && (
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
                                                {Array.from({ length: 6 }).map((_, index) => (
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
                                                ))}
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between'>
                                            <button
                                                type='button'
                                                onClick={handleResendOtp}
                                                disabled={resendTimer > 0 || isLoading}
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
                                                    setStep('selection');
                                                    setOtp('');
                                                }}
                                                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                            >
                                                Change number
                                            </button>
                                        </div>

                                        <Button 
                                            className='w-full'
                                            disabled={!isOtpValid || isLoading}
                                            onClick={handleVerifyOtp}
                                        >
                                            {isLoading ? (
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
                        )}
                    </div>
                )}

                <HelpSection />
            </div>
        </div>
    )
}

export default YourBookingPage



const HelpSection: React.FC = function() {
    return (
        <div className='mt-10 pt-8 border-t border-border'>
            <div className='text-center space-y-3'>
                <Typography variant="muted">
                    Need help? Contact our support team
                </Typography>
                <div className='flex items-center justify-center gap-4'>
                    <a 
                        href="tel:+918000057070" 
                        className='flex items-center gap-2 text-sm text-primary hover:underline'
                    >
                        <Icon name='Phone' className='w-4 h-4' />
                        +91 8000057070
                    </a>
                    <span className='text-border'>|</span>
                    <a 
                        href="https://wa.me/918000057070" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-2 text-sm text-primary hover:underline'
                    >
                        <Icon name='whatspp' className='w-4 h-4' fill='currentColor' />
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    )
} 