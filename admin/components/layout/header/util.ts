const PAGES_MAP: Record<string, string> = {
    "tours": "Tours",
    "tickets": "Tickets",
    "edit": "Edit",
    "create": "Create",
}

const deSlugify = (str: string) => {
    return str
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

export const getBreadCrumbs = (pathName: string) => {
    if(pathName === "/") {
        return { segment: "Dashboard", href: "/" }
    }

    const segments = pathName.split('/').filter(Boolean);

    const breadCrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        return {
            segment: PAGES_MAP[segment.toLowerCase()] || deSlugify(segment),
            href
        }
    });
    return breadCrumbs;
}