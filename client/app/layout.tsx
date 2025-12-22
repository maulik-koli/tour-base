"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

import Header from "@/components/layout/header";
import AppProvider from "@/provider";
import { Toaster } from "@ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        `${geistSans.variable} ${geistMono.variable} antialiased`,
        "flex flex-col bg-background"
      )}>
        <AppProvider>
          <Header />
          <main>
            {children}
          </main>
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
