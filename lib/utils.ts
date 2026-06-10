import type { Lang } from "@/lib/types";

/** Tiny classnames joiner — keeps conditional class logic readable. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const INTL_LOCALE: Record<Lang, string> = {
  en: "en-GB",
  sq: "sq-AL",
};

/** Localised long date, e.g. "28 May 2026" / "28 maj 2026". */
export function formatDate(iso: string, lang: Lang): string {
  const date = new Date(iso);
  try {
    return new Intl.DateTimeFormat(INTL_LOCALE[lang], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return iso;
  }
}

/** Machine-readable date for <time dateTime>. */
export function isoDate(iso: string): string {
  return new Date(iso).toISOString();
}
