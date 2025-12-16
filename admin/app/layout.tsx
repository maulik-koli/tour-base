import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import AppProvider from "@/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tourism Admin",
  description: "Admin panel for Tourism application",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`)}>
        <main className="w-full h-full">
          <AppProvider>
            {children}
          </AppProvider>
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}