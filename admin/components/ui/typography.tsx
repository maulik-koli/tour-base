import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
        variants: {
            variant: {
                h1: "scroll-m-20  text-4xl font-bold tracking-tight text-balance",
                h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
                h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
                h4: "scroll-m-20 text-xl font-semibold tracking-tight",
                p: "text-base",
                lead: "text-muted-foreground text-xl",
                large: "text-lg font-semibold",
                small: "text-sm font-medium leading-none",
                muted: "text-muted-foreground text-sm",
                link: "text-sm font-normal"
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