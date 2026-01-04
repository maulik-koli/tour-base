"use client"
import React, { useState } from 'react'
import { GetBookingDataResponse, PaymentOption } from '@modules/booking/api/types'

import Icon from '@/components/icons'
import BookingSummery from '../booking-summery'
import CustomerDetailsForm from '../customer-details-form'
import ReceiptPayment from '../receipte'
import PaymentSubmit from '../payment-submit'
import PaymentTerms from '../payment-terms'
import { SpinnerOverlay } from '@ui/spinner'
import { Separator } from '@ui/separator'
import { Button } from '@ui/button'

type BookingStateType = "details" | "receipt"

interface BookingComponentProps {
    data: GetBookingDataResponse
    isFetching: boolean
}


const BookingComponent: React.FC<BookingComponentProps> = ({ data, isFetching }) => {
    const [bookingState, setBookingState] = useState<BookingStateType>("details")
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption>("FULL");

     if (isFetching) {
        return <SpinnerOverlay />
    }

    if (bookingState === "details") {
        return (
            <>
                <BookingSummery
                    tour={data.tour}
                    packageData={data.package}
                />
                <Separator />
                <CustomerDetailsForm
                    bookingId={data.bookingId}
                    customerDetails={data.customerBookingDetails}
                    handleOnSubmit={() => setBookingState("receipt")}
                />
            </>
        )
    }

    return (
        <>
            <div className='w-full bg-card py-4 px-8 border border-border rounded-md flex flex-col gap-6'>
                <ReceiptPayment 
                    data={data}
                    options={selectedPaymentOption}
                />
                <PaymentSubmit
                    bookingId={data.bookingId}
                    totalAmount={data.totalAmount || 0}
                    options={selectedPaymentOption}
                    onOptionChange={(op) => setSelectedPaymentOption(op)}
                />
                <PaymentTerms />        
            </div>
            <div className='w-full flex items-center gap-4 justify-start'>
                <Button type='button' onClick={() => setBookingState("details")}>
                    <Icon name='ArrowLeft' width={10} height={16} />
                    Previous
                </Button>
            </div>
        </>
    )
}

export default BookingComponent
