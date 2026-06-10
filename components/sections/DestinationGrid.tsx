import { ArticleCard } from "@/components/article/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Lang, Location, ResolvedArticle } from "@/lib/types";

interface DestinationGridProps {
  location: Location;
  articles: ResolvedArticle[];
  lang: Lang;
  dict: Dictionary;
  index: number;
}

/** Compact destination block: an inline header above a tight row of cards. */
export function DestinationGrid({
  location,
  articles,
  lang,
  dict,
  index,
}: DestinationGridProps) {
  if (articles.length === 0) return null;

  return (
    <section
      id={`place-${location}`}
      aria-labelledby={`place-h-${location}`}
      className="scroll-mt-24 px-edge py-12 md:py-16"
    >
      <Reveal className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">
            <span className="hanging-figures text-faint">
              {String(index).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="mx-2 text-line-strong">
              —
            </span>
            {dict.locations.kicker}
          </p>
          <h2
            id={`place-h-${location}`}
            className="mt-3 text-headline font-medium text-ink md:text-title"
          >
            {dict.locationsLabels[location]}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
          {dict.locationBlurbs[location]}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article, i) => (
          <Reveal key={article.id} delay={(i % 3) * 0.06} amount={0.15}>
            <ArticleCard
              article={article}
              lang={lang}
              dict={dict}
              variant="portrait"
              frameClassName="aspect-[4/5]"
              showExcerpt={i === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
