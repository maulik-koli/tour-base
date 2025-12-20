import React from 'react'
import { cn } from '@/lib/utils'
import { typographyVariants } from '@/components/ui/typography'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TourFormCardWrapperProps {
    cardTitle?: string
    children: React.ReactNode
    contentClassName?: string
    headerNode?: React.ReactNode
}

const TourFormCardWrapper: React.FC<TourFormCardWrapperProps> = ({ cardTitle, children, contentClassName, headerNode }) => {
    return (
        <Card className='gap-2.5 shadow-none border border-border'>
            <CardHeader className={cn(headerNode && "flex items-center justify-between")}>
                <CardTitle className={typographyVariants({ variant: 'h4' })}>{cardTitle}</CardTitle>
                {headerNode}
            </CardHeader>
            <CardContent className={cn(contentClassName)}>
                {children}
            </CardContent>
        </Card>
    )
}

export default TourFormCardWrapper
