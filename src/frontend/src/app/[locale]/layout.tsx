import type { Metadata } from "next";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/app/AppSideBar";

export const metadata: Metadata = {
  title: "KnowHub",
  description: "Learn everything!",
};

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
