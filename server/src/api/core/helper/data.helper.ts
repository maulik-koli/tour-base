
export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/'/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}


export const embededYoutubeUrl = (videoUrl: string | null): string | null => {
    if (!videoUrl) return videoUrl;
    if (videoUrl.startsWith("https://www.youtube.com/embed/")) return videoUrl;
    
    try {
        const url = new URL(videoUrl);
        let videoPathParam = url.pathname.slice(1) + url.search;

        return "https://www.youtube.com/embed/" + videoPathParam
    } catch (e) {
        return videoUrl;
    }
}


export const normalizeDateRange = (date: Date | string) => {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
}


export const normalizeDate = (date: Date | string): Date => {
    const normalized = new Date(date);
    normalized.setUTCHours(0, 0, 0, 0);
    return normalized;
}