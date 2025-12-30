"use client"
import React from 'react'
import { cn } from '@/lib/utils';
import { useCreateBooking } from '@modules/booking/api/mutations';

import { Button } from '@ui/button'
import { SpinnerOverlay } from '@ui/spinner';
import { useRouter } from 'next/navigation';

interface BookContactBtnsProps {
    tourId: string;
    packageId: string;
    className?: string;
}


const BookContactButtons: React.FC<BookContactBtnsProps> = ({ className, packageId, tourId }) => {
    const router = useRouter();
    const { mutate, isPending } = useCreateBooking();


    const handleBookNow = () => {
        mutate({
            tourId,
            packageId
        }, {
            onSuccess: (data) => {
                if(data.data) {
                    router.replace(`/book-ticket/${data.data.bookingId}`);
                }
            }
        });
    }

    if (isPending) {
        return <SpinnerOverlay />
    }


    return (
        <div className={cn('space-y-2.5', className)}>
            <Button
                size="lg"
                type='button'
                className='w-full h-12 text-lg'
                onClick={handleBookNow}
            >
                Book Now
            </Button>
            <Button 
                variant="secondary"
                size="lg"
                type='button'
                className='w-full h-12 text-lg'
                onClick={() => router.replace("/contact-us")}
            >
                Contant Us
            </Button>
        </div>
    )
}

export default BookContactButtons
