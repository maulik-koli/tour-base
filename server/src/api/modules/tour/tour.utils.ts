export const Hotels = ["standard", "deluxe", "premium", "luxury"] as const;

export type HotelType = typeof Hotels[number];



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