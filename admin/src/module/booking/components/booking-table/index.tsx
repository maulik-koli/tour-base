"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { BookingListType } from '@module/booking/api/types'
import { cn, formatDate } from '@/lib/utils'

import Icon from '@/components/icons'
import { Button } from '@ui/button'
import { Card, CardContent } from '@ui/card'
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"
import { getBookingStatusStyles, getPaymentStatusStyles } from '@module/booking/utils/getStatusStyle'

interface BookingsTableProps {
    bookingsList: BookingListType[]
}


const BookingsTable: React.FC<BookingsTableProps> = ({ bookingsList }) => {
    const router = useRouter()
    const handleEdit = (bookingId: string) => {
        router.push(`/bookings/${bookingId}`)
    }

    return (
        <Card className='w-full'>
            <CardContent className='px-0'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='pl-6'>Sr No.</TableHead>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Customer Number</TableHead>
                            <TableHead>Tour Name</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Booking Status</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead className='pr-6'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookingsList.map((booking, index) => (
                            <TableRow key={booking._id}>
                                <TableCell className='pl-6 font-medium'>
                                    {index + 1}
                                </TableCell>
                                <TableCell className='font-medium'>
                                    {booking._id}
                                </TableCell>
                                <TableCell>{booking.customerName || '-'}</TableCell>
                                <TableCell>{booking.customerNumber || '-'}</TableCell>
                                <TableCell className='max-w-40 truncate'>
                                    {booking.tourName}
                                </TableCell>
                                <TableCell className='font-medium'>
                                    {formatDate(booking.createdAt)}
                                </TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                                        getBookingStatusStyles(booking.bookingStatus)
                                    )}>
                                        {booking.bookingStatus.replace(/_/g, ' ')}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                                        getPaymentStatusStyles(booking.orderStatus || "")
                                    )}>
                                        {booking.orderStatus || "Not Initiated"}
                                    </span>
                                </TableCell>
                                <TableCell className='pr-6'>
                                    <Button 
                                        variant="outline"
                                        size="icon"
                                        type='button'
                                        onClick={() => handleEdit(booking._id)}
                                    >
                                        <Icon name="Pencil" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default BookingsTable