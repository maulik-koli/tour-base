import { z } from "zod";

const isHtmlContentEmpty = (html: string): boolean => {
    if (!html || typeof html !== 'string') return true;

    const withoutTags = html.replace(/<[^>]*>/g, '');
    
    const withoutEntities = withoutTags
        .replace(/&nbsp;/gi, ' ')
        .replace(/&zwj;/gi, '')
        .replace(/&zwnj;/gi, '')
        .replace(/&#?[a-z0-9]+;/gi, ' ');
    
    const cleaned = withoutEntities
        .replace(/\u200B/g, '')
        .replace(/\u200C/g, '')
        .replace(/\u200D/g, '')
        .replace(/\uFEFF/g, '')
        .trim();

    return cleaned.length === 0;
};


export const htmlContentSchema = (minLength: number, fieldName: string = 'Content') => {
    return z.string()
        .refine((html) => !isHtmlContentEmpty(html), {
            message: `${fieldName} cannot be empty`,
        })
        .refine((html) => {
            const textContent = html
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/gi, ' ')
                .replace(/&#?[a-z0-9]+;/gi, ' ')
                .trim();
            return textContent.length >= minLength;
        }, {
            message: `${fieldName} must contain at least ${minLength} characters of actual text`,
        });
};