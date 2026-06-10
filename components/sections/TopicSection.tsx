import { ArticleCard } from "@/components/article/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Category, Lang, ResolvedArticle } from "@/lib/types";

interface TopicSectionProps {
  category: Category;
  articles: ResolvedArticle[];
  lang: Lang;
  dict: Dictionary;
  index: number;
  isFirst?: boolean;
}

/**
 * A single subject within the TopicsScroller's right column. Compact header
 * plus a small grid of that topic's stories. The sticky chapter index lives in
 * the scroller, so this stays lean.
 */
export function TopicSection({
  category,
  articles,
  lang,
  dict,
  index,
  isFirst,
}: TopicSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section
      id={`topic-${category}`}
      aria-labelledby={`topic-h-${category}`}
      className={
        isFirst
          ? "scroll-mt-28"
          : "scroll-mt-28 mt-14 border-t border-line pt-14 md:mt-16 md:pt-16"
      }
    >
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="eyebrow hanging-figures text-faint">
            {String(index).padStart(2, "0")}
          </span>
          <h2
            id={`topic-h-${category}`}
            className="text-2xl font-medium text-ink md:text-headline"
          >
            {dict.categories[category]}
          </h2>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {dict.topicBlurbs[category]}
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {articles.slice(0, 4).map((article, i) => (
          <Reveal key={article.id} delay={(i % 2) * 0.07} amount={0.15}>
            <ArticleCard
              article={article}
              lang={lang}
              dict={dict}
              variant="portrait"
              frameClassName="aspect-[4/5]"
              showExcerpt={i === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
