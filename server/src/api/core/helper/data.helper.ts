
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