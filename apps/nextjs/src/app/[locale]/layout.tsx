import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "@acme/ui";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import type { Locale } from "~/i18n";
import { LanguageSwitcher } from "~/components/language-switcher";
import { env } from "~/env";
import { getTranslations } from "~/i18n";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

interface Props {
  params: Promise<{ locale: Locale }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return {
    metadataBase: new URL(
      env.VERCEL_ENV === "production"
        ? "https://turbo.t3.gg"
        : "http://localhost:3000",
    ),
    title: t.common.title,
    description: t.common.description,
    openGraph: {
      title: t.common.title,
      description: t.common.description,
      url: "https://create-t3-turbo.vercel.app",
      siteName: t.common.title,
    },
    twitter: {
      card: "summary_large_image",
      site: "@jullerino",
      creator: "@jullerino",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default async function LocaleLayout({ params, children }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <LanguageSwitcher currentLocale={locale} />
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
