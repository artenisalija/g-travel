import type { Category, Lang, Location } from "@/lib/types";

// ---------------------------------------------------------------------------
// UI string dictionaries. Article *content* lives in lib/articles.ts; this
// file only covers the chrome (navigation, labels, section headings, etc.).
// Every key exists in both languages — the Dictionary type enforces parity.
// ---------------------------------------------------------------------------

export interface Dictionary {
  brand: { name: string; tagline: string };
  nav: {
    sections: string;
    destinations: string;
    search: string;
    searchPlaceholder: string;
    menu: string;
    close: string;
    skipToContent: string;
    language: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    readStory: string;
    carouselLabel: string;
    prevSlide: string;
    nextSlide: string;
    goToSlide: string;
    scroll: string;
    /** The two stacked headline lines, e.g. "Travel" / "with Style". */
    titleA: string;
    titleB: string;
    tagline: string;
    cta: string;
    featured: string;
  };
  pillars: Record<
    "air" | "land" | "water" | "taste",
    { title: string; blurb: string }
  >;
  quotes: { left: string; about: string; right: string };
  latest: { kicker: string; title: string; intro: string };
  topics: { kicker: string; title: string; intro: string; viewAll: string };
  locations: { kicker: string; title: string; intro: string };
  article: {
    by: string;
    minRead: string;
    published: string;
    relatedTitle: string;
    relatedIntro: string;
    continueReading: string;
    previous: string;
    next: string;
    moreIn: string;
    backHome: string;
    share: string;
    copyLink: string;
    copied: string;
  };
  search: {
    title: string;
    typeToSearch: string;
    resultsFor: string;
    noResults: string;
    oneResult: string;
    manyResults: string;
  };
  footer: {
    statement: string;
    sections: string;
    destinations: string;
    rights: string;
    builtWith: string;
    languageNote: string;
  };
  manifesto: string;
  categories: Record<Category, string>;
  locationsLabels: Record<Location, string>;
  topicBlurbs: Record<Category, string>;
  locationBlurbs: Record<Location, string>;
  notFound: { title: string; body: string; cta: string };
}

