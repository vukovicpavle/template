import { useMemo } from "react";

import type { TranslationKeys } from "~/utils/i18n";
import { getLocale, t } from "~/utils/i18n";

/**
 * React hook for accessing translations
 * Automatically re-renders when locale changes (if locale switching is implemented)
 */
export function useTranslation() {
  const locale = getLocale();

  const translation = useMemo(
    () => ({
      t: (key: TranslationKeys) => t(key),
      locale,
    }),
    [locale],
  );

  return translation;
}
