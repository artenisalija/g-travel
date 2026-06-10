import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Lang, ResolvedArticle } from "@/lib/types";

interface LatestGridProps {
  articles: ResolvedArticle[];
  lang: Lang;
  dict: Dictionary;
}

/** Clean 3 / 2 / 1 responsive grid of the most recent stories. */
export function LatestGrid({ articles, lang, dict }: LatestGridProps) {
  return (
    <section
      aria-labelledby="latest-heading"
      className="border-t border-line px-edge py-16 md:py-24"
    >
      <SectionHeading
        kicker={dict.latest.kicker}
        title={dict.latest.title}
        intro={dict.latest.intro}
      />
      {/* Diagonal mosaic: the two large stories sit on a diagonal (top-left and
          bottom-right), with four smaller cards filling around them. */}
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
        {articles.slice(0, 6).map((article, i) => {
          const isBig = i === 0 || i === 5; // top-left and bottom-right
          return (
            <Reveal
              key={article.id}
              delay={(i % 3) * 0.06}
              amount={0.15}
              className={isBig ? "lg:col-span-6" : "lg:col-span-3"}
            >
              <ArticleCard
                article={article}
                lang={lang}
                dict={dict}
                variant="portrait"
                frameClassName={isBig ? "aspect-[16/11]" : "aspect-[4/5]"}
                headingClassName={
                  isBig ? "text-2xl md:text-headline" : "text-lg md:text-xl"
                }
                showExcerpt={isBig}
                priority={i === 0}
                sizes={
                  isBig
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 48vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                }
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
