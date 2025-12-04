export const ADMIN_SORT_MAP = [
    "createdAt_desc",
    "createdAt_asc",
    "updatedAt_desc",
    "updatedAt_asc",
] as const;

type AdminSortField = typeof ADMIN_SORT_MAP[number];

export const ADMIN_SORT_FIELD_MAP: Record<AdminSortField, any> = {
    createdAt_desc: { createdAt: -1 },
    createdAt_asc: { createdAt: 1 },
    updatedAt_desc: { updatedAt: -1 },
    updatedAt_asc: { updatedAt: 1 },
}


export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/'/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}


export const isHtmlContentEmpty = (html: string): boolean => {
    if (!html) return true;
    
    const div = document.createElement('div');
    div.innerHTML = html;
  
    const text = div.textContent?.replace(/\u200B/g, '').trim() || '';
    
    const htmlContent = div.innerHTML.trim();
    const hasOnlyEmptyTags = htmlContent === '' || 
                            htmlContent === '<p></p>' || 
                            htmlContent === '<p><br></p>' ||
                            !!htmlContent.match(/^<p>\s*<\/p>$/) ||
                            !!htmlContent.match(/^<p><br><\/p>$/);
    
    return text === '' || hasOnlyEmptyTags;
};