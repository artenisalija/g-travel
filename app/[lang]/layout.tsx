import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HTML_LANG, LOCALES, isLang } from "@/lib/i18n/config";
import { getAllArticles } from "@/lib/queries";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import type { Lang } from "@/lib/types";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollJourney } from "@/components/motion/ScrollJourney";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "en";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${l === "sq" ? "Revistë Udhëtimi Luksi" : "Luxury Travel Magazine"}`,
      template: `%s · ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION[l],
    alternates: {
      canonical: absoluteUrl(`/${l}`),
      languages: {
        en: absoluteUrl("/en"),
        sq: absoluteUrl("/sq"),
        "x-default": absoluteUrl("/en"),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: l === "sq" ? "sq_AL" : "en_US",
    },
    icons: { icon: absoluteUrl("/favicon.svg") },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDictionary(lang);

  // Lightweight client-search index (titles/excerpts/tags) for this language.
  const searchIndex = getAllArticles(lang).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    location: a.location,
    author: a.author.name,
    tags: a.tags,
  }));

  return (
    <html lang={HTML_LANG[lang]} className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..800&family=Jost:ital,wght@0,300..700;1,300..600&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <SiteHeader lang={lang} dict={dict} searchIndex={searchIndex} />
        <ScrollJourney />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <SiteFooter lang={lang} dict={dict} />
      </body>
    </html>
  );
}
