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
        <div className={cn('w-full p-4 min-h-80 flex items-center justify-center', className)}>
            <div className='flex flex-col items-center gap-2 text-center'>
                <Icon name={type === 'error' ? 'OctagonX' : 'SearchX'} className='text-destructive w-12 h-12 mr-2' />
                <Typography variant="lead" className='text-destructive'>
                    {message || 'Something went wrong'}
                </Typography>
                <Typography className='text-destructive'>
                    {description || 'Please try again later.'}
                </Typography>
                {redirectUrl && (
                    <Button
                        variant="outline"
                        className='mt-4'
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
