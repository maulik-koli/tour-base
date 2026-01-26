import React from 'react'
import { useRequestOtpStore } from '@/store'

import Icon from '@/components/icons'
import { Button } from '@ui/button'
import { Typography } from '@ui/typography'


const ResponseBlock: React.FC = () => {
    const { 
        requestType, 
        setStep, 
    } = useRequestOtpStore((state) => state);

    if (!requestType) return null;

    
    return (
        <div className='bg-card border border-border rounded-xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300'>
            <div className='flex justify-center'>
                <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
                    <Icon name='CheckCircle' className='w-10 h-10 text-primary' />
                </div>
            </div>
            
            <div className='text-center space-y-2'>
                <Typography variant="h3" className='text-primary'>
                    {requestType === 'GET_DETAILS' 
                        ? 'Request Submitted Successfully!' 
                        : 'Cancellation Request Submitted!'
                    }
                </Typography>
                <Typography variant="p" className='text-muted-foreground'>
                    {requestType === 'GET_DETAILS'
                        ? 'Your booking details will be sent to your WhatsApp number shortly.'
                        : 'Our team will review your cancellation request and get back to you within 24 hours.'
                    }
                </Typography>
            </div>

            <div className='bg-accent/10 border border-accent rounded-lg p-4 flex items-start gap-3'>
                <Icon name='whatspp' className='w-5 h-5 mt-0.5 shrink-0' fill='#64B161'/>
                <Typography variant="small" className='text-accent-foreground'>
                    {requestType === 'GET_DETAILS'
                        ? 'Check your WhatsApp for booking confirmation and tour details.'
                        : 'You will receive updates about your cancellation request on WhatsApp or we will contact you directly.'
                    }
                </Typography>
            </div>

            <Button
                variant="outline" 
                className='w-full'
                type='button'
                onClick={() => setStep('selection')}
            >
                <Icon name='ArrowLeft' className='w-4 h-4' />
                Back to Start
            </Button>
        </div>
    )
}

export default ResponseBlock
