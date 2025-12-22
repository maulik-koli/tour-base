"use client"
import React from 'react'
import DOMPurify from "dompurify";
import { cn } from '@/lib/utils';
import { typographyVariants } from '@ui/typography';

interface HtmlRichTextProps {
    html: string;
}

const HtmlRichText: React.FC<HtmlRichTextProps> = ({ html }) => {
    const sanitizedHtml = DOMPurify.sanitize(html);

    return (
        <div
            className={cn("prose", typographyVariants({ variant: 'p' }))}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
    )
}

export default HtmlRichText
