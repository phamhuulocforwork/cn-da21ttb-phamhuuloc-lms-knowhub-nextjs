import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/SideBar";
import { AppSidebar } from "@/components/app/AppSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KnowHub",
  description: "Learn everything!",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ThemeProvider enableSystem={true} defaultTheme="light">
          <NextIntlClientProvider messages={messages}>
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
