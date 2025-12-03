import { Typography } from '@/components/ui/typography'
import React from 'react'

const DashboardPage: React.FC = () => {
    return (
        <DefaultPage page="Dashboard" />
    )
}

export default DashboardPage



export const DefaultPage = ({ page }: { page: string }) => {
    return (
        <div className="w-full flex items-center mt-50">
            <Typography variant="h1" className="w-full">{page}</Typography>
        </div>
    )
}