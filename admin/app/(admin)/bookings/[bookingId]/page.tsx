"use client"
import React from 'react'
import { BookingType } from '@module/booking/api/types'

import BookingCustomerInfo from '@module/booking/components/customer-info'
import BookingPaymentInfo from '@module/booking/components/payment-info'
import { BookingPackgeInfo, BookingTourInfo } from '@module/booking/components/packge-tour-info'
import { DeleteBookingButton, MarkAsPaidButton } from '@module/booking/components/booking-actions-btn'
import { Typography } from '@ui/typography'

// Mock data for UI demonstration - will be replaced with API call
const mockBooking: BookingType = {
    _id: "booking_123456789",
    tourId: "tour_golden_triangle",
    packageId: "pkg_3d2n_deluxe",
    bookingStatus: "PAID_PARTIAL",
    expiresAt: "2026-01-15T23:59:59Z",
    accessToken: null,
    customerDetails: {
        fullName: "John Doe",
        phone1: "+91 98765 43210",
        phone2: "+91 87654 32109",
        dateOfTravel: "2026-02-15",
        members: [
            { fullName: "Jane Doe", age: 35, gender: "F" },
            { fullName: "Jack Doe", age: 10, gender: "M" },
        ]
    },
    tourDetails: {
        _id: "tour_123",
        tourName: "Golden Triangle Tour - Delhi, Agra, Jaipur",
        thumbnailImage: "https://example.com/image.jpg",
        includes: [
            "Pick up & Drop Land package city start to drop",
            "All sightseeing as per itinerary with private car",
            "Daily breakfast at the hotel",
            "Professional English speaking guide during sightseeing"
        ],
        excludes: [
            "Any airfare or train fare",
            "Lunch and dinner unless specified",
            "Personal expenses such as tips, laundry, telephone calls",
            "Entrance fees to monuments and museums"
        ]
    },
    packageDetails: {
        _id: "pkg_123",
        packageName: "3 Days 2 Nights Deluxe Package",
        days: 3,
        nights: 2,
        pricePerPerson: 15000,
        childrenPrice: 10000,
        startCity: "Delhi",
        endCity: "Jaipur"
    },
    totalAmount: 55000,
    paymentDetails: {
        paymentOption: "PARTIAL",
        order_status: "ACTIVE",
        order_amount: 27500,
        cf_order_id: "cf_order_12345",
        order_created_at: "2026-01-08T10:30:00Z",
        payment_session_id: "session_xyz"
    },
    createdAt: "2026-01-08T10:30:00Z",
    updatedAt: "2026-01-09T14:20:00Z",
}


const BookingDetail: React.FC = () => {
    // TODO: Replace with actual API call using bookingId from params
    const booking = mockBooking;

    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <Typography variant="h2" className='font-semibold'>Booking Details</Typography>
                    <Typography variant="small" className='text-muted-foreground font-normal'>
                        View booking information and manage status
                    </Typography>
                </div>
                <div className='flex items-center gap-3'>
                    {booking.bookingStatus === "PAID_PARTIAL" && (
                        <MarkAsPaidButton bookingId={booking._id} />
                    )}
                    <DeleteBookingButton bookingId={booking._id} /> 
                </div>
            </div>

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
        </div>
    )
}

export default BookingDetail
