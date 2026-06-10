// ---------------------------------------------------------------------------
// Core domain types for the G·Travel editorial magazine.
// The data model is intentionally small and fully typed so that the homepage
// queries (latest / by-topic / by-location / related) stay simple and safe.
// ---------------------------------------------------------------------------

export type Lang = "en" | "sq";

export const LANGS: Lang[] = ["en", "sq"];

/** Editorial topics. The string values double as URL-friendly slugs. */
export type Category =
  | "travel"
  | "hotels"
  | "dining"
  | "design"
  | "lifestyle"
  | "real-estate";

/** Editorial destinations. The string values double as URL-friendly slugs. */
export type Location =
  | "europe"
  | "albania"
  | "italy"
  | "greece"
  | "dubai"
  | "global";

export interface Author {
  name: string;
  /** Optional bilingual role/title, e.g. "Editor at Large". */
  role?: Record<Lang, string>;
}

export interface ArticleImage {
  src: string;
  /** Alt text must exist for every language for accessibility. */
  alt: Record<Lang, string>;
  /** Photo credit shown discreetly under the hero. */
  credit?: string;
}

// --- Structured article body -----------------------------------------------
// Content is authored as an array of blocks rather than raw HTML so it stays
// type-safe, easy to render, and trivial to inject inline links to other
// articles (an explicit editorial requirement).

/** An inline span: either plain text or a link to another article by slug. */
export type Inline = string | { text: string; articleSlug: string };

export type Block =
  | { type: "paragraph"; spans: Inline[] }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

/** The portion of an article that differs per language. */
export interface LocalizedContent {
  title: string;
  /** One-line dek shown under the title. */
  subtitle: string;
  /** Short summary used on cards and meta description. */
  excerpt: string;
  body: Block[];
}

/** A single article, holding shared metadata plus a localized map. */
export interface Article {
  id: string;
  slug: string;
  category: Category;
  location: Location;
  author: Author;
  /** ISO date string, e.g. "2026-05-18". */
  date: string;
  image: ArticleImage;
  tags: string[];
  featured?: boolean;
  relatedArticleIds: string[];
  i18n: Record<Lang, LocalizedContent>;
}

/**
 * A flattened, single-language view of an article — the shape components
 * actually consume. Mirrors the flat content model (id, slug, language,
 * title, excerpt, ...) while keeping the source data DRY.
 */
export interface ResolvedArticle {
  id: string;
  slug: string;
  language: Lang;
  category: Category;
  location: Location;
  author: Author;
  date: string;
  image: ArticleImage;
  tags: string[];
  featured: boolean;
  relatedArticleIds: string[];
  title: string;
  subtitle: string;
  excerpt: string;
  body: Block[];
  /** Estimated reading time in minutes, derived from the body. */
  readingTime: number;
}
