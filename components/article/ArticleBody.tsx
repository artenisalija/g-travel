import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { articleHref } from "@/lib/links";
import type { Block, Inline, Lang } from "@/lib/types";

function renderSpans(spans: Inline[], lang: Lang) {
  return spans.map((span, i) => {
    if (typeof span === "string") {
      return <Fragment key={i}>{span}</Fragment>;
    }
    return (
      <Link key={i} href={articleHref(lang, span.articleSlug)} className="prose-link">
        {span.text}
      </Link>
    );
  });
}

/** Renders structured article blocks into clean, readable editorial markup. */
export function ArticleBody({ body, lang }: { body: Block[]; lang: Lang }) {
  return (
    <div className="mx-auto w-full max-w-[42rem]">
      {body.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="mt-7 text-[1.12rem] leading-[1.85] text-ink-soft first:mt-0"
              >
                {renderSpans(block.spans, lang)}
              </p>
            );
          case "heading":
            return (
              <h2
                key={i}
                className="mt-14 font-display text-2xl font-medium text-ink md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote key={i} className="my-12 border-l border-gold pl-6 md:pl-8">
                <p className="font-display text-2xl italic leading-snug text-ink md:text-[2rem]">
                  “{block.text}”
                </p>
                {block.cite ? (
                  <cite className="mt-4 block text-xs uppercase not-italic tracking-[0.16em] text-faint">
                    {block.cite}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-12">
                <div className="relative aspect-[3/2] overflow-hidden bg-line">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42rem"
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.14em] text-faint">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
        }
      })}
    </div>
  );
}
