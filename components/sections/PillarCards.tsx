import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { topicAnchor } from "@/lib/links";
import { assetPath } from "@/lib/site";
import type { Category, Lang } from "@/lib/types";

type PillarKey = "air" | "land" | "water" | "taste";

interface Pillar {
  key: PillarKey;
  /** Existing homepage topic section the card scrolls to. */
  category: Category;
  image: string;
  Icon: (props: { className?: string }) => React.ReactElement;
}

const u = (id: string) => assetPath(`/images/${id}.jpg`);

const PILLARS: Pillar[] = [
  {
    key: "air",
    category: "travel",
    image: u("photo-1436491865332-7a61a109cc05"),
    Icon: PlaneIcon,
  },
  {
    key: "land",
    category: "hotels",
    image: u("photo-1516483638261-f4dbaf036963"),
    Icon: ArchIcon,
  },
  {
    key: "water",
    category: "lifestyle",
    image: u("photo-1567899378494-47b22a2ae96a"),
    Icon: WavesIcon,
  },
  {
    key: "taste",
    category: "dining",
    image: u("photo-1414235077428-338989a2e8c0"),
    Icon: ClocheIcon,
  },
];

interface PillarCardsProps {
  lang: Lang;
  dict: Dictionary;
}

/**
 * The four editorial pillars under the hero — Air, Land, Water, Taste.
 * Full-bleed photo tiles with a line icon, serif label and two-line blurb,
 * separated by hairline ivory gaps like contact sheets.
 */
export function PillarCards({ lang, dict }: PillarCardsProps) {
  return (
    <section
      aria-label={`${dict.pillars.air.title} · ${dict.pillars.land.title} · ${dict.pillars.water.title} · ${dict.pillars.taste.title}`}
      className="grid grid-cols-1 gap-2 bg-beige px-2 py-2 sm:grid-cols-2 lg:grid-cols-4"
    >
      {PILLARS.map(({ key, category, image, Icon }, i) => {
        const { title, blurb } = dict.pillars[key];
        return (
          <Reveal key={key} delay={i * 0.08} amount={0.2}>
            <Link
              href={topicAnchor(lang, category)}
              className="group relative block aspect-[4/3] overflow-hidden bg-ink sm:aspect-[5/4] lg:aspect-auto lg:h-[max(23svh,190px)]"
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/20 transition-colors duration-500 group-hover:via-ink/25"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-6 text-center text-ivory lg:pb-7">
                <Icon className="mb-3 h-10 w-10 text-ivory drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]" />
                <span className="font-display text-2xl font-medium uppercase tracking-[0.06em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] xl:text-3xl">
                  {title}
                </span>
                <span className="mt-2 max-w-[16rem] text-sm leading-relaxed tracking-[0.04em] text-ivory/90">
                  {blurb}
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </section>
  );
}

/* Bold line icons — heavy enough to read over the photographs. */

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 24l13-5.5V8.5a2 2 0 014 0V18.5L32 24v3l-11-3v5l3.5 2.5V33L18 31.5 11.5 33v-1.5L15 29v-5L4 27v-3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
      <path
        d="M7 31V14a11 11 0 0122 0v17M3 31h30M11 31V17a7 7 0 0114 0v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WavesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 14c2.3 0 2.3 2 4.7 2s2.3-2 4.6-2 2.4 2 4.7 2 2.3-2 4.7-2 2.3 2 4.6 2 2.4-2 4.7-2M4 21c2.3 0 2.3 2 4.7 2s2.3-2 4.6-2 2.4 2 4.7 2 2.3-2 4.7-2 2.3 2 4.6 2 2.4-2 4.7-2M4 28c2.3 0 2.3 2 4.7 2s2.3-2 4.6-2 2.4 2 4.7 2 2.3-2 4.7-2 2.3 2 4.6 2 2.4-2 4.7-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClocheIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 26a12 12 0 0124 0M3 26h30M18 14v-2.5M16.5 10h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
