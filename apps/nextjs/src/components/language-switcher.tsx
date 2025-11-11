"use client";

import { usePathname, useRouter } from "next/navigation";

import type { Locale } from "~/i18n";
import { localeNames, locales } from "~/i18n";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Replace the current locale in the pathname with the new locale
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div className="absolute right-4 top-4 flex gap-2 rounded-lg border bg-background p-2 shadow-md">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
            currentLocale === locale
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
