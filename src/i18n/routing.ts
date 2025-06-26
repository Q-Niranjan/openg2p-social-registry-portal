import { defineRouting } from 'next-intl/routing';
import { getSupportedLocales } from "@/utils/lang";

export const routing = defineRouting({
  // Dynamically fetching supported locales
  locales: getSupportedLocales(),

  // Used when no locale matches
  defaultLocale: 'en'
});
