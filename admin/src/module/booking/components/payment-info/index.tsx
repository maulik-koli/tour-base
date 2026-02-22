import React from 'react'
import { PaymentBookingInfo } from '@module/booking/api/types'
import { getOrderStatusStyles } from '@module/booking/utils/getStatusStyle'

import { Card, CardContent, CardHeader } from '@ui/card'
import { Typography } from '@ui/typography'
import { InfoRow } from '../common'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

interface BookingPaymentInfoProps {
    paymentDetails: PaymentBookingInfo
    totalAmount?: number
}


const BookingPaymentInfo: React.FC<BookingPaymentInfoProps> = ({ paymentDetails, totalAmount }) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full'>
                    <Typography variant="lead" className='text-base md:text-lg'>Payment Details</Typography>
                    <span className={cn(
                        "px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium w-fit",
                        getOrderStatusStyles(paymentDetails.order_status)
                    )}>
                        {paymentDetails.order_status}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6'>
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Total Amount
                        </Typography>
                        <Typography variant="h4" className='text-primary text-lg md:text-xl lg:text-2xl'>
                            {totalAmount ? formatCurrency(totalAmount) : "-"}
                        </Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Order Amount
                        </Typography>
                        <Typography variant="h4" className='text-lg md:text-xl lg:text-2xl'>
                            {formatCurrency(paymentDetails.order_amount)}
                        </Typography>
                    </div>
                    <InfoRow
                        label="Payment Option" 
                        value={paymentDetails.paymentOption} 
                    />
                    <InfoRow 
                        label="Order ID" 
                        value={paymentDetails.cf_order_id} 
                    />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-5 lg:mt-6'>
                    <InfoRow 
                        label="Order Created At" 
                        value={formatDate(paymentDetails.order_created_at, true)} 
                    />
                    <InfoRow 
                        label="Session ID" 
                        value={paymentDetails.payment_session_id} 
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default BookingPaymentInfo
