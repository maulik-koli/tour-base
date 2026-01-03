import * as React from "react"
import { cn } from "@/lib/utils"
import { FieldDescription, FieldLabel } from "@/components/ui/field";

interface TextareaComponentProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> {
    onChange: (value: string) => void;
    value: string;
    errMsg?: string;
    label?: string;
    labelNode?: React.ReactNode;
    containerClass?: string;
}


const TextareaComponent: React.FC<TextareaComponentProps> = ({
    onChange, label, labelNode, errMsg, containerClass, className, ...props
}) => {
    return (
        <div className={cn('flex flex-col gap-1.5', containerClass)}>
            {label && <FieldLabel>{label}</FieldLabel>}
            {labelNode}
            <textarea
                data-slot="textarea"
                onChange={(e) => onChange(e.target.value.toString())}
                className={cn(
                    "border-border placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    errMsg ? "border-destructive ring-2 ring-destructive/60" : "border-border",
                    className
                )}
                {...props}
            />
            {errMsg && <FieldDescription>{errMsg}</FieldDescription>}
        </div>
    )
}

export default TextareaComponent
