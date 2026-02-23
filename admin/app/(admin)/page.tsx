import React from 'react'
import { Metadata } from 'next'
import PageTitle from '@/components/page-title'
import CardMatrix from '@/components/card-matrix'
import ProfileCard from '@module/admin/components/profile-card'
import CategoryTable from '@module/category/components/category-table'
import FeaturedTourList from '@module/tours/components/featured-tour-list'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Admin dashboard for managing tours, bookings, activities, and customer requests',
}

const DashboardPage: React.FC = () => {
    return (
        <div className='px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 flex flex-col gap-4 md:gap-5 lg:gap-6 bg-background'>
            <PageTitle 
                title='Dashboard'
                subtitle="Welcome back! Here's what's happening with your tours today"
            />
            <div className='w-full grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8'>
                <CardMatrix />
                <ProfileCard />
                <CategoryTable />
                <FeaturedTourList />
            </div>
        </div>
    )
}

export default DashboardPage