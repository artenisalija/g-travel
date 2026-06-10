import Link from "next/link";
import { articleHref } from "@/lib/links";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Lang, ResolvedArticle } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PrevNextNavProps {
  prev?: ResolvedArticle;
  next?: ResolvedArticle;
  lang: Lang;
  dict: Dictionary;
}

function NavCell({
  article,
  lang,
  label,
  align,
}: {
  article: ResolvedArticle;
  lang: Lang;
  label: string;
  align: "start" | "end";
}) {
  return (
    <Link
      href={articleHref(lang, article.slug)}
      className={cn(
        "group flex flex-col gap-2 py-2",
        align === "end" && "sm:items-end sm:text-right",
      )}
    >
      <span className="eyebrow eyebrow-muted flex items-center gap-2">
        {align === "start" ? <span aria-hidden="true">←</span> : null}
        {label}
        {align === "end" ? <span aria-hidden="true">→</span> : null}
      </span>
      <span className="font-display text-xl text-ink transition-colors group-hover:text-gold md:text-2xl">
        {article.title}
      </span>
    </Link>
  );
}

/** Older/newer story navigation at the foot of an article. */
export function PrevNextNav({ prev, next, lang, dict }: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label={dict.article.continueReading}
      className="border-t border-line px-edge py-12"
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          {prev ? (
            <NavCell
              article={prev}
              lang={lang}
              label={dict.article.previous}
              align="start"
            />
          ) : null}
        </div>
        <div>
          {next ? (
            <NavCell
              article={next}
              lang={lang}
              label={dict.article.next}
              align="end"
            />
          ) : null}
        </div>
      </div>
    </nav>
  );
}
