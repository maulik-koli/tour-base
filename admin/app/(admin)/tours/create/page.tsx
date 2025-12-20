"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useCreateTour } from '@module/tours/api/mutations';
import { CreateTourFormType } from '@module/tours/utils/schema';

import CreateTourForm from '@module/tours/forms/create-tour-form'
import { logger } from '@/lib/utils';


const CreateTourPage: React.FC = () => {
    const { mutate, isPending } = useCreateTour();
    const router = useRouter();
    const toast = useToast();


    const onSubmit = (data: CreateTourFormType) => {
        logger("data onSumbit", data);
        mutate(data, {
            onSuccess: (res) => {
                toast.success("Tour created successfully!");
                logger("Create Tour Response", res);
                router.push(`/tours`);
            },
            onError: (err) => {
                toast.error(err.message || "Failed to create tour. Please try again.");
                logger("Create Tour Error", err);
            }
        })
    }

    toast.isLoading(isPending, "Creating Tour...");


    return (
         <div className='py-3 px-8 bg-background'>
            <div className='flex flex-col gap-4'>
                <CreateTourForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

export default CreateTourPage
