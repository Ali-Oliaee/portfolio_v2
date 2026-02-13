export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
};
