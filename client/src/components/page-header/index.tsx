import React from 'react';
import { Typography } from '@ui/typography';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
    title, 
    subtitle, 
    align = 'left' 
}) => {
    return (
        <div className='relative border-b border-border/50 bg-linear-to-b from-primary/5 to-transparent'>
            <div className={cn(
                'px-4 md:px-12 lg:px-20 py-8 md:py-12 lg:py-16 flex flex-col gap-3 md:gap-4',
                align === 'center' && 'items-center text-center'
            )}>
                <div className='flex flex-col gap-2'>
                    <Typography 
                        variant="h1" 
                        className='font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl'
                    >
                        {title}
                    </Typography>
                    <div className={cn(
                        'w-20 md:w-24 h-1 bg-primary rounded-full',
                        align === 'center' && 'mx-auto'
                    )}></div>
                </div>
                {subtitle && (
                    <Typography 
                        variant="h4" 
                        className={cn(
                            'text-muted-foreground font-normal text-base md:text-lg lg:text-xl leading-relaxed',
                            align === 'left' ? 'max-w-2xl' : 'max-w-3xl'
                        )}
                    >
                        {subtitle}
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
