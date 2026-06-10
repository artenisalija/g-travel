"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { articleHref } from "@/lib/links";
import type { Category, Lang, Location } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  location: Location;
  image: { src: string; alt: string };
}

const AUTOPLAY_MS = 6000;

interface HeroCarouselProps {
  slides: HeroSlide[];
  lang: Lang;
  dict: Dictionary;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Split editorial hero. The left panel carries the masthead statement on
 * ivory — stacked serif headline, gold rule, letterspaced tagline and a CTA.
 * The right side is a slow photo carousel that dissolves into the ivory,
 * captioned bottom-left ("Featured") with arrows + a 01/06 counter
 * bottom-right. Autoplay pauses on hover/focus and respects reduced motion.
 */
export function HeroCarousel({ slides, lang, dict }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(() => (next + count) % count),
    [count],
  );

  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  const slide = slides[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  const intro = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={dict.hero.carouselLabel}
      className="relative w-full overflow-hidden bg-ivory text-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Sized so hero + pillar cards + quote band share one viewport on lg. */}
      <div className="relative flex flex-col lg:block lg:min-h-[max(52svh,440px)]">
        {/* ----- Left: masthead statement ---------------------------------- */}
        <div className="relative z-10 order-1 px-edge pb-14 pt-16 lg:flex lg:min-h-[max(52svh,440px)] lg:w-[46%] lg:flex-col lg:justify-center lg:py-10">
          <motion.h1
            {...intro(0.05)}
            className="font-display text-display font-medium uppercase leading-[1.02] tracking-[0.01em]"
          >
            {dict.hero.titleA}
            <br />
            {dict.hero.titleB}
          </motion.h1>

          <motion.div
            {...intro(0.2)}
            aria-hidden="true"
            className="mt-6 h-px w-16 bg-gold"
          />

          <motion.p
            {...intro(0.3)}
            className="mt-6 max-w-sm text-[0.92rem] font-medium uppercase leading-[1.85] tracking-[0.22em] text-ink-soft"
          >
            {dict.hero.tagline}
          </motion.p>

          <motion.div {...intro(0.45)} className="mt-8">
            <Link
              href="#latest"
              className="inline-block bg-ink px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-ivory transition-colors duration-300 hover:bg-deep"
            >
              {dict.hero.cta}
            </Link>
          </motion.div>
        </div>

        {/* ----- Right: photo carousel ------------------------------------- */}
        <div className="relative order-2 h-[58svh] min-h-[400px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
          <AnimatePresence>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dissolve into the ivory panel (desktop) and shade the caption.
              Wide multi-stop fade so the photo melts into the text side
              instead of cutting against it. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-[58%] lg:block bg-[linear-gradient(to_right,var(--color-ivory)_0%,var(--color-ivory)_14%,rgba(250,248,244,0.85)_38%,rgba(250,248,244,0.4)_68%,rgba(250,248,244,0)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent"
          />

          {/* Featured caption — bottom-left of the photograph */}
          <div className="absolute bottom-8 left-6 z-10 max-w-md pr-24 sm:left-10 lg:bottom-10 lg:left-[34%]">
            <p className="border-l-2 border-gold pl-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold-soft">
              {dict.hero.featured}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium text-ivory drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-3xl">
              <Link
                href={articleHref(lang, slide.slug)}
                className="transition-opacity hover:opacity-85"
              >
                {slide.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm tracking-[0.04em] text-ivory/85 md:text-base">
              {slide.subtitle}
            </p>
          </div>

          {/* Arrows + counter — bottom-right of the photograph */}
          {count > 1 ? (
            <div className="absolute bottom-9 right-6 z-10 flex items-center gap-6 sm:right-10 lg:bottom-[2.8rem]">
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label={dict.hero.prevSlide}
                  className="text-ivory/70 transition-colors hover:text-ivory"
                >
                  <ArrowIcon dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label={dict.hero.nextSlide}
                  className="text-ivory/70 transition-colors hover:text-ivory"
                >
                  <ArrowIcon dir="right" />
                </button>
              </div>
              <p className="text-sm tracking-[0.18em] text-ivory">
                {pad(index + 1)}
                <span className="text-ivory/55"> / {pad(count)}</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {index + 1} / {count}: {slide.title}
      </p>
    </section>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="34"
      height="12"
      viewBox="0 0 34 12"
      fill="none"
      aria-hidden="true"
      className={cn(dir === "left" && "rotate-180")}
    >
      <path
        d="M0 6h32M27 1l5.5 5L27 11"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
