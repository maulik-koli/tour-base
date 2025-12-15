import React from 'react'
import { Typography } from '@/components/ui/typography';

interface SectionHeaderProps {
    title: string | React.ReactNode;
    subtitle: string | React.ReactNode;
}


const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="mb-10 text-center max-w-xl mx-auto">
            <Typography variant="h2">
                {title}
            </Typography>

            <Typography variant="lead" className="mt-4 font-normal text-muted-foreground max-w-xl mx-auto">
                {subtitle}
            </Typography>
        </div>
    )
}

export default SectionHeader
