import React, { forwardRef } from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Icon from '@/components/icons';

type AccodionType = {
    value: string;
    label: string | React.ReactNode;
    content: React.ReactNode;
}

interface AccordionComponentProps {
    items: AccodionType[];
}

const AccordionComponent = forwardRef<HTMLDivElement, AccordionComponentProps>(({ items }, ref) => {
    return (
        <Accordion type="multiple" ref={ref}>
            <div className='space-y-3'>
                {items.map(({ content, label, value }) => {
                    return (
                        <AccordionItem 
                            key={value} 
                            value={value}
                            
                        >
                            <AccordionTrigger className='relative'>
                                {label}
                                <Icon 
                                    name='ChevronDownIcon' 
                                    className='absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground'
                                />
                            </AccordionTrigger>
                            <AccordionContent>
                                {content}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </div>
        </Accordion>
    )
});

AccordionComponent.displayName = 'AccordionComponent';
export default AccordionComponent