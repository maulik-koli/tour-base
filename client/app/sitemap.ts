import { DOMAIN } from "@/lib/api/axios";

// in future add cap booking and activities pages too
export default async function sitemap() {
    return [
        {
            url: DOMAIN,
            lastModified: new Date()
        },
        {
            url: `${DOMAIN}/tours`,
            lastModified: new Date()
        },
    ];
}
