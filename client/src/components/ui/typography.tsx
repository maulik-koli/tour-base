import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
        variants: {
            variant: {
                h1: "scroll-m-20 text-4xl md:text-5xl font-bold tracking-tight text-balance text-foreground",
                h2: "scroll-m-20 text-3xl md:text-4xl font-semibold tracking-tight first:mt-0 text-foreground",
                h3: "scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight text-foreground",
                h4: "scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight text-foreground",
                p: "text-base text-foreground",
                lead: "text-muted-foreground text-lg md:text-xl",
                large: "text-lg font-semibold text-foreground",
                small: "text-sm font-normal text-muted-foreground",
                muted: "text-muted-foreground text-sm",
                link: "text-sm font-normal text-foreground active:text-primary hover:text-primary"
            },
        },
        defaultVariants: {
            variant: "p",
        }
    }
)

const variantToElement = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    p: "p",
    lead: "p",
    large: "p",
    small: "span",
    muted: "span",
    link: "span",
} as const;

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
    asChild?: boolean;
}



function Typography({
    className,
    variant,
    asChild = false,
    ...props
}: TypographyProps) {
    const Comp = asChild ? Slot : variantToElement[variant as keyof typeof variantToElement] ?? "p";

    return (
        <Comp
            data-slot="typography"
            className={cn(typographyVariants({ variant, className }))}
            {...props}
        />
    )
}

export { Typography, typographyVariants }