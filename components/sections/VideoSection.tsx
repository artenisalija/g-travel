import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { assetPath, YOUTUBE_CHANNEL_URL, YOUTUBE_VIDEO_ID } from "@/lib/site";

interface VideoSectionProps {
  dict: Dictionary;
}

/**
 * Events & Film — the dark cinema band, anchored as #events from the menu.
 * Embeds the featured film from the brand's YouTube channel; until a video id
 * is configured in lib/site.ts it shows a film-still placeholder instead.
 */
export function VideoSection({ dict }: VideoSectionProps) {
  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="scroll-mt-20 bg-deep px-edge py-16 text-ivory md:py-24"
    >
      <Reveal amount={0.2}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow text-gold-soft">{dict.video.kicker}</p>
            <h2
              id="events-heading"
              className="mt-4 font-display text-title font-medium"
            >
              {dict.video.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ivory/75">
              {dict.video.intro}
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden border border-ivory/15 md:mt-12">
            {YOUTUBE_VIDEO_ID ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`}
                title={dict.video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="aspect-video w-full"
              />
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={assetPath("/images/pillar-water.jpg")}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/60 bg-ink/30 backdrop-blur-sm">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-1 h-6 w-6 text-ivory"
                    >
                      <path d="M4 2.5v15l13-7.5-13-7.5z" />
                    </svg>
                  </span>
                  <p className="text-sm uppercase tracking-[0.22em] text-ivory/85">
                    {dict.video.soon}
                  </p>
                </div>
              </div>
            )}
          </div>

          {YOUTUBE_CHANNEL_URL ? (
            <p className="mt-7 text-center">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold-soft transition-colors hover:text-gold"
              >
                {dict.video.watch} →
              </a>
            </p>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