const en: Dictionary = {
  brand: {
    name: "G·Travel",
    tagline: "The art of considered travel.",
  },
  nav: {
    sections: "Sections",
    destinations: "Destinations",
    search: "Search",
    searchPlaceholder: "Search stories, places, topics…",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    language: "Language",
    home: "Home",
  },
  hero: {
    eyebrow: "The Featured Story",
    readStory: "Read the story",
    carouselLabel: "Featured stories",
    prevSlide: "Previous story",
    nextSlide: "Next story",
    goToSlide: "Go to story",
    scroll: "Scroll",
    titleA: "Travel",
    titleB: "with Style",
    tagline: "Luxury. Culture. Lifestyle. Around the World.",
    cta: "Discover More",
    featured: "Featured",
  },
  pillars: {
    air: {
      title: "Air",
      blurb: "Aviation, private jets and city escapes.",
    },
    land: {
      title: "Land",
      blurb: "Destinations, hotels, culture and road trips.",
    },
    water: {
      title: "Water",
      blurb: "Yachting, cruises and island experiences.",
    },
    taste: {
      title: "Taste",
      blurb: "Fine dining, wine and culinary journeys.",
    },
  },
  quotes: {
    left: "We don’t just travel to see places, we travel to see differently.",
    about:
      "G·Travel is a digital magazine dedicated to the art of travel, culture, lifestyle and the people who inspire the way we explore the world.",
    right:
      "Style is not about what you wear, it’s about how you experience.",
  },
  latest: {
    kicker: "The Latest",
    title: "New & Noteworthy",
    intro: "The stories our editors are reading this week.",
  },
  topics: {
    kicker: "Sections",
    title: "Explore by Subject",
    intro: "Six obsessions, one standard of taste.",
    viewAll: "View all",
  },
  locations: {
    kicker: "Destinations",
    title: "A Sense of Place",
    intro: "Dispatches from the addresses worth the journey.",
  },
  article: {
    by: "By",
    minRead: "min read",
    published: "Published",
    relatedTitle: "Related Reading",
    relatedIntro: "Chosen for you by subject and destination.",
    continueReading: "Continue reading",
    previous: "Previous",
    next: "Next",
    moreIn: "More in",
    backHome: "Back to the magazine",
    share: "Share",
    copyLink: "Copy link",
    copied: "Link copied",
  },
  search: {
    title: "Search the magazine",
    typeToSearch: "Start typing to search stories, places and topics.",
    resultsFor: "Results for",
    noResults: "No stories found for",
    oneResult: "story",
    manyResults: "stories",
  },
  footer: {
    statement:
      "An independent editorial study of where to go, where to stay, and how to live well on the road.",
    sections: "Sections",
    destinations: "Destinations",
    rights: "All rights reserved.",
    builtWith: "Crafted with care.",
    languageNote: "Read in",
  },
  manifesto:
    "We believe the best journeys are the unhurried ones — chosen with care, savoured slowly, and worth the long way round.",
  categories: {
    travel: "Travel",
    hotels: "Hotels",
    dining: "Dining",
    design: "Design",
    lifestyle: "Lifestyle",
    "real-estate": "Real Estate",
  },
  locationsLabels: {
    europe: "Europe",
    albania: "Albania",
    italy: "Italy",
    greece: "Greece",
    dubai: "Dubai",
    global: "Global",
  },
  topicBlurbs: {
    travel: "Journeys with intent — the routes, seasons and hours worth planning for.",
    hotels: "Rooms with a point of view, from grand dames to quiet new arrivals.",
    dining: "Where taste is being rewritten, one confident kitchen at a time.",
    design: "Interiors, objects and the people quietly shaping how we live.",
    lifestyle: "The rituals of living well, on the road and at altitude.",
    "real-estate": "The addresses changing hands and the lives behind the gates.",
  },
  locationBlurbs: {
    europe: "The old continent, read closely — its coasts, capitals and quiet corners.",
    albania: "The Mediterranean's last wild coast, awake and unhurried.",
    italy: "Lemon terraces, hushed studios and lakes that never rush.",
    greece: "White stone, blue water and the architecture of restraint.",
    dubai: "A vertical city learning the rituals of slowness.",
    global: "Dispatches from everywhere else worth the journey.",
  },
  notFound: {
    title: "This page has wandered off.",
    body: "The story you are looking for may have moved or never existed.",
    cta: "Return to the magazine",
  },
};

