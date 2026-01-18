import React from 'react'
import { cn } from '@/lib/utils'
import { typographyVariants } from '@/components/ui/typography'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ActivityFormCardWrapperProps {
    cardTitle: string
    children: React.ReactNode
    contentClassName?: string
    headerNode?: React.ReactNode,
    isChildrenEmpty?: boolean
}

const ActivityFormCardWrapper: React.FC<ActivityFormCardWrapperProps> = ({ 
    cardTitle, children, contentClassName, headerNode, isChildrenEmpty= false
}) => {
    return (
        <Card className='gap-0 py-0 shadow-none border border-border'>
            <CardHeader className={cn(
                "gap-0 pt-3", 
                headerNode && "flex items-center justify-between",
                isChildrenEmpty && "pb-3"
            )}>
                <CardTitle className={cn(typographyVariants({ variant: 'h4' }))}>{cardTitle}</CardTitle>
                {headerNode}
            </CardHeader>
            {isChildrenEmpty ? null : (
                <CardContent className={cn("pb-6 pt-3", contentClassName)}>
                    {children}
                </CardContent>
            )}
        </Card>
    )
}

export default ActivityFormCardWrapper
