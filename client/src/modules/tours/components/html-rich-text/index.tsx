"use client"
import React from 'react'
import DOMPurify from "dompurify";
import { cn } from '@/lib/utils';
import { typographyVariants } from '@ui/typography';

interface HtmlRichTextProps {
    html: string;
    className?: string;
}

const HtmlRichText: React.FC<HtmlRichTextProps> = ({ html, className }) => {
    const sanitizedHtml = DOMPurify.sanitize(html);

    return (
        <div
            className={cn("prose", typographyVariants({ variant: 'p' }), className)}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
    )
}

export default HtmlRichText
