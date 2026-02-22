"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useDeleteTour } from '@module/tours/api/mutations';
import { useModelStore } from '@/store';

import Icon from '@/components/icons';
import { Button } from '@ui/button';
import { cn, logger } from '@/lib/utils';

interface DeleteTourButtonProps {
    slug: string;
    className?: string;
}

const DeleteTourButton: React.FC<DeleteTourButtonProps> = ({ slug, className }) => {
    const { mutate, isPending } = useDeleteTour();
    const showModel = useModelStore(s => s.showModel);
    const router = useRouter();
    const toast = useToast();
    
    const handleDelete = () => {
        mutate({ slug }, {
            onSuccess: () => {
                logger("handleDelete", slug);
                toast.success("Tour deleted successfully");
                router.replace('/tours');
            }
        });
    }

    const handleClick = () => {
        showModel(handleDelete, {
            title: 'Delete Tour',
            description: 'Are you sure you want to delete this tour? This action cannot be undone?',
            actionText: 'Delete',
            canclelText: 'Cancel',
        });
    }

    toast.isLoading(isPending, "Deleting tour...");

    
    return (
        <Button
            type='button'
            variant="destructive"
            onClick={handleClick}
            className={cn("text-xs md:text-sm w-fit", className)}
        >
            <Icon name="Trash2" className='w-4 h-4' />
            Delete Tour
        </Button>
    )
}

export default DeleteTourButton
