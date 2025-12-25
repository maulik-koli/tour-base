import React from 'react'
import Icon from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Typography } from '@ui/typography'
import { Card, CardContent } from '@ui/card'

const ADMIN = {
    name: "Admin User",
    avatar: "/avatars/admin.jpg",
    email: "admin@example.com",
    phone: "+1234567890",    
}


const ProfileCard: React.FC = () => {
    // here will be data coming from api or store
    return (
        <Card className='w-full col-span-4'>
            <CardContent className='h-full flex flex-col gap-4 justify-between'>
                <div className='flex flex-col gap-2 items-center'>
                    <Avatar className="h-15 w-15 rounded-lg">
                        <AvatarImage src={ADMIN.avatar} alt={ADMIN.name} />
                        <AvatarFallback 
                            className="rounded-lg bg-secondary-foreground/50 text-secondary flex ic justify-center"
                        >
                            LOGO
                        </AvatarFallback>
                    </Avatar>
                    <Typography variant="lead">
                        {ADMIN.name}
                    </Typography>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <div className='w-full flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-2'>
                            <Icon name='Mail' width={18} height={18} />
                            <Typography>Email:</Typography>
                        </div>
                        <Typography className='font-medium'>{ADMIN.email}</Typography>
                    </div>
                    <div className='w-full flex items-center justify-between gap-3'>
                        <div className='flex items-center gap-2'>
                            <Icon name='Phone' width={18} height={18} />
                            <Typography>Phone:</Typography>
                        </div>
                        <Typography className='font-medium'>{ADMIN.phone}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard
