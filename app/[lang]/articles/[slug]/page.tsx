import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LOCALES, OG_LOCALE, isLang } from "@/lib/i18n/config";
import {
  getAllSlugs,
  getArticleBySlug,
  getPrevNext,
  getRelated,
} from "@/lib/queries";
import { articleHref } from "@/lib/links";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import type { Lang } from "@/lib/types";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getAllSlugs().map((slug) => ({ lang, slug })),
  );
}

/** Turn the stored image URL into a 1200×630 social-share crop. */
function ogImage(src: string): string {
  return src.replace(/w=\d+/, "w=1200&h=630");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const article = getArticleBySlug(slug, lang);
  if (!article) return {};

  const url = absoluteUrl(articleHref(lang, slug));
  const image = ogImage(article.image.src);

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(articleHref("en", slug)),
        sq: absoluteUrl(articleHref("sq", slug)),
        "x-default": absoluteUrl(articleHref("en", slug)),
      },
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      publishedTime: article.date,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.image.alt[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const l: Lang = lang;

  const article = getArticleBySlug(slug, l);
  if (!article) notFound();

  const dict = getDictionary(l);
  const related = getRelated(article, l, 3);
  const { prev, next } = getPrevNext(article, l);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [article.image.src],
    datePublished: article.date,
    inLanguage: l,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(articleHref(l, slug)),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        article={article}
        related={related}
        prev={prev}
        next={next}
        lang={l}
        dict={dict}
      />
    </>
  );
}
