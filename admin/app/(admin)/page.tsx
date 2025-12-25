import React from 'react'
import CardMatrix from '@/components/card-matrix'
import ProfileCard from '@module/admin/components/profile-card'
import CategoryTable from '@module/category/components/category-table'
import FeaturedTourList from '@module/tours/components/featured-tour-list'
import { Typography } from '@ui/typography'


const DashboardPage: React.FC = () => {
    return (
        <div className='px-8 py-6 flex flex-col gap-6 bg-background'>
            <div className='flex flex-col gap-2'>
                <Typography variant="h2">Dashboard</Typography>
                <Typography variant="small" className='text-muted-foreground'>
                    Welcome back! Here's what's happening with your tours today
                </Typography>
            </div>
            <div className='w-full grid grid-cols-12 gap-8'>
                <CardMatrix />
                <ProfileCard />
                <CategoryTable />
                <FeaturedTourList />
            </div>
        </div>
    )
}

export default DashboardPage