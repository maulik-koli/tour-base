import React from 'react'
import Icon from '@/components/icons'
import { Separator } from '@ui/separator'
import { Button } from '@ui/button'
import { Card, CardContent, CardHeader } from '@ui/card'
import { Typography } from '@ui/typography'


const FeaturedTourList: React.FC = () => {
    return (
        <Card className='w-full h-fit col-span-4'>
            <CardHeader className='gap-0'>
                <Typography variant="lead">Featured Tours</Typography>
            </CardHeader>
            <CardContent className='px-0'>
                <Separator />
                <ul className='flex flex-col gap-4 p-6'>
                    {["Tour 1 sofnmau nfgoawufn auonf ouawfouawfn oun", "Tour 2", "Tour 3"].map((tour) => (
                        <li key={tour} className='w-full flex items-center justify-between'>
                            <Typography className='font-medium'>{tour}</Typography>
                            <Button variant="outline" className='text-destructive' size="icon">
                                <Icon name="Trash2" />   
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default FeaturedTourList
