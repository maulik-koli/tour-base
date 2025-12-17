import React from 'react'
import Icon from '../icons'
import { Typography } from '../ui/typography'

const HelpBlock: React.FC = () => {
    return (
        <div className='w-dull bg-muted p-5 rounded-lg'>
            <Typography variant="h3" className='mb-5'>Need Help?</Typography>
            <div className='flex flex-col space-y-4'>
                <div className='flex items-center gap-3'>
                    <Icon name='Phone' width={24} height={24} className='text-primary' />
                    <div>
                        <Typography variant="p" className='font-semibold'>Call Us</Typography>
                        <Typography variant="p" className='text-muted-foreground'>+1 234 567 890</Typography>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <Icon name='Clock' width={24} height={24} className='text-primary' />
                    <div>
                        <Typography variant="p" className='font-semibold'>Working Hours</Typography>
                        <Typography variant="p" className='text-muted-foreground'>Mon - Fri: 9 AM - 6 PM</Typography>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default HelpBlock
