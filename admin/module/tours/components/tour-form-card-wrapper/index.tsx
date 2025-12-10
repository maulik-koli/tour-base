import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { typographyVariants } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface TourFormCardWrapperProps {
    cardTitle?: string
    children: React.ReactNode
    contentClassName?: string
}

const TourFormCardWrapper: React.FC<TourFormCardWrapperProps> = ({ cardTitle, children, contentClassName }) => {
    return (
        <Card className='gap-2.5'>
            <CardHeader>
                <CardTitle className={typographyVariants({ variant: 'h4' })}>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className={cn(contentClassName)}>
                {children}
            </CardContent>
        </Card>
    )
}

export default TourFormCardWrapper
