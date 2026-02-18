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
                <Typography variant="lead">Temporary Payment Record</Typography>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-3 gap-8 items-start'>
                    {/* QR Code Column - 1/3 width */}
                    <div className='flex justify-center pt-2'>
                        <div className='p-3 bg-white rounded-lg border border-muted'>
                            <QRCode
                                value={temporaryPaymentRecord.upiUrl}
                                size={160}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                            />
                        </div>
                    </div>

                    <div className='col-span-2 flex flex-col gap-6'>
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
