"use client";
import { toast } from "sonner";

interface ToastOptions {
    title: string;
    description?: string;
    actionLabel?: string;
    action?: () => void;
}

const base = (
    type: "success" | "error" | "info" | "warning",
    options: ToastOptions
) => {
    toast[type](options.title, {
        description: options.description,
        action: options.actionLabel
        ? {
            label: options.actionLabel,
            onClick: options.action!,
            }
        : undefined,
    });
};


export const showToast = {
    success: (opts: ToastOptions) => base("success", opts),

    error: (opts: ToastOptions) => base("error", opts),

    info: (opts: ToastOptions) => base("info", opts),

    warning: (opts: ToastOptions) => base("warning", opts),

    loading: (message: string = "Loading...") => toast.loading(message),

    dismiss: (id: string | number) => toast.dismiss(id),
};
