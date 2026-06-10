import type { Category, Lang, Location } from "@/lib/types";

export const homeHref = (lang: Lang) => `/${lang}`;

export const articleHref = (lang: Lang, slug: string) =>
  `/${lang}/articles/${slug}`;

/** Topic and destination links scroll to their homepage section. */
export const topicAnchor = (lang: Lang, category: Category) =>
  `/${lang}#topic-${category}`;

export const locationAnchor = (lang: Lang, location: Location) =>
  `/${lang}#place-${location}`;
