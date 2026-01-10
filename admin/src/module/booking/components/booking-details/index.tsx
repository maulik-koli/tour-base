import React from 'react'
import { GetBookingDetailsResponse } from '@module/booking/api/types';

import BookingCustomerInfo from '../customer-info'
import BookingPaymentInfo from '../payment-info';
import { BookingPackgeInfo, BookingTourInfo } from '../packge-tour-info';

interface BookingDetailsProps {
    booking: GetBookingDetailsResponse;
}

const BookingDetailsComponent: React.FC<BookingDetailsProps> = ({ booking }) => {
    return (
        <>
            <BookingCustomerInfo booking={booking} />

            {booking.paymentDetails && (
                <BookingPaymentInfo
                    paymentDetails={booking.paymentDetails}
                    totalAmount={booking.totalAmount}
                />
            )}

            {booking.packageDetails && (
                <BookingPackgeInfo packageDetails={booking.packageDetails} />
            )}

            {booking.tourDetails && (
                <BookingTourInfo tourDetails={booking.tourDetails} />
            )}
        </>
    )
}

export default BookingDetailsComponent