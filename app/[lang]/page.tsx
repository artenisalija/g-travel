import { notFound } from "next/navigation";
import { HeroCarousel, type HeroSlide } from "@/components/sections/HeroCarousel";
import { LatestGrid } from "@/components/sections/LatestGrid";
import { TopicsScroller } from "@/components/sections/TopicsScroller";
import { TopicSection } from "@/components/sections/TopicSection";
import { StatementBand } from "@/components/sections/StatementBand";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { DestinationFeature } from "@/components/sections/DestinationFeature";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLang } from "@/lib/i18n/config";
import {
  CATEGORY_ORDER,
  LOCATION_ORDER,
  getByCategory,
  getByLocation,
  getFeatured,
  getLatest,
} from "@/lib/queries";
import type { Lang } from "@/lib/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const l: Lang = lang;
  const dict = getDictionary(l);

  const featured = getFeatured(l);
  const latest = getLatest(l, 6, [featured.id]);

  const heroSlides: HeroSlide[] = [featured, ...getLatest(l, 4, [featured.id])].map(
    (a) => ({
      slug: a.slug,
      title: a.title,
      subtitle: a.subtitle,
      category: a.category,
      location: a.location,
      image: { src: a.image.src, alt: a.image.alt[l] },
    }),
  );

  const topicItems = CATEGORY_ORDER.map((category) => ({
    id: `topic-${category}`,
    label: dict.categories[category],
  }));

  return (
    <>
      <HeroCarousel slides={heroSlides} lang={l} dict={dict} />

      <LatestGrid articles={latest} lang={l} dict={dict} />

      {/* Topics: sticky scroll-spy index beside the subject sections */}
      <TopicsScroller
        items={topicItems}
        kicker={dict.topics.kicker}
        title={dict.topics.title}
      >
        {CATEGORY_ORDER.map((category, i) => (
          <TopicSection
            key={category}
            category={category}
            articles={getByCategory(category, l)}
            lang={l}
            dict={dict}
            index={i + 1}
            isFirst={i === 0}
          />
        ))}
      </TopicsScroller>

      {/* The one dark beat in the scroll */}
      <StatementBand dict={dict} />

      {/* Destinations: alternating compact grids and full-bleed features */}
      {LOCATION_ORDER.map((location, i) => {
        const articles = getByLocation(location, l);
        const Block = i % 2 === 0 ? DestinationGrid : DestinationFeature;
        return (
          <Block
            key={location}
            location={location}
            articles={articles}
            lang={l}
            dict={dict}
            index={i + 1}
          />
        );
      })}
    </>
  );
}
