import { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

import { DOMAIN } from "@/lib/api/axios";
import "@/styles/globals.css";
import AppMain from "@/components/layout/app-main";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    metadataBase: new URL(DOMAIN),
    title: {
        default: "Explore Tours & Travel Packages | Eklavyatourism",
        template: "%s | Eklavyatourism",
    },
    description: "Discover affordable tour packages, curated travel experiences, and hassle-free bookings across top destinations. Plan your perfect trip with expert guidance.",

    keywords: [
        "tour packages",
        "travel agency",
        "holiday tours",
        "india tourism",
        "eklavya tourism",
    ],

    openGraph: {
        title: "Explore Tours & Travel Packages | Eklavyatourism",
        description: "Discover affordable tour packages, curated travel experiences, and hassle-free bookings across top destinations.",
        url: "/",
        siteName: "Eklavyatourism",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Eklavyatourism - Explore Tours and Travel",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Explore Tours & Travel Packages | Eklavyatourism",
        description: "Discover affordable tour packages, curated travel experiences, and hassle-free bookings across top destinations.",
        images: ["/og-image.jpg"],
    },

    robots: {
        index: true,
        follow: true,
    },
}


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-4645VQZ1HY"
                    strategy="afterInteractive"
                />
                <Script id="ga4-script" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-4645VQZ1HY');
                    `}
                </Script>
                <Script
                    src="https://analytics.eklavyatourism.cloud/script.js" 
                    data-website-id="115426cc-1401-4f3b-983a-db34c43566dd"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Eklavyatourism",
                            url: "https://eklavyatourism.com",
                            logo: "https://eklavyatourism.com/logo.png",
                        }),
                    }}
                />
            </head>
            <body className={cn(
                `${geistSans.variable} ${geistMono.variable} antialiased`,
                "flex flex-col bg-background"
            )}>
                <AppMain>{children}</AppMain>
            </body>
        </html>
    );
}