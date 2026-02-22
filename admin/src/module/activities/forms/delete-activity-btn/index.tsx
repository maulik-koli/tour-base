"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useDeleteActivity } from '@module/activities/api/mutations';
import { useModelStore } from '@/store';

import Icon from '@/components/icons';
import { Button } from '@ui/button';
import { cn, logger } from '@/lib/utils';

interface DeleteActivityButtonProps {
    slug: string;
    className?: string;
}

const DeleteActivityButton: React.FC<DeleteActivityButtonProps> = ({ slug, className }) => {
    const { mutate, isPending } = useDeleteActivity();
    const showModel = useModelStore(s => s.showModel);
    const router = useRouter();
    const toast = useToast();
    
    const handleDelete = () => {
        mutate({ slug }, {
            onSuccess: () => {
                logger("handleDelete", slug);
                toast.success("Activity deleted successfully");
                router.replace('/activities');
            }
        });
    }

    const handleClick = () => {
        showModel(handleDelete, {
            title: 'Delete Activity',
            description: 'Are you sure you want to delete this activity? This action cannot be undone?',
            actionText: 'Delete',
            canclelText: 'Cancel',
        });
    }

    toast.isLoading(isPending, "Deleting activity...");

    
    return (
        <Button
            type='button'
            variant="destructive"
            onClick={handleClick}
            className={cn("text-xs md:text-sm w-fit", className)}
        >
            <Icon name="Trash2" className='w-4 h-4' />
            Delete Activity
        </Button>
    )
}

export default DeleteActivityButton
