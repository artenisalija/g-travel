import { ArticleCard } from "@/components/article/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Lang, ResolvedArticle } from "@/lib/types";

interface RelatedArticlesProps {
  articles: ResolvedArticle[];
  lang: Lang;
  dict: Dictionary;
}

/** Topic- and destination-matched recommendations shown beneath each story. */
export function RelatedArticles({ articles, lang, dict }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="border-t border-line px-edge py-16 md:py-20"
    >
      <Reveal>
        <span className="rule max-w-16" />
        <h2
          id="related-heading"
          className="mt-6 text-headline font-medium text-ink md:text-title"
        >
          {dict.article.relatedTitle}
        </h2>
        <p className="mt-3 max-w-md text-base text-muted">
          {dict.article.relatedIntro}
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.id} delay={(i % 3) * 0.06} amount={0.15}>
            <ArticleCard
              article={article}
              lang={lang}
              dict={dict}
              variant="portrait"
              frameClassName="aspect-[4/5]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
