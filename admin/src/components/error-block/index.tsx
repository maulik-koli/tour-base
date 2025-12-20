import React from 'react'
import Icon from '../icons'
import { Typography } from '../ui/typography'

interface ErrorBlockProps {
    type: 'error' | 'no-data';
    message?: string;
    description?: string;
}


const ErrorBlock: React.FC<ErrorBlockProps> = ({ message, description, type }) => {
    return (
        <div className='w-full p-4 min-h-80 flex items-center justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Icon name={type === 'error' ? 'OctagonX' : 'SearchX'} className='text-destructive w-12 h-12 mr-2' />
                <Typography variant="lead" className='text-destructive'>
                    {message || 'Something went wrong'}
                </Typography>
                <Typography className='text-destructive'>
                    {description || 'Please try again later.'}
                </Typography>
            </div>
        </div>
    )
}

export default ErrorBlock
