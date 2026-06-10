import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { articleHref } from "@/lib/links";
import type { Lang, ResolvedArticle } from "@/lib/types";
import { cn, formatDate, isoDate } from "@/lib/utils";

export type CardVariant = "portrait" | "overlay" | "horizontal" | "minimal";

interface ArticleCardProps {
  article: ResolvedArticle;
  lang: Lang;
  dict: Dictionary;
  variant?: CardVariant;
  className?: string;
  /** Override the heading size for hierarchy within a section. */
  headingClassName?: string;
  /** Aspect-ratio / sizing classes for the image frame. */
  frameClassName?: string;
  showExcerpt?: boolean;
  priority?: boolean;
  sizes?: string;
  index?: number;
}

function MetaLine({
  article,
  lang,
  dict,
  tone = "muted",
}: {
  article: ResolvedArticle;
  lang: Lang;
  dict: Dictionary;
  tone?: "muted" | "light";
}) {
  return (
    <p
      className={cn(
        "mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-wide",
        tone === "light" ? "text-ivory/70" : "text-faint",
      )}
    >
      <time dateTime={isoDate(article.date)}>
        {formatDate(article.date, lang)}
      </time>
      <span aria-hidden="true">·</span>
      <span>
        {article.readingTime} {dict.article.minRead}
      </span>
    </p>
  );
}

/**
 * The single reusable card. Four variants cover every layout the homepage and
 * article pages need, so location sections can be composed without bespoke
 * markup.
 */
export function ArticleCard({
  article,
  lang,
  dict,
  variant = "portrait",
  className,
  headingClassName,
  frameClassName,
  showExcerpt = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  index,
}: ArticleCardProps) {
  const href = articleHref(lang, article.slug);
  const eyebrow = (
    <>
      <span>{dict.categories[article.category]}</span>
      <span aria-hidden="true" className="mx-2 text-gold-soft">
        /
      </span>
      <span>{dict.locationsLabels[article.location]}</span>
    </>
  );

  // --- Overlay: full-bleed image with text laid over a gradient -------------
  if (variant === "overlay") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative isolate flex overflow-hidden bg-ink",
          className,
        )}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt[lang]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover opacity-95 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
        />
        <div className="relative z-10 mt-auto p-7 md:p-9">
          <p className="eyebrow text-gold-soft">{eyebrow}</p>
          <h3
            className={cn(
              "mt-4 font-display font-medium text-ivory",
              headingClassName ?? "text-2xl md:text-headline",
            )}
          >
            {article.title}
          </h3>
          {showExcerpt ? (
            <p className="mt-3 max-w-md text-sm text-ivory/80">
              {article.excerpt}
            </p>
          ) : null}
          <MetaLine article={article} lang={lang} dict={dict} tone="light" />
        </div>
      </Link>
    );
  }

  // --- Minimal: no image, hairline-topped text block -----------------------
  if (variant === "minimal") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex flex-col border-t border-line pt-5 transition-colors",
          className,
        )}
      >
        <p className="eyebrow flex items-center">
          {typeof index === "number" ? (
            <span className="mr-3 text-faint hanging-figures">
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
          {eyebrow}
        </p>
        <h3
          className={cn(
            "mt-3 font-display font-medium text-ink transition-colors duration-300 group-hover:text-gold",
            headingClassName ?? "text-xl md:text-2xl",
          )}
        >
          {article.title}
        </h3>
        {showExcerpt ? (
          <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
        ) : null}
        <MetaLine article={article} lang={lang} dict={dict} />
      </Link>
    );
  }

  // --- Horizontal: image beside text ---------------------------------------
  if (variant === "horizontal") {
    return (
      <Link
        href={href}
        className={cn(
          "group grid grid-cols-1 gap-5 sm:grid-cols-[1.1fr_1fr] sm:items-center",
          className,
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-line",
            frameClassName ?? "aspect-[5/4]",
          )}
        >
          <Image
            src={article.image.src}
            alt={article.image.alt[lang]}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3
            className={cn(
              "mt-3 font-display font-medium text-ink transition-colors duration-300 group-hover:text-gold",
              headingClassName ?? "text-2xl md:text-headline",
            )}
          >
            {article.title}
          </h3>
          {showExcerpt ? (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {article.excerpt}
            </p>
          ) : null}
          <MetaLine article={article} lang={lang} dict={dict} />
        </div>
      </Link>
    );
  }

  // --- Portrait (default): vertical card -----------------------------------
  return (
    <Link href={href} className={cn("group flex flex-col", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-line",
          frameClassName ?? "aspect-[4/5]",
        )}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt[lang]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
      <p className="eyebrow mt-5">{eyebrow}</p>
      <h3
        className={cn(
          "mt-3 font-display font-medium text-ink transition-colors duration-300 group-hover:text-gold",
          headingClassName ?? "text-xl md:text-2xl",
        )}
      >
        {article.title}
      </h3>
      {showExcerpt ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
      ) : null}
      <MetaLine article={article} lang={lang} dict={dict} />
    </Link>
  );
}
