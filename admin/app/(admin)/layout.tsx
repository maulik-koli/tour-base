"use client";
import Header from "@/components/layout/header";
import AppSidebar from "@/components/layout/app-sidebar";
import AlertDialogComponet from "@ui/alert-dialog-component";
import { SidebarProvider } from "@ui/sidebar";
import { Separator } from "@ui/separator";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AlertDialogComponet />
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full h-full">
          <Header />
          <Separator />
          {children}
        </div>
      </SidebarProvider>
    </>
  );
}