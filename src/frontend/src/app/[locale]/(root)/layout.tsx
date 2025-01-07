import { SidebarProvider } from "@/components/ui/side-bar";
import { AppSidebar } from "@/components/common/app-side-bar";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex w-full flex-col">{children}</main>
    </SidebarProvider>
  );
}
