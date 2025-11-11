import * as Localization from "expo-localization";

import en from "~/locales/en.json";
import es from "~/locales/es.json";

export type SupportedLocale = "en" | "es";

export const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "es"];

export const DEFAULT_LOCALE: SupportedLocale = "en";

const translations = {
  en,
  es,
} as const;

/**
 * Detects the device locale and returns a supported locale.
 * Falls back to DEFAULT_LOCALE if device locale is not supported.
 */
export function getDeviceLocale(): SupportedLocale {
  const deviceLocales = Localization.getLocales();
  const deviceLocale = deviceLocales[0]?.languageCode;

  if (
    deviceLocale &&
    SUPPORTED_LOCALES.includes(deviceLocale as SupportedLocale)
  ) {
    return deviceLocale as SupportedLocale;
  }

  return DEFAULT_LOCALE;
}

/**
 * Gets the current locale (can be extended to support runtime locale switching)
 */
let currentLocale: SupportedLocale = getDeviceLocale();

export function getLocale(): SupportedLocale {
  return currentLocale;
}

export function setLocale(locale: SupportedLocale): void {
  currentLocale = locale;
}

/**
 * Type-safe translation function
 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKeys = NestedKeyOf<typeof en>;

/**
 * Gets a translation by key path (e.g., "home.title" or "common.welcome")
 */
export function t(key: TranslationKeys): string {
  const locale = getLocale();
  const translation = translations[locale];

  const keys = key.split(".");
  let value: unknown = translation;

  for (const k of keys) {
    if (typeof value === "object" && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to English if key not found
      const fallbackValue = getNestedValue(en, keys);
      return typeof fallbackValue === "string" ? fallbackValue : key;
    }
  }

  return typeof value === "string" ? value : key;
}

/**
 * Helper function to get nested object value by path
 */
function getNestedValue(obj: unknown, path: string[]): unknown {
  let value: unknown = obj;
  for (const k of path) {
    if (typeof value === "object" && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  return value;
}
