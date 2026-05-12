import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((m) => m.default),
  uk: () => import("../dictionaries/uk.json").then((m) => m.default),
  ru: () => import("../dictionaries/ru.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "en";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale]();
