import { SidebarProvider } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/app/AppSideBar";
import { AppHeader } from "@/components/app/AppHeader";

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex w-full flex-col">
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
