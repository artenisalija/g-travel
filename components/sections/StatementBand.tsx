import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** A full-bleed band in the deep brand colour — the one dark beat in the scroll. */
export function StatementBand({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-deep px-edge py-20 text-ivory md:py-28">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="eyebrow text-gold-soft">{dict.brand.name}</span>
        <p className="mt-7 font-display text-3xl font-medium leading-snug text-ivory md:text-[2.6rem] md:leading-[1.18]">
          {dict.manifesto}
        </p>
      </Reveal>
    </section>
  );
}
