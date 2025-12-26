import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

type CollapsibleItemType = {
    label: string | React.ReactNode;
    children: React.ReactNode;
}

interface CollapsibleComponentProps {
    items: CollapsibleItemType[];
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
}


const CollapsibleComponent =  React.forwardRef<HTMLDivElement, CollapsibleComponentProps>(
    ({ items, className, triggerClassName, contentClassName }, ref) => {

    const [openStates, setOpenStates] = useState<boolean[]>(() => items.map(() => false));

    useEffect(() => {
        setOpenStates(items.map(() => false));
    }, [items.length]);

    const toggleItem = (index: number, open: boolean) => {
        setOpenStates((prev) =>
            prev.map((v, i) => (i === index ? open : v))
        );
    };


    return (
        <div className={cn('flex flex-col gap-2', className)} ref={ref} >
            {items.map(({label, children}, index) => (
                <Collapsible
                    key={index}
                    open={openStates[index] ?? false}
                    onOpenChange={(open) => toggleItem(index, open)}
                >
                    <CollapsibleTrigger asChild>
                        <div
                            className={cn(
                                "w-full p-2 cursor-pointer",
                                openStates[index]
                                    ? "rounded-t-md border-x border-t"
                                    : "rounded-md border",
                                triggerClassName
                            )}
                        >
                            {label}
                        </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className={cn(
                        'w-full border-x border-b border-border p-2 rounded-b-md',
                        contentClassName
                    )}>
                        {children}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    )
});

CollapsibleComponent.displayName = "CollapsibleComponent";
export default CollapsibleComponent;