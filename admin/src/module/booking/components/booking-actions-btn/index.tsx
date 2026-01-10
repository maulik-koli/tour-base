import React from 'react'
import Icon from '@/components/icons'
import { Button } from '@ui/button'

export const DeleteBookingButton: React.FC<{ bookingId: string }> = ({ bookingId }) => {

    const handleDelete = () => {
        // TODO: Implement delete functionality
        console.log("Delete booking:", bookingId)
    }

    
    return (
        <Button variant="destructive" onClick={handleDelete}>
            <Icon name="Trash2" />
            Delete Booking
        </Button>
    )
}


export const MarkAsPaidButton: React.FC<{ bookingId: string }> = ({ bookingId, }) => {
    const handleMarkAsPaid = () => {
        // TODO: Implement mark as fully paid functionality
        console.log("Mark as fully paid:", bookingId)
    }

    
    return (
        <Button variant="default" onClick={handleMarkAsPaid}>
            <Icon name="IndianRupee" />
            Mark as Fully Paid
        </Button>
    )
}