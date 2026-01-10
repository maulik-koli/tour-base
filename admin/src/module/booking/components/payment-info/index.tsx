import React from 'react'
import { PaymentBookingInfo } from '@module/booking/api/types'
import { getOrderStatusStyles } from '@module/booking/utils/getStatusStyle'

import { Card, CardContent, CardHeader } from '@ui/card'
import { Typography } from '@ui/typography'
import { InfoRow } from '../common'

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount);
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

interface BookingPaymentInfoProps {
    paymentDetails: PaymentBookingInfo
    totalAmount?: number
}


const BookingPaymentInfo: React.FC<BookingPaymentInfoProps> = ({ paymentDetails, totalAmount }) => {
    return (
        <Card className='w-full'>
            <CardHeader>
                <div className='flex items-center justify-between w-full'>
                    <Typography variant="lead">Payment Details</Typography>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getOrderStatusStyles(paymentDetails.order_status)}`}>
                        {paymentDetails.order_status}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Total Amount
                        </Typography>
                        <Typography variant="h4" className='text-primary'>
                            {totalAmount ? formatCurrency(totalAmount) : "-"}
                        </Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
                            Order Amount
                        </Typography>
                        <Typography variant="h4">
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
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6'>
                    <InfoRow 
                        label="Order Created At" 
                        value={formatDate(paymentDetails.order_created_at)} 
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
