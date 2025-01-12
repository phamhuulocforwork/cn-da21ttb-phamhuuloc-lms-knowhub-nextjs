import './globals.css';

import { AuthProvider } from '@/contexts/auth-provider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowHub',
  description: 'Learn everything!',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={inter.className}>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider defaultTheme='light' attribute='class'>
              {children}
              <Toaster />
            </ThemeProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