const sq: Dictionary = {
  brand: {
    name: "G·Travel",
    tagline: "Arti i udhëtimit të menduar.",
  },
  nav: {
    sections: "Rubrikat",
    destinations: "Destinacionet",
    search: "Kërko",
    searchPlaceholder: "Kërko artikuj, vende, tema…",
    menu: "Menyja",
    close: "Mbyll",
    skipToContent: "Kalo te përmbajtja",
    language: "Gjuha",
    home: "Ballina",
  },
  hero: {
    eyebrow: "Artikulli i Zgjedhur",
    readStory: "Lexo artikullin",
    carouselLabel: "Artikujt e zgjedhur",
    prevSlide: "Artikulli i mëparshëm",
    nextSlide: "Artikulli tjetër",
    goToSlide: "Shko te artikulli",
    scroll: "Lëviz",
    titleA: "Udhëto",
    titleB: "me Stil",
    tagline: "Luks. Kulturë. Stil Jete. Anembanë Botës.",
    cta: "Zbulo më Shumë",
    featured: "E Zgjedhur",
  },
  pillars: {
    air: {
      title: "Ajër",
      blurb: "Aviacion, avionë privatë dhe arratisje urbane.",
    },
    land: {
      title: "Tokë",
      blurb: "Destinacione, hotele, kulturë dhe udhëtime rrugore.",
    },
    water: {
      title: "Ujë",
      blurb: "Jahte, lundrime dhe përvoja ishujsh.",
    },
    taste: {
      title: "Shije",
      blurb: "Gastronomi e lartë, verë dhe udhëtime kulinarie.",
    },
  },
  quotes: {
    left: "Nuk udhëtojmë thjesht për të parë vende — udhëtojmë për të parë ndryshe.",
    about:
      "G·Travel është një revistë digjitale kushtuar artit të udhëtimit, kulturës, stilit të jetës dhe njerëzve që frymëzojnë mënyrën si e eksplorojmë botën.",
    right: "Stili nuk është ajo që vesh — është mënyra si e përjeton.",
  },
  latest: {
    kicker: "Më të Rejat",
    title: "Të Reja & të Veçanta",
    intro: "Artikujt që redaktorët tanë po lexojnë këtë javë.",
  },
  topics: {
    kicker: "Rubrikat",
    title: "Eksploro sipas Temës",
    intro: "Gjashtë pasione, një standard shijeje.",
    viewAll: "Shiko të gjitha",
  },
  locations: {
    kicker: "Destinacionet",
    title: "Ndjesia e Vendit",
    intro: "Reportazhe nga adresat që ia vlen udhëtimi.",
  },
  article: {
    by: "Nga",
    minRead: "min lexim",
    published: "Botuar më",
    relatedTitle: "Lexime të Ngjashme",
    relatedIntro: "Zgjedhur për ju sipas temës dhe destinacionit.",
    continueReading: "Vazhdo leximin",
    previous: "I mëparshmi",
    next: "Tjetri",
    moreIn: "Më shumë te",
    backHome: "Kthehu te revista",
    share: "Ndaj",
    copyLink: "Kopjo lidhjen",
    copied: "Lidhja u kopjua",
  },
  search: {
    title: "Kërko në revistë",
    typeToSearch: "Fillo të shkruash për të kërkuar artikuj, vende dhe tema.",
    resultsFor: "Rezultate për",
    noResults: "Nuk u gjet asnjë artikull për",
    oneResult: "artikull",
    manyResults: "artikuj",
  },
  footer: {
    statement:
      "Një studim i pavarur editorial mbi ku të shkosh, ku të rrish dhe si të jetosh mirë në udhëtim.",
    sections: "Rubrikat",
    destinations: "Destinacionet",
    rights: "Të gjitha të drejtat e rezervuara.",
    builtWith: "Punuar me kujdes.",
    languageNote: "Lexo në",
  },
  manifesto:
    "Besojmë se udhëtimet më të mira janë ato pa nxitim — të zgjedhura me kujdes, të shijuara ngadalë dhe që ia vlejnë rrugën e gjatë.",
  categories: {
    travel: "Udhëtime",
    hotels: "Hotele",
    dining: "Gastronomi",
    design: "Dizajn",
    lifestyle: "Stil Jete",
    "real-estate": "Pasuri të Patundshme",
  },
  locationsLabels: {
    europe: "Evropa",
    albania: "Shqipëria",
    italy: "Italia",
    greece: "Greqia",
    dubai: "Dubai",
    global: "Globale",
  },
  topicBlurbs: {
    travel: "Udhëtime me qëllim — rrugët, stinët dhe orët që ia vlen t'i planifikosh.",
    hotels: "Dhoma me një këndvështrim, nga zonjat e mëdha te ardhjet e reja të qeta.",
    dining: "Aty ku shija po rishkruhet, një kuzhinë e sigurt pas tjetrës.",
    design: "Brendësi, objekte dhe njerëzit që po formësojnë në heshtje si jetojmë.",
    lifestyle: "Ritualet e të jetuarit mirë, në udhëtim dhe në lartësi.",
    "real-estate": "Adresat që ndërrojnë duar dhe jetët pas portave.",
  },
  locationBlurbs: {
    europe: "Kontinenti i vjetër, lexuar nga afër — bregdetet, kryeqytetet dhe cepat e qetë.",
    albania: "Bregdeti i fundit i egër i Mesdheut, i zgjuar dhe pa nxitim.",
    italy: "Tarraca limoni, studio të heshtura dhe liqene që nuk nxitojnë kurrë.",
    greece: "Gur i bardhë, ujë blu dhe arkitektura e përmbajtjes.",
    dubai: "Një qytet vertikal që po mëson ritualet e ngadalësisë.",
    global: "Reportazhe nga kudo tjetër që ia vlen udhëtimi.",
  },
  notFound: {
    title: "Kjo faqe ka humbur rrugën.",
    body: "Artikulli që po kërkoni mund të jetë zhvendosur ose nuk ka ekzistuar kurrë.",
    cta: "Kthehu te revista",
  },
};

const DICTIONARIES: Record<Lang, Dictionary> = { en, sq };

export function getDictionary(lang: Lang): Dictionary {
  return DICTIONARIES[lang];
}
