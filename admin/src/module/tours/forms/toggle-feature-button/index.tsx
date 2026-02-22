"use client";
import React from 'react'
import Icon from '@/components/icons';
import { useToast } from '@/hooks/useToast';
import { useToggleFeaturedTour } from '@module/tours/api/mutations';
import { useModelStore } from '@/store';

import { Button } from '@ui/button'
import { FieldLabel } from '@ui/field'
import { Typography } from '@ui/typography'

interface ToggleFeaturedButtonProps {
    isFeatured: boolean;
    slug: string;
}


const ToggleFeaturedButton: React.FC<ToggleFeaturedButtonProps> = ({ slug, isFeatured }) => {
    const { mutate, isPending } = useToggleFeaturedTour();
    const showModel = useModelStore(s => s.showModel);
    const toast = useToast();

    const handleToggle = () => {
        const payload = {
            slug,
            data: { isFeatured: !isFeatured }
        }
        mutate(payload, {
            onSuccess: () => {
                toast.success(`Tour ${!isFeatured ? 'marked as' : 'removed from'} featured successfully`);
                window.location.reload();
                // since get tour api is fetching manually
                // here added window reload to fetch the updated data
            }
        });
    }

    const handleDeleteButton = () => {
        showModel(handleToggle, {
            title: isFeatured ? 'Remove from Featured' : 'Mark as Featured',
            description: `Are you sure you want to ${isFeatured ? 'remove this tour from' : 'mark this tour as'} featured?`,
            actionText: isFeatured ? 'Remove' : 'Mark as Featured',
        });
    }

    toast.isLoading(isPending, isFeatured ? "Removing from featured..." : "Marking as featured...");


    return (
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 py-3 md:py-4 px-3 rounded-md bg-muted/50'>
            <div className='flex flex-col gap-1'>
                <FieldLabel className='text-sm md:text-base'>Featured Tour State</FieldLabel>
                <Typography variant="small" className='text-xs md:text-sm'>Tour that are in featured slider of home page</Typography>
            </div>
            <div className='flex items-center gap-2'>
                {isFeatured ? (
                    <Typography 
                        variant="small"
                        className='text-green-600 bg-green-100 p-2 rounded-xl text-xs md:text-sm'
                    >Featured</Typography>
                ) : (
                    <Typography 
                        variant="small"
                        className='text-red-600 bg-red-100 py-1 px-2 rounded-xl text-xs md:text-sm'
                    >Not Featured</Typography>
                )}
                <Button type='button' variant="link" onClick={handleDeleteButton} className='text-xs md:text-sm'>
                    Change
                </Button>
            </div>
        </div>
    )
}

export default ToggleFeaturedButton



interface RemoveFeaturedButtonProps {
    slug: string;
    onSuccessAction?: () => void;
}

export const RemoveFeaturedButton: React.FC<RemoveFeaturedButtonProps> = ({ slug, onSuccessAction }) => {
    const { mutate, isPending } = useToggleFeaturedTour();
    const showModel = useModelStore(s => s.showModel);
    const toast = useToast();

    const handleToggle = () => {
        const payload = {
            slug,
            data: { isFeatured: false }
        }
        mutate(payload, {
            onSuccess: () => {
                toast.success('Tour removed from featured successfully');
                onSuccessAction && onSuccessAction();
            }
        });
    }

    const handleDeleteButton = () => {
        showModel(handleToggle, {
            title: 'Remove from Featured',
            description: `Are you sure you want to remove this tour from featured?`,
            actionText: 'Remove',
        });
    }


    toast.isLoading(isPending, "Removing from featured...");

    
    return (
        <Button 
            variant="outline"
            className='text-destructive h-8 w-8 md:h-9 md:w-9'
            size="icon"
            type='button'
            onClick={handleDeleteButton}
        >
            <Icon name="Trash2" className='w-3.5 h-3.5 md:w-4 md:h-4' />   
        </Button>
    )
}