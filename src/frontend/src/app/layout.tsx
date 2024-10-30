import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

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
    <html suppressHydrationWarning lang={locale}>
      <body className={cn(inter.className, "bg-background dark:bg-foreground")}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
