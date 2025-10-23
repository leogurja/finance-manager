import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: 'en',
  localeCookie: false,
  // A list of all locales that are supported
  locales: ['en', 'pt'],
});
