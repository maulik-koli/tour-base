"use client"
import React from 'react'
import QRCode from 'react-qr-code'

import Icon from '@/components/icons'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'

interface QrcodeComponentProps {
    upiUrl: string
    displayAmount: number
    handleBack: () => void
}


const QrcodeComponent: React.FC<QrcodeComponentProps> = ({ upiUrl, displayAmount, handleBack }) => {
    return (
        <div className='w-full p-4 md:p-6 bg-card flex flex-col items-center gap-4 border border-border rounded-lg'>

            <div className='flex flex-col items-center gap-1 text-center'>
                <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                    <Icon name='CreditCard' className='w-5 h-5 text-green-600'/>
                </div>
                <Typography variant="h4" className='font-semibold'>Scan QR Code to Pay</Typography>
                <Typography variant="small" className='text-muted-foreground max-w-sm'>
                    Use any UPI app to scan and complete payment
                </Typography>
            </div>

            <div className='p-4 bg-white rounded-lg shadow-sm border border-border'>
                <QRCode 
                    value={upiUrl}
                    size={200}
                    level="H"
                    className='w-full h-auto'
                />
            </div>

            <div className='w-full max-w-sm space-y-3'>
                <div className='flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20'>
                    <Typography variant="small" className='font-medium text-muted-foreground'>Amount to Pay</Typography>
                    <Typography variant="h4" className='font-bold text-primary text-sm'>
                        ₹ {displayAmount.toLocaleString('en-IN')}
                    </Typography>
                </div>

                <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2'>
                    <div className='flex items-start gap-2'>
                        <Icon name='Info' className='w-4 h-4 text-blue-600 mt-0.5 shrink-0'/>
                        <div className='space-y-1'>
                            <Typography variant="small" className='font-semibold text-blue-900'>
                                How to pay:
                            </Typography>
                            <ul className='text-xs text-blue-800 space-y-0.5 list-disc list-inside'>
                                <li>Open any UPI app on your phone</li>
                                <li>Scan the QR code above</li>
                                <li>After successful payment, you will receive confirmation via WhatsApp</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Button 
                variant='outline'
                size='sm' 
                type='button'
                onClick={handleBack}
                className='w-full max-w-sm mt-1'
            >
                <Icon name='ArrowLeft' className='w-3 h-3 mr-2'/>
                Back to Payment Options
            </Button>
        </div>
    )
}

export default QrcodeComponent
