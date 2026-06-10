import { articles } from "@/lib/articles";
import type { Article, Block, Category, Lang, Location, ResolvedArticle } from "@/lib/types";

// Re-exported for convenience; defined in taxonomy.ts so client components can
// use the ordering without importing the article data.
export { CATEGORY_ORDER, LOCATION_ORDER } from "@/lib/taxonomy";

const WORDS_PER_MINUTE = 200;

function blockWordCount(block: Block): number {
  switch (block.type) {
    case "paragraph":
      return block.spans
        .map((s) => (typeof s === "string" ? s : s.text))
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length;
    case "heading":
    case "quote":
      return block.text.split(/\s+/).filter(Boolean).length;
    case "image":
      return 0;
  }
}

function readingTime(body: Block[]): number {
  const words = body.reduce((sum, b) => sum + blockWordCount(b), 0);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Flatten a stored Article into a single-language view for components. */
export function resolveArticle(article: Article, lang: Lang): ResolvedArticle {
  const content = article.i18n[lang];
  return {
    id: article.id,
    slug: article.slug,
    language: lang,
    category: article.category,
    location: article.location,
    author: article.author,
    date: article.date,
    image: article.image,
    tags: article.tags,
    featured: Boolean(article.featured),
    relatedArticleIds: article.relatedArticleIds,
    title: content.title,
    subtitle: content.subtitle,
    excerpt: content.excerpt,
    body: content.body,
    readingTime: readingTime(content.body),
  };
}

const byDateDesc = (a: ResolvedArticle, b: ResolvedArticle) =>
  b.date.localeCompare(a.date);

/** Every article in the given language, newest first. */
export function getAllArticles(lang: Lang): ResolvedArticle[] {
  return articles.map((a) => resolveArticle(a, lang)).sort(byDateDesc);
}

export function getArticleBySlug(
  slug: string,
  lang: Lang,
): ResolvedArticle | undefined {
  const found = articles.find((a) => a.slug === slug);
  return found ? resolveArticle(found, lang) : undefined;
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}

/** The featured hero article (falls back to the most recent). */
export function getFeatured(lang: Lang): ResolvedArticle {
  const featured = articles.find((a) => a.featured);
  const resolved = featured
    ? resolveArticle(featured, lang)
    : getAllArticles(lang)[0];
  return resolved;
}

export function getLatest(
  lang: Lang,
  limit = 6,
  excludeIds: string[] = [],
): ResolvedArticle[] {
  return getAllArticles(lang)
    .filter((a) => !excludeIds.includes(a.id))
    .slice(0, limit);
}

export function getByCategory(
  category: Category,
  lang: Lang,
  limit?: number,
): ResolvedArticle[] {
  const list = getAllArticles(lang).filter((a) => a.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getByLocation(
  location: Location,
  lang: Lang,
  limit?: number,
): ResolvedArticle[] {
  const list = getAllArticles(lang).filter((a) => a.location === location);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/**
 * Related articles: explicit picks first, then topped up by shared topic and
 * shared destination. Never returns the article itself or duplicates.
 */
export function getRelated(
  article: ResolvedArticle,
  lang: Lang,
  limit = 3,
): ResolvedArticle[] {
  const all = getAllArticles(lang);
  const byId = new Map(all.map((a) => [a.id, a]));
  const picked: ResolvedArticle[] = [];
  const seen = new Set<string>([article.id]);

  const add = (candidate?: ResolvedArticle) => {
    if (!candidate || seen.has(candidate.id)) return;
    seen.add(candidate.id);
    picked.push(candidate);
  };

  // 1. Editor-curated relations.
  article.relatedArticleIds.forEach((id) => add(byId.get(id)));

  // 2. Same topic, then same destination (newest first).
  if (picked.length < limit) {
    all
      .filter((a) => a.category === article.category)
      .forEach(add);
  }
  if (picked.length < limit) {
    all
      .filter((a) => a.location === article.location)
      .forEach(add);
  }

  return picked.slice(0, limit);
}

/** Previous/next by chronology, wrapping around the collection ends. */
export function getPrevNext(
  article: ResolvedArticle,
  lang: Lang,
): { prev?: ResolvedArticle; next?: ResolvedArticle } {
  const all = getAllArticles(lang);
  const index = all.findIndex((a) => a.id === article.id);
  if (index === -1) return {};
  return {
    // "next" = newer story, "prev" = older story.
    next: index > 0 ? all[index - 1] : undefined,
    prev: index < all.length - 1 ? all[index + 1] : undefined,
  };
}

export function searchArticles(query: string, lang: Lang): ResolvedArticle[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllArticles(lang).filter((a) => {
    const haystack = [
      a.title,
      a.subtitle,
      a.excerpt,
      a.category,
      a.location,
      a.author.name,
      ...a.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
