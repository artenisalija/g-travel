"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";
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

const AUTOPLAY_MS = 1000;

interface HeroCarouselProps {
  slides: HeroSlide[];
  lang: Lang;
  dict: Dictionary;
}

/**
 * Full-screen, auto-advancing hero. Text sits bottom-centre over a darkened
 * image (shadowed top + bottom so it never fights the photograph). Autoplay
 * advances once a second, pauses on hover/focus, and is off under
 * prefers-reduced-motion.
 */
export function HeroCarousel({ slides, lang, dict }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex((i) => (next + count) % count),
    [count],
  );

  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={dict.hero.carouselLabel}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <h1 className="visually-hidden">
        {dict.brand.name} — {dict.brand.tagline}
      </h1>

      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Shadow on top (for the header) and bottom (for the text). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-deep-2/75 via-ink/15 to-ink/85"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/15" />

          {/* Bottom-middle text */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-edge pb-28 text-center md:pb-32">
            <div className="flex max-w-4xl flex-col items-center">
              <p className="eyebrow text-gold-soft">
                {dict.categories[slide.category]}
                <span aria-hidden="true" className="mx-2 text-ivory/40">
                  /
                </span>
                {dict.locationsLabels[slide.location]}
              </p>
              <h2 className="mt-5 text-display font-medium tracking-[-0.02em] text-ivory drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
                <Link
                  href={articleHref(lang, slide.slug)}
                  className="transition-opacity hover:opacity-90"
                >
                  {slide.title}
                </Link>
              </h2>
              <p className="mt-5 max-w-xl text-lede text-ivory/85">
                {slide.subtitle}
              </p>
              <div className="mt-8">
                <ArrowLink href={articleHref(lang, slide.slug)} tone="light">
                  {dict.hero.readStory}
                </ArrowLink>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls — typographic arrows flanking modern bar indicators */}
      {count > 1 ? (
        <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={dict.hero.prevSlide}
            className="font-display text-2xl leading-none text-ivory/70 transition-colors hover:text-ivory"
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${dict.hero.goToSlide} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "h-[3px] transition-all duration-500",
                  i === index
                    ? "w-10 bg-gold"
                    : "w-4 bg-ivory/45 hover:bg-ivory/80",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={dict.hero.nextSlide}
            className="font-display text-2xl leading-none text-ivory/70 transition-colors hover:text-ivory"
          >
            ›
          </button>
        </div>
      ) : null}

      <p className="visually-hidden" aria-live="polite">
        {index + 1} / {count}: {slide.title}
      </p>
    </section>
  );
}
