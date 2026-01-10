"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { BookingList } from '@app/(admin)/bookings/page'
import { cn } from '@/lib/utils'

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
import { getBookingStatusStyles } from '@module/booking/utils/getStatusStyle'


const getPaymentStatusStyles = (status: string) => {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-700"
        case "pending":
            return "bg-yellow-100 text-yellow-700"
        case "partial":
            return "bg-blue-100 text-blue-700"
        case "refunded":
            return "bg-muted text-muted-foreground"
        default:
            return "bg-muted text-muted-foreground"
    }
}

interface BookingsTableProps {
    bookingsList: BookingList[]
}


const BookingsTable: React.FC<BookingsTableProps> = ({ bookingsList }) => {
    const router = useRouter()
    const handleEdit = (bookingId: string) => {
        router.push(`/bookings/${bookingId}`)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
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
                            <TableRow key={booking.id}>
                                <TableCell className='pl-6 font-medium'>
                                    {index + 1}
                                </TableCell>
                                <TableCell className='font-medium'>
                                    {booking.bookingId}
                                </TableCell>
                                <TableCell>{booking.customerName}</TableCell>
                                <TableCell>{booking.customerNumber}</TableCell>
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
                                        getPaymentStatusStyles(booking.paymentStatus)
                                    )}>
                                        {booking.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell className='pr-6'>
                                    <Button 
                                        variant="outline"
                                        size="icon"
                                        type='button'
                                        onClick={() => handleEdit(booking.id)}
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