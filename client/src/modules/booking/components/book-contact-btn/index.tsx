"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useCreateBooking } from '@modules/booking/api/mutations';
import { cn } from '@/lib/utils';

import { Button } from '@ui/button'
import { SpinnerOverlay } from '@ui/spinner';

interface BookContactBtnsProps {
    tourId: string;
    packageId: string;
    isDisabled?: boolean;
    className?: string;
}


const BookContactButtons: React.FC<BookContactBtnsProps> = ({ className, packageId, tourId, isDisabled }) => {
    const router = useRouter();
    const { mutate, isPending } = useCreateBooking();


    const handleBookNow = () => {
        mutate({
            tourId,
            packageId
        }, {
            onSuccess: (data) => {
                if(data.data) {
                    if (data.data) {
                        router.replace(`/book-package/${data.data.bookingId}`);
                    }
                }
            }
        });
    }

    if (isPending) {
        return <SpinnerOverlay />
    }


    return (
        <div className={cn('w-full flex flex-col gap-2', className)}>
            <Button
                size="lg"
                type='button'
                className='h-12 text-lg'
                onClick={handleBookNow}
                disabled={isDisabled}
            >
                Book Now
            </Button>
            <Button 
                variant="secondary"
                size="lg"
                type='button'
                className='h-12 text-lg'
                onClick={() => router.replace("/contact-us")}
            >
                Contant Us
            </Button>
        </div>
    )
}

export default BookContactButtons
