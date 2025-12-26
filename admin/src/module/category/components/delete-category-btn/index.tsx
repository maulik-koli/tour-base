"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useDeleteCategory } from '@module/category/api/mutations';
import { useModelStore } from '@/store';

import Icon from '@/components/icons';
import { Button } from '@ui/button';

interface DeleteCategoryButtonProps {
    _id: string;
    className?: string;
}

const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({ _id, className }) => {
    const { mutate, isPending } = useDeleteCategory();
    const showModel = useModelStore(s => s.showModel);
    
    const router = useRouter();
    const toast = useToast();

    const handleDelete = () => {
        mutate({ _id }, {
            onSuccess: () => {
                toast.success("Category deleted successfully");
                router.push('/');
            }
        });
    }

    const handleClick = () => {
        showModel(handleDelete, {
            title: 'Delete Category',
            description: 'Are you sure you want to delete this category? This action cannot be undone.',
            actionText: 'Delete',
            canclelText: 'Cancel',
        });
    }

    toast.isLoading(isPending, "Deleting category...");


    return (
        <Button 
            type='button'
            variant="destructive"
            onClick={handleClick}
            className={className}
        >
            <Icon name="Trash2" />
            Delete
        </Button>
    )
}

export default DeleteCategoryButton
