import React from 'react'
import Icon from '../icons'
import { Typography } from '../ui/typography'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@ui/button';

interface ErrorBlockProps {
    type: 'error' | 'no-data';
    redirectUrl?: string;
    message?: string;
    description?: string;
    className?: string;
}


const ErrorBlock: React.FC<ErrorBlockProps> = ({ message, description, type, className, redirectUrl }) => {
    const router = useRouter();

    return (
        <div className={cn('w-full p-4 md:p-6 min-h-60 md:min-h-80 flex items-center justify-center', className)}>
            <div className='flex flex-col items-center gap-3 md:gap-4 text-center max-w-md px-2'>
                <Icon name={type === 'error' ? 'OctagonX' : 'SearchX'} className='text-destructive w-10 h-10 md:w-12 md:h-12' />
                <Typography variant="lead" className='text-destructive text-lg md:text-xl'>
                    {message || 'Something went wrong'}
                </Typography>
                <Typography className='text-destructive text-sm md:text-base'>
                    {description || 'Please try again later.'}
                </Typography>
                {redirectUrl && (
                    <Button
                        variant="outline"
                        className='mt-2 md:mt-4'
                        onClick={() => router.push(redirectUrl)}
                    >
                        Go Back
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ErrorBlock
