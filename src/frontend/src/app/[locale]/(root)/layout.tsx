import { AppSidebar } from "@/components/blocks/side-bar/app-side-bar";
import { SidebarProvider } from "@/components/ui/side-bar";

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
