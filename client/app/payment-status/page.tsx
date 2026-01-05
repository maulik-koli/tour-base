"use client"
import React, { Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import { useBookingData } from '@modules/booking/api/queries';
import { GetBookingDataViewResponse } from '@modules/booking/api/types';

import Icon from '@/components/icons';
import ErrorBlock from '@/components/error-block';
import { CustomSpinner } from '@/components/ui/spinner';
import { Typography } from '@ui/typography';
import { Button } from '@ui/button';


const PaymentStatusPage: React.FC = () => {
    return (
        <Suspense fallback={<CustomSpinner />}>
            <PaymentStatusComponent />
        </Suspense>
    )
}

export default PaymentStatusPage



const PaymentStatusComponent = function() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const bookingId = searchParams.get("bookingId") || "";

    const { data, error, isLoading } = useBookingData({
        bookingId,
        view: true
    }, {
        refetchInterval: (query) => {
            const status = (query.state.data?.data as GetBookingDataViewResponse | undefined)?.bookingStatus;
            if (status === "DRAFT" || status === "DETAILS_FILLED") {
                return 3000;
            }
            return false;
        },
    })

    const paymentData = data?.data as GetBookingDataViewResponse | undefined;

    useEffect(() => {
        if (paymentData?.bookingStatus === "PAID_FULL" || 
            paymentData?.bookingStatus === "PAID_PARTIAL" || 
            paymentData?.bookingStatus === "FAILED") {
            const redirectTimer = setTimeout(() => {
                router.push('/');
            }, 5000);

            return () => clearTimeout(redirectTimer);
        }
    }, [paymentData?.bookingStatus, router]);

    if (isLoading) {
        return (
            <div className='min-h-[70vh] flex items-center justify-center'>
                <div className='flex flex-col items-center gap-6 max-w-md text-center px-4'>
                    <CustomSpinner className='h-24' />
                    <div className='space-y-3'>
                        <Typography variant="h3">
                            Confirming Your Payment
                        </Typography>
                        <Typography variant="p" className='text-muted-foreground'>
                            We're confirming your payment. This usually takes a few seconds. Please don't refresh or close the page.
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='min-h-[70vh] flex items-center justify-center'>
                <ErrorBlock
                    type='error'
                    message='Unable to Load Payment Status'
                    description={error.message || 'Something went wrong while fetching payment details.'}
                />
            </div>
        )
    }

    if (paymentData?.bookingStatus === "PAID_FULL" || paymentData?.bookingStatus === "PAID_PARTIAL") {
        return (
            <div className='min-h-[70vh] flex items-center justify-center py-12'>
                <div className='max-w-2xl w-full mx-auto px-4'>
                    <div className='bg-card border border-border rounded-xl p-8 md:p-12 space-y-8'>
                        <div className='flex justify-center'>
                            <div className='w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center'>
                                <Icon name='CheckCircle' className='w-12 h-12 text-primary' />
                            </div>
                        </div>

                        <div className='text-center space-y-3'>
                            <Typography variant="h2" className='text-primary'>
                                Payment Successful!
                            </Typography>
                            <Typography variant="p" className='text-muted-foreground'>
                                {paymentData.bookingStatus === "PAID_FULL" 
                                    ? "Your payment has been processed successfully. Your booking is confirmed!"
                                    : "Your partial payment has been received. Please complete the remaining payment before your tour date."
                                }
                            </Typography>
                        </div>

                        <div className='bg-muted/50 rounded-lg p-6 space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="muted">Booking ID</Typography>
                                <Typography variant="p" className='font-mono font-semibold'>
                                    {paymentData.bookingId}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="muted">Payment Status</Typography>
                                <span className='px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
                                    {paymentData.bookingStatus === "PAID_FULL" ? "Fully Paid" : "Partially Paid"}
                                </span>
                            </div>
                        </div>

                        <div className='bg-accent/10 border border-accent rounded-lg p-4 flex items-start gap-3'>
                            <Icon name='whatspp' width={20} height={20} fill='#64B161' className='mt-1 shrink-0'/>
                            <Typography variant="small" className='text-accent-foreground'>
                                Booking confirmation and tour details have been sent to your WhatsApp number.
                            </Typography>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                            <Button 
                                className='flex-1'
                                onClick={() => router.push('/tours')}
                            >
                                Browse More Tours
                            </Button>
                            <Button 
                                variant="outline"
                                className='flex-1'
                                onClick={() => router.push('/')}
                            >
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (paymentData?.bookingStatus === "FAILED") {
        return (
            <div className='min-h-[70vh] flex items-center justify-center py-12'>
                <div className='max-w-2xl w-full mx-auto px-4'>
                    <div className='bg-card border border-destructive/20 rounded-xl p-8 md:p-12 space-y-8'>
                        <div className='flex justify-center'>
                            <div className='w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center'>
                                <Icon name='CircleX' className='w-12 h-12 text-destructive' />
                            </div>
                        </div>

                        <div className='text-center space-y-3'>
                            <Typography variant="h2" className='text-destructive'>
                                Payment Failed
                            </Typography>
                            <Typography variant="p" className='text-muted-foreground'>
                                We couldn't process your payment. Don't worry, no amount has been deducted from your account.
                            </Typography>
                        </div>

                        <div className='bg-muted/50 rounded-lg p-6 space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Typography variant="muted">Booking ID</Typography>
                                <Typography variant="p" className='font-mono font-semibold'>
                                    {paymentData.bookingId}
                                </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                                <Typography variant="muted">Payment Status</Typography>
                                <span className='px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium'>
                                    Failed
                                </span>
                            </div>
                        </div>

                        <div className='bg-muted/50 border border-border rounded-lg p-4 space-y-2'>
                            <Typography variant="large" className='text-foreground'>
                                What can you do?
                            </Typography>
                            <ul className='space-y-2 ml-4 list-disc'>
                                <li>
                                    <Typography variant="small" className='text-muted-foreground'>
                                        Retry the payment using a different method
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="small" className='text-muted-foreground'>
                                        Ensure you have sufficient balance in your account
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="small" className='text-muted-foreground'>
                                        If money was deducted and message has not been received, please wait for 5-10 minutes as it may take time to reflect. If still not received, contact support.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="small" className='text-muted-foreground'>
                                        Contact support if the issue persists
                                    </Typography>
                                </li>
                            </ul>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                            <Button 
                                className='flex-1'
                                onClick={() => router.push(`/book-package/${paymentData.bookingId}`)}
                            >
                                <Icon name='ArrowLeft' className='mr-2 h-4 w-4' />
                                Retry Payment
                            </Button>
                            <Button 
                                variant="outline"
                                className='flex-1'
                                onClick={() => router.push('/contact-us')}
                            >
                                <Icon name='MessageCircle' className='mr-2 h-4 w-4' />
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-[70vh] flex items-center justify-center'>
            <ErrorBlock
                type='no-data'
                message='Invalid Payment Status'
                description='This booking is not in a valid payment state. Please try again or contact support.'
                redirectUrl='/tours'
            />
        </div>
    )
}