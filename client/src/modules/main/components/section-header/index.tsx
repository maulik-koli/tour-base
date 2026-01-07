import React from 'react'
import { Typography } from '@/components/ui/typography';

interface SectionHeaderProps {
    title: string | React.ReactNode;
    subtitle: string | React.ReactNode;
}


const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="w-full mb-6 md:mb-10 text-center md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-0">
            <Typography variant="h2" className='text-2xl md:text-3xl lg:text-4xl leading-tight'>
                {title}
            </Typography>

            <Typography variant="lead" className="text-base md:text-lg lg:text-xl mt-3 md:mt-4 font-normal text-muted-foreground">
                {subtitle}
            </Typography>
        </div>
    )
}

export default SectionHeader
