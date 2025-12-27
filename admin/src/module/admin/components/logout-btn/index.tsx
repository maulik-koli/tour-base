"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useAdminLogout } from '@module/admin/api/mutations'

import Icon from '@/components/icons'
import { Button } from '@ui/button'


const LogoutButton: React.FC = () => {
    const router = useRouter();
    const { mutate, isPending } = useAdminLogout();

    const handleLogout = () => {
        mutate(undefined, {
            onSuccess: () => {
                router.replace('/login');
            }
        });
    }

    return (
        <Button variant="ghost" type='button' onClick={handleLogout} disabled={isPending} >
            <Icon name="LogOut" />
            Logout
        </Button>
    )
}

export default LogoutButton
