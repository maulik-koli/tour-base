import React from 'react'
import QRCode from 'react-qr-code'
import { Card, CardContent, CardHeader } from '@ui/card'
import { Typography } from '@ui/typography'
import { InfoRow } from '../common'
import { formatDate } from '@/lib/utils'

interface BookingTemporaryPaymentInfoProps {
    temporaryPaymentRecord: {
        paymentOption: "FULL" | "PARTIAL",
        generatedAt: string,
        upiUrl: string
    }
}


const BookingTemporaryPaymentInfo: React.FC<BookingTemporaryPaymentInfoProps> = ({ 
    temporaryPaymentRecord 
}) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <Typography variant="lead" className='text-base md:text-lg'>Temporary Payment Record</Typography>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start'>
                    <div className='flex justify-center md:justify-start pt-2'>
                        <div className='p-2.5 md:p-3 bg-white rounded-lg border border-muted'>
                            <QRCode
                                value={temporaryPaymentRecord.upiUrl}
                                size={140}
                                className='md:w-40 md:h-40 w-35 h-35'
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                            />
                        </div>
                    </div>

                    <div className='md:col-span-2 flex flex-col gap-4 md:gap-5 lg:gap-6'>
                        <InfoRow 
                            label="Payment Option" 
                            value={temporaryPaymentRecord.paymentOption} 
                        />
                        <InfoRow 
                            label="Generated At" 
                            value={formatDate(temporaryPaymentRecord.generatedAt, true)} 
                        />
                        <div className='flex flex-col gap-1'>
                            <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                                UPI URL
                            </Typography>
                            <Typography variant="p" className='font-medium break-all text-sm'>
                                {temporaryPaymentRecord.upiUrl}
                            </Typography>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookingTemporaryPaymentInfo
