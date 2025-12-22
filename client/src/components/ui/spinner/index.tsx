import React from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/icons";

interface SpinnerOverlayProps {
    className?: string;
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({ className }) => {
    return (
        <div 
            className={cn(
                "fixed inset-0 z-500 bg-black/20 backdrop-blur-sm flex items-center justify-center",
                className
            )}
        >
            <Icon name="Loader2" className="h-20 w-20 animate-spin text-primary/50" />
        </div>
    );
};


export const CustomSpinner: React.FC<{ className?: string }> = ({ className  }) => {
    return (
        <div 
            className={cn(
                "flex items-center justify-center h-full w-full",
                className
            )}
        >
            <Icon name="Loader2" className="h-15 w-15 animate-spin text-primary/50" stroke="currentColor" />
        </div>
    )
}