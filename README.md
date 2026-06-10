# G·Travel — Bilingual Luxury Travel Magazine

An editorial, article-only magazine built with the **Next.js App Router**,
**TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Light, refined,
black-and-white-and-ivory, with a whisper of platinum-gold. Fully bilingual
(**English / Albanian**), responsive, and WCAG-minded.

> Design language: high-contrast Didone display type (**Bodoni Moda**) paired
> with a humanist sans (**Hanken Grotesk**), asymmetric editorial layouts,
> hairline rules, generous whitespace, and subtle scroll-reveal / parallax
> motion that respects `prefers-reduced-motion`.

---

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000  →  redirects to /en
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Fonts load from Google Fonts via a `<link>` in the document head, so the
browser needs internet access at runtime. Article photography is served from
Unsplash (configured in `next.config.mjs` → `images.remotePatterns`).

### Optional environment

| Variable               | Purpose                                   | Default                 |
| ---------------------- | ----------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO, OG, sitemap     | `http://localhost:3000` |

---

## How the site is organised

```
app/
  [lang]/
    layout.tsx                 Root layout — <html lang>, fonts, header/footer
    page.tsx                   Homepage: hero → latest → topics → destinations
    not-found.tsx              Localised 404
    articles/[slug]/page.tsx   Article page + SEO/OG metadata + JSON-LD
  sitemap.ts  robots.ts        SEO route handlers
  globals.css                  Tailwind v4 theme tokens + base/component styles
components/
  article/    ArticleCard · ArticleLayout · ArticleBody · ShareButtons · …
  sections/   HeroCarousel · LatestGrid · TopicsScroller · TopicSection ·
              StatementBand · DestinationGrid · DestinationFeature
  chrome/     SiteHeader · SiteFooter · LanguageSwitcher · SearchOverlay
  motion/     Reveal · Parallax · PageTransition
  ui/         ArrowLink · SectionHeading · StickyLabel
lib/
  articles.ts                  ← all article content lives here
  types.ts                     Article / Block / ResolvedArticle types
  queries.ts                   latest / by-topic / by-location / related / prev-next
  taxonomy.ts                  Category + Location display order
  i18n/config.ts               Locales, html lang, helpers
  i18n/dictionaries.ts         All UI strings (en + sq)
  links.ts  utils.ts  site.ts
middleware.ts                  "/" → locale redirect (cookie + Accept-Language)
```

### URL structure

```
/en                         /sq
/en/articles/<slug>         /sq/articles/<slug>
```

The `<slug>` is shared across languages, so every story is reachable in both
locales and the language switcher simply swaps the first path segment.

---

## Adding a new article

All content lives in [`lib/articles.ts`](lib/articles.ts). Append an object to
the `articles` array. TypeScript enforces that **both** language versions are
present.

```ts
{
  id: "a15",                       // unique
  slug: "lisbon-tile-houses",      // shared across languages, URL-safe
  category: "design",              // travel | hotels | dining | design | lifestyle | real-estate
  location: "europe",              // europe | albania | italy | greece | dubai | global
  author: AUTHORS.sofia,           // or define a new one in the AUTHORS map
  date: "2026-06-01",              // ISO; controls ordering + prev/next
  featured: false,                 // set true to promote to the homepage hero
  tags: ["lisbon", "tiles"],
  relatedArticleIds: ["a4", "a10"],// explicit picks; topped up automatically
  image: {
    src: u("photo-XXXXXXXXXXXXX"), // any Unsplash photo id (helper builds the URL)
    alt: { en: "…", sq: "…" },     // alt text is required in both languages
    credit: "Unsplash",
  },
  i18n: {
    en: {
      title: "…",
      subtitle: "…",               // one-line dek under the title
      excerpt: "…",                // used on cards + meta description
      body: [
        { type: "paragraph", spans: ["Plain text, and ",
          { text: "an inline link", articleSlug: "milan-quiet-design" }, " to another story."] },
        { type: "heading", text: "A subheading" },
        { type: "quote", text: "A pull quote.", cite: "Source" },
        { type: "image", src: u("photo-…"), alt: "…", caption: "…" },
      ],
    },
    sq: { /* the same shape, in Albanian */ },
  },
}
```

Reading time, related-article scoring, prev/next, search, the sitemap, and
every homepage rail update automatically — there is no build step to wire up.

### Block types for `body`

| Block       | Shape                                                    |
| ----------- | -------------------------------------------------------- |
| `paragraph` | `{ type, spans: (string \| { text, articleSlug })[] }`  |
| `heading`   | `{ type, text }`                                         |
| `quote`     | `{ type, text, cite? }`                                  |
| `image`     | `{ type, src, alt, caption? }`                           |

Use the `{ text, articleSlug }` span to drop **inline links to other articles**
inside running copy.

---

## Adding or editing translations

- **UI strings** (navigation, labels, section headers, 404, footer) live in
  [`lib/i18n/dictionaries.ts`](lib/i18n/dictionaries.ts). The `Dictionary`
  interface guarantees `en` and `sq` stay in lockstep — add a key to one and
  TypeScript will require it in the other.
- **Article copy** lives per-language inside each article's `i18n` map.
- **Adding a third language?** Extend the `Lang` union in
  [`lib/types.ts`](lib/types.ts) and `LOCALES` in
  [`lib/i18n/config.ts`](lib/i18n/config.ts); the compiler will then point you
  at every place that needs the new translation.

---

## Homepage composition

1. **Hero** — a full-screen, auto-advancing carousel (`HeroCarousel`) of the
   featured story plus the next few, with centered text over a darkened image.
2. **Latest** — a mixed editorial grid: two large lead cards then four smaller
   ones (`LatestGrid`).
3. **Topics** — a sticky left index (`TopicsScroller`) that scroll-spies the
   subject sections: the active topic lights up, the rest stay greyed.
4. **Statement band** — one full-bleed beat in the deep brand colour.
5. **Destinations** — an alternating rhythm of compact card grids
   (`DestinationGrid`) and full-bleed "hero-like" features
   (`DestinationFeature`), so the scroll stays varied and tight.

Header topic / destination links scroll to the matching homepage section
(`/<lang>#topic-…`, `/<lang>#place-…`).

---

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `article`, `footer`) and a
  single `<h1>` per page with a clean `h1 → h2 → h3` hierarchy.
- Keyboard-operable header, language switcher and search; a visible skip link;
  gold `:focus-visible` rings.
- Alt text required for every image in both languages.
- All motion is gated behind `prefers-reduced-motion`.

---

## Notes for this environment

This machine has an intermittent TLS issue that corrupts npm's *parallel*
registry downloads (fresh handshakes fail across cipher suites). If a fresh
`npm install` errors with `ERR_SSL_*` / `BAD_RECORD_MAC`, a small localhost
registry proxy that holds one warm keepAlive connection works around it — see
`C:\Users\arten\registry-proxy.cjs`:

```bash
PROXY_PORT=8799 node C:\Users\arten\registry-proxy.cjs   # in one terminal
npm install --registry http://127.0.0.1:8799/ --prefer-offline
```

This is purely a local network workaround and is not part of the app.
