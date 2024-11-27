"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/app/AppSideBar";
import { AppHeader } from "@/components/app/AppHeader";

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowLoginModal = () => setShowLoginModal(!showLoginModal);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex w-full flex-col">
        <AppHeader handleShowLoginModal={handleShowLoginModal} />
        {children}
      </main>
    </SidebarProvider>
  );
}
