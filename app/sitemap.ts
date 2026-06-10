import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/config";
import { getAllSlugs } from "@/lib/queries";
import { articleHref, homeHref } from "@/lib/links";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const lang of LOCALES) {
    entries.push({
      url: `${SITE_URL}${homeHref(lang)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}${homeHref("en")}`,
          sq: `${SITE_URL}${homeHref("sq")}`,
        },
      },
    });
  }

  // Article pages, with hreflang alternates pointing at the same slug.
  for (const slug of getAllSlugs()) {
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE_URL}${articleHref(lang, slug)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}${articleHref("en", slug)}`,
            sq: `${SITE_URL}${articleHref("sq", slug)}`,
          },
        },
      });
    }
  }

  return entries;
}
