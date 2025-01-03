import { SidebarProvider } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/common/AppSideBar";
import { AppHeader } from "@/components/common/AppHeader";

export default async function LocaleLayout({
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
