import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface QuotesBandProps {
  dict: Dictionary;
}

/**
 * The hero's closing beat — two italic serif quotes flanking the magazine's
 * statement, separated by hairline gold rules. Quote marks are oversized
 * display glyphs in gold, opening on the left and closing on the right.
 */
export function QuotesBand({ dict }: QuotesBandProps) {
  return (
    <section id="quotes" className="scroll-mt-24 border-y border-line bg-beige px-edge py-12 md:py-9">
      <Reveal amount={0.3}>
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_1px_1.15fr_1px_1fr] md:gap-0">
          <blockquote className="flex items-start gap-4 md:pr-9">
            <span
              aria-hidden="true"
              className="-mt-2 font-display text-5xl leading-none text-gold-soft"
            >
              “
            </span>
            <p className="font-display text-lg italic leading-relaxed text-ink md:text-[1.2rem]">
              {dict.quotes.left}
            </p>
          </blockquote>

          <span aria-hidden="true" className="hidden self-stretch bg-gold/45 md:block" />

          <p className="text-center text-sm leading-[1.8] tracking-[0.02em] text-ink-soft md:px-9">
            {dict.quotes.about}
          </p>

          <span aria-hidden="true" className="hidden self-stretch bg-gold/45 md:block" />

          <blockquote className="flex items-end gap-4 md:pl-9">
            <p className="text-right font-display text-lg italic leading-relaxed text-ink md:text-[1.2rem]">
              {dict.quotes.right}
            </p>
            <span
              aria-hidden="true"
              className="-mb-6 font-display text-5xl leading-none text-gold-soft"
            >
              ”
            </span>
          </blockquote>
        </div>
      </Reveal>
    </section>
  );
}
