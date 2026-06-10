import Link from "next/link";
import { BrandMark } from "@/components/chrome/BrandMark";
import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { homeHref, locationAnchor, topicAnchor } from "@/lib/links";
import { CATEGORY_ORDER, LOCATION_ORDER } from "@/lib/taxonomy";
import type { Lang } from "@/lib/types";

export function SiteFooter({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep px-edge pb-12 pt-16 text-ivory md:pt-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link
            href={homeHref(lang)}
            className="flex items-center gap-4 text-ivory"
          >
            <BrandMark className="h-12 w-12" />
            <span className="text-[0.68rem] font-semibold uppercase leading-[1.7] tracking-[0.3em]">
              {dict.hero.titleA}
              <br />
              {dict.hero.titleB}
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-ivory/70">
            {dict.footer.statement}
          </p>
          <p className="eyebrow mt-8 text-gold-soft">{dict.brand.tagline}</p>
        </div>

        <nav aria-label={dict.footer.sections} className="md:col-span-3">
          <p className="eyebrow text-gold-soft">{dict.footer.sections}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {CATEGORY_ORDER.map((category) => (
              <li key={category}>
                <Link
                  href={topicAnchor(lang, category)}
                  className="text-sm text-ivory/75 transition-colors hover:text-gold-soft"
                >
                  {dict.categories[category]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.destinations} className="md:col-span-2">
          <p className="eyebrow text-gold-soft">{dict.footer.destinations}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {LOCATION_ORDER.map((location) => (
              <li key={location}>
                <Link
                  href={locationAnchor(lang, location)}
                  className="text-sm text-ivory/75 transition-colors hover:text-gold-soft"
                >
                  {dict.locationsLabels[location]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="eyebrow text-gold-soft">{dict.footer.languageNote}</p>
          <div className="mt-5">
            <LanguageSwitcher current={lang} tone="light" />
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-ivory/15 pt-6 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {dict.brand.name} — {dict.footer.rights}
        </p>
        <p>{dict.footer.builtWith}</p>
      </div>
    </footer>
  );
}
