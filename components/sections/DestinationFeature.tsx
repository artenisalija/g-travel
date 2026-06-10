import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { articleHref } from "@/lib/links";
import type { Lang, Location, ResolvedArticle } from "@/lib/types";

interface DestinationFeatureProps {
  location: Location;
  articles: ResolvedArticle[];
  lang: Lang;
  dict: Dictionary;
  index: number;
}

/** Full-bleed "hero-like" destination: a large image with bottom-anchored
 *  editorial text, and the location's remaining stories as a slim link strip. */
export function DestinationFeature({
  location,
  articles,
  lang,
  dict,
  index,
}: DestinationFeatureProps) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;

  return (
    <section
      id={`place-${location}`}
      aria-labelledby={`place-h-${location}`}
      className="scroll-mt-24"
    >
      <div className="relative flex min-h-[78vh] w-full flex-col justify-end overflow-hidden bg-ink text-ivory">
        <Image
          src={lead.image.src}
          alt={lead.image.alt[lang]}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-deep-2/90 via-ink/30 to-ink/30"
        />

        <Reveal className="relative z-10 w-full px-edge pb-14 pt-28">
          <p className="eyebrow text-gold-soft">
            <span className="hanging-figures text-ivory/55">
              {String(index).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="mx-2 text-ivory/40">
              —
            </span>
            {dict.locations.kicker}
            <span aria-hidden="true" className="mx-2 text-ivory/40">
              /
            </span>
            {dict.locationsLabels[location]}
          </p>

          <h2
            id={`place-h-${location}`}
            className="mt-4 max-w-3xl text-title font-medium text-ivory md:text-display"
          >
            <Link
              href={articleHref(lang, lead.slug)}
              className="transition-opacity hover:opacity-90"
            >
              {lead.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-xl text-lede text-ivory/85">
            {lead.subtitle}
          </p>
          <div className="mt-7">
            <ArrowLink href={articleHref(lang, lead.slug)} tone="light">
              {dict.hero.readStory}
            </ArrowLink>
          </div>

          {rest.length > 0 ? (
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/20 pt-5">
              <span className="eyebrow text-ivory/50">
                {dict.article.moreIn} {dict.locationsLabels[location]}
              </span>
              {rest.map((a) => (
                <Link
                  key={a.id}
                  href={articleHref(lang, a.slug)}
                  className="text-sm text-ivory/85 transition-colors hover:text-gold-soft"
                >
                  {a.title}{" "}
                  <span aria-hidden="true" className="text-ivory/50">
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
