import Image from "next/image";
import Link from "next/link";
import { ArticleBody } from "@/components/article/ArticleBody";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { PrevNextNav } from "@/components/article/PrevNextNav";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ShareButtons } from "@/components/article/ShareButtons";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { articleHref, homeHref, topicAnchor } from "@/lib/links";
import { absoluteUrl } from "@/lib/site";
import type { Lang, ResolvedArticle } from "@/lib/types";
import { formatDate, isoDate } from "@/lib/utils";

interface ArticleLayoutProps {
  article: ResolvedArticle;
  related: ResolvedArticle[];
  prev?: ResolvedArticle;
  next?: ResolvedArticle;
  lang: Lang;
  dict: Dictionary;
}

export function ArticleLayout({
  article,
  related,
  prev,
  next,
  lang,
  dict,
}: ArticleLayoutProps) {
  const role = article.author.role?.[lang];

  return (
    <article>
      {/* Header */}
      <header className="px-edge pt-10 md:pt-16">
        <Reveal className="mx-auto max-w-4xl">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-faint"
          >
            <Link href={homeHref(lang)} className="transition-colors hover:text-ink">
              {dict.nav.home}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={topicAnchor(lang, article.category)}
              className="text-gold transition-colors hover:text-ink"
            >
              {dict.categories[article.category]}
            </Link>
          </nav>

          <p className="eyebrow mt-8">
            {dict.categories[article.category]}
            <span aria-hidden="true" className="mx-2 text-gold-soft">
              /
            </span>
            {dict.locationsLabels[article.location]}
          </p>

          <h1 className="mt-5 max-w-3xl text-title font-medium tracking-[-0.015em] text-ink">
            {article.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lede text-ink-soft">
            {article.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span>
              {dict.article.by}{" "}
              <span className="text-ink">{article.author.name}</span>
              {role ? <span className="text-faint">, {role}</span> : null}
            </span>
            <span aria-hidden="true" className="text-line-strong">·</span>
            <time dateTime={isoDate(article.date)}>
              {formatDate(article.date, lang)}
            </time>
            <span aria-hidden="true" className="text-line-strong">·</span>
            <span>
              {article.readingTime} {dict.article.minRead}
            </span>
          </div>

          <div className="mt-8">
            <ShareButtons
              url={absoluteUrl(articleHref(lang, article.slug))}
              title={article.title}
              dict={dict}
            />
          </div>
        </Reveal>
      </header>

      {/* Hero image */}
      <figure className="mt-10 px-edge md:mt-14">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-line md:aspect-[2/1]">
          <Parallax className="absolute inset-0 scale-110" distance={36}>
            <Image
              src={article.image.src}
              alt={article.image.alt[lang]}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
        </div>
        {article.image.credit ? (
          <figcaption className="mt-3 text-right text-[0.7rem] uppercase tracking-[0.15em] text-faint">
            {article.image.credit}
          </figcaption>
        ) : null}
      </figure>

      {/* Body */}
      <div className="px-edge py-14 md:py-20">
        <ArticleBody body={article.body} lang={lang} />

        {/* Tags */}
        {article.tags.length > 0 ? (
          <div className="mx-auto mt-14 flex w-full max-w-[42rem] flex-wrap items-center gap-2 border-t border-line pt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mx-auto mt-10 w-full max-w-[42rem]">
          <ArrowLink href={homeHref(lang)} tone="gold">
            {dict.article.backHome}
          </ArrowLink>
        </div>
      </div>

      <RelatedArticles articles={related} lang={lang} dict={dict} />
      <PrevNextNav prev={prev} next={next} lang={lang} dict={dict} />
    </article>
  );
}
