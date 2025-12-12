import React from 'react'
import { Typography } from '../ui/typography'

interface DefaultProps {
    page: string
}

const DefaultPage: React.FC<DefaultProps> = ({ page }) => {
    return (
        <div className='w-full flex items-center justify-center h-100'>
            <Typography variant='h1'>{page}</Typography>
        </div>
    )
}

export default DefaultPage
