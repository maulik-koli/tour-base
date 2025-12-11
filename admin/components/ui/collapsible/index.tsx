import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

type CollapsibleItemType = {
    label: string | React.ReactNode;
    children: React.ReactNode;
}

interface CollapsibleComponentProps {
    items: CollapsibleItemType[];
}


const CollapsibleComponent =  React.forwardRef<HTMLDivElement, CollapsibleComponentProps>(
    ({ items }, ref) => {
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
            <div className='flex flex-col gap-2' ref={ref} >
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
                                    : "rounded-md border"
                                )}
                            >
                                {label}
                            </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent className='w-full border-x border-b border-border p-2 rounded-b-md'>
                            {children}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        )
    }
);

CollapsibleComponent.displayName = "CollapsibleComponent";
export default CollapsibleComponent;