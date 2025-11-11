import type { Locale } from "./config";

interface Translations {
  common: {
    title: string;
    description: string;
  };
  home: {
    title: string;
    welcome: string;
  };
  language: {
    switch: string;
    english: string;
    spanish: string;
  };
}

const translations: Record<Locale, Translations> = {
  en: {
    common: {
      title: "Create T3 Turbo",
      description: "Simple monorepo with shared backend for web & mobile apps",
    },
    home: {
      title: "Next.js + Zustand",
      welcome: "Welcome to the T3 Turbo monorepo!",
    },
    language: {
      switch: "Switch Language",
      english: "English",
      spanish: "Spanish",
    },
  },
  es: {
    common: {
      title: "Create T3 Turbo",
      description:
        "Monorepo simple con backend compartido para aplicaciones web y móviles",
    },
    home: {
      title: "Next.js + Zustand",
      welcome: "¡Bienvenido al monorepo T3 Turbo!",
    },
    language: {
      switch: "Cambiar Idioma",
      english: "Inglés",
      spanish: "Español",
    },
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}
