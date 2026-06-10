import type { Lang } from "@/lib/types";

export const LOCALES: Lang[] = ["en", "sq"];
export const DEFAULT_LOCALE: Lang = "en";

export const LOCALE_LABELS: Record<Lang, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  // URL/route + html lang stay "sq" (ISO 639); the visible chip reads "AL".
  sq: { short: "AL", full: "Shqip" },
};

/** Type guard usable in route handlers where the segment is `string`. */
export function isLang(value: string): value is Lang {
  return (LOCALES as string[]).includes(value);
}

/** BCP-47 tags for <html lang> / Open Graph locale fields. */
export const HTML_LANG: Record<Lang, string> = {
  en: "en",
  sq: "sq-AL",
};

export const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  sq: "sq_AL",
};

/** The other locale — used by the language switcher. */
export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "sq" : "en";
}
