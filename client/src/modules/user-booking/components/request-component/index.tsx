'use client'
import React from 'react'
import { useRequestOtpStore } from '@/store';

import PageHeader from '@/components/page-header';
import ResponseBlock from '../response-block';
import RequestForm from '../request-form';
import OtpForm from '../otp-form';
import { HelpSection } from '../static-components';


const RequestComponent: React.FC = () => {
    const step = useRequestOtpStore(state => state.step);

    return (
        <div className='min-h-screen bg-background'>
            <PageHeader 
                title="Your Booking"
                subtitle="Retrieve your booking details or request a cancellation using the phone number you used during booking"
                align="center"
            />
            
            <div className='py-8 md:py-12 px-4 sm:px-6 lg:px-20'>
                <div className='max-w-2xl mx-auto'>
                    {/* Success State */}
                    {step === 'verified' && <ResponseBlock />}

                    {/* Main Flow */}
                    {step !== 'verified' && (
                        <div className='space-y-6'>
                            {/* Step 1: Request Type Selection */}
                            <RequestForm />

                            {/* Step 4: OTP Verification */}
                            {step === 'otp-sent' && <OtpForm />}
                        </div>
                    )}
                </div>

                <HelpSection />
            </div>
        </div>
    )
}

export default RequestComponent