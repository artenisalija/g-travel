import type { Lang } from "@/lib/types";

/** Canonical site URL — override with NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "G·Travel";

export const SITE_DESCRIPTION: Record<Lang, string> = {
  en: "A bilingual luxury travel magazine — where to go, where to stay, and how to live well on the road.",
  sq: "Një revistë luksi udhëtimi dygjuhëshe — ku të shkosh, ku të rrish dhe si të jetosh mirë në udhëtim.",
};

/** Default social-share image used when an article has none of its own. */
export const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
