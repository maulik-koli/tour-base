import React from 'react'
import { Typography } from '@ui/typography'

interface PageTitleProps {
    title: string;
    subtitle?: string;
}


const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
    return (
        <div className='flex flex-col gap-1.5 md:gap-2'>
            <Typography variant="h2" className='text-xl md:text-2xl lg:text-3xl'>
                {title}
            </Typography>
            <Typography variant="small" className='text-muted-foreground text-xs md:text-sm'>
                {subtitle}
            </Typography>
        </div>
    )
}

export default PageTitle
