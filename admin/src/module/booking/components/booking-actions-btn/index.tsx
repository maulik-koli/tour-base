"use client"
import React from 'react'
import { useDeleteBooking } from '@module/booking/api/mutations'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/useToast'
import { useModelStore } from '@/store'

import Icon from '@/components/icons'
import { Button } from '@ui/button'


export const DeleteBookingButton: React.FC<{ bookingId: string }> = ({ bookingId }) => {
    const router = useRouter();
    const toast = useToast();
    const { mutate, isPending } = useDeleteBooking()
    const showModel = useModelStore(s => s.showModel);

    const handleClick = () => {
        showModel(handleDelete, {
            title: 'Delete Booking',
            description: 'Are you sure you want to delete this booking? This action cannot be undone?',
            actionText: 'Delete',
            canclelText: 'Cancel',
        });
    }

    const handleDelete = () => {
        mutate({
            bookingId
        }, {
            onSuccess: () => {
                toast.success('Booking deleted successfully.');
                router.push('/bookings');
            }
        })
    }

    toast.isLoading(isPending, 'Deleting booking...');

    
    return (
        <Button variant="destructive" onClick={handleClick}>
            <Icon name="Trash2" />
            Delete Booking
        </Button>
    )
}