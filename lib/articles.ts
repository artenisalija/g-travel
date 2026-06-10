import type { Article, Author } from "@/lib/types";

// ---------------------------------------------------------------------------
// Sample editorial data. Each article holds shared metadata once and a per-
// language `i18n` map (en + sq). To add a translation, fill the matching
// language object — TypeScript will flag any missing keys.
//
// Images are self-hosted in public/images (downloaded from Unsplash once) so
// the site never depends on a third-party CDN at view time. Drop a new file
// in public/images and reference its id here to change the photography.
// ---------------------------------------------------------------------------

import { assetPath } from "@/lib/site";

/** Resolve a photo id to its self-hosted file. */
const u = (id: string) => assetPath(`/images/${id}.jpg`);

const AUTHORS = {
  eleonora: {
    name: "Eleonora Vance",
    role: { en: "Editor at Large", sq: "Redaktore e Përgjithshme" },
  },
  marcus: {
    name: "Marcus Hale",
    role: { en: "Travel Editor", sq: "Redaktor Udhëtimesh" },
  },
  dardan: {
    name: "Dardan Krasniqi",
    role: { en: "Contributing Writer", sq: "Bashkëpunëtor" },
  },
  sofia: {
    name: "Sofia Marchetti",
    role: { en: "Design Editor", sq: "Redaktore Dizajni" },
  },
  lara: {
    name: "Lara Ahmadi",
    role: { en: "Lifestyle Editor", sq: "Redaktore Stili" },
  },
} satisfies Record<string, Author>;

export const articles: Article[] = [
  // 1 — HERO · travel · italy --------------------------------------------------
  {
    id: "a1",
    slug: "amalfi-coast-slow-summer",
    category: "air",
    location: "italy",
    author: AUTHORS.eleonora,
    date: "2026-05-28",
    featured: true,
    tags: ["coast", "summer", "italy", "slow travel"],
    relatedArticleIds: ["a11", "a4", "a13", "a7"],
    image: {
      src: u("photo-1533105079780-92b9be482077"),
      alt: {
        en: "Pastel cliffside houses above the sea on the Amalfi Coast at dusk",
        sq: "Shtëpi pastel mbi shkëmbinj përballë detit në Bregdetin Amalfi në muzg",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "The Amalfi Coast, Rediscovered at Half Speed",
        subtitle:
          "Skip the hydrofoil crowds. The cliffs reward those who arrive slowly, and stay longer.",
        excerpt:
          "A case for the unhurried Amalfi: lemon groves at dawn, empty terraces at noon, and the art of doing very little, beautifully.",
        body: [
          {
            type: "paragraph",
            spans: [
              "There is a version of the Amalfi Coast that exists only before nine in the morning. The day-trippers are still on the road from Naples, the ferries have not yet disgorged their crowds, and the light falls flat and silver across the water. This is the coast worth chasing — not the postcard, but the hour before it.",
            ],
          },
          {
            type: "heading",
            text: "Arrive by water, leave by foot",
          },
          {
            type: "paragraph",
            spans: [
              "We based ourselves above Ravello, where the gardens hang over a thousand feet of nothing and the only sound at noon is bees in the bougainvillea. From here the great walks unfold: the Path of the Gods, the lemon-terrace staircases down to Amalfi, the goat tracks that the guidebooks forget. For a different rhythm entirely, pair it with ",
              { text: "a week on the Albanian Riviera", articleSlug: "albanian-riviera-awakening" },
              ", where the same sea arrives without the centuries of fame.",
            ],
          },
          {
            type: "quote",
            text: "The trick to the Amalfi Coast is to want less of it, and to want it for longer.",
            cite: "A hotelier in Ravello",
          },
          {
            type: "paragraph",
            spans: [
              "Stay long enough and the coast stops performing for you. The waiter remembers your table. The lemon granita arrives unasked. You begin to understand why the great Italian designers — the subject of ",
              { text: "our study of Milan's quiet design", articleSlug: "milan-quiet-design" },
              " — keep summer houses here, and never photograph them.",
            ],
          },
        ],
      },
      sq: {
        title: "Bregdeti Amalfi, i Rizbuluar me Ngadalë",
        subtitle:
          "Shmang turmat e anijeve të shpejta. Shkëmbinjtë shpërblejnë ata që mbërrijnë ngadalë dhe qëndrojnë gjatë.",
        excerpt:
          "Një arsye për Amalfin pa nxitim: pemishte limoni në agim, tarraca bosh në mesditë dhe arti për të bërë shumë pak, bukur.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Ekziston një version i Bregdetit Amalfi që jeton vetëm para orës nëntë të mëngjesit. Vizitorët e një dite janë ende rrugës nga Napoli, tragetet nuk i kanë zbrazur turmat e tyre dhe drita bie e sheshtë e argjendtë mbi ujë. Ky është bregdeti që ia vlen të ndiqet — jo kartolina, por ora para saj.",
            ],
          },
          {
            type: "heading",
            text: "Mbërri me ujë, ik në këmbë",
          },
          {
            type: "paragraph",
            spans: [
              "U vendosëm sipër Ravellos, ku kopshtet varen mbi treqind metra hapësirë dhe i vetmi tingull në mesditë janë bletët në bugenvile. Që këtu nisin shëtitjet e mëdha: Shtegu i Perëndive, shkallët e tarracave me limonë deri në Amalfi, shtigjet që harxhuesit e udhërrëfyesve i harrojnë. Për një ritëm krejt tjetër, shoqëroje me ",
              { text: "një javë në Rivierën Shqiptare", articleSlug: "albanian-riviera-awakening" },
              ", ku i njëjti det mbërrin pa shekujt e famës.",
            ],
          },
          {
            type: "quote",
            text: "Sekreti i Bregdetit Amalfi është të duash më pak prej tij, dhe ta duash për më gjatë.",
            cite: "Një hotelier në Ravello",
          },
          {
            type: "paragraph",
            spans: [
              "Qëndro mjaftueshëm dhe bregdeti pushon së luajturi për ty. Kamarieri ta mban mend tavolinën. Granita e limonit mbërrin pa e kërkuar. Fillon të kuptosh pse dizajnerët e mëdhenj italianë — tema e ",
              { text: "studimit tonë mbi dizajnin e qetë të Milanos", articleSlug: "milan-quiet-design" },
              " — mbajnë shtëpi vere këtu dhe nuk i fotografojnë kurrë.",
            ],
          },
        ],
      },
    },
  },

  // 2 — hotels · europe -------------------------------------------------------
  {
    id: "a2",
    slug: "cap-eden-roc-riviera",
    category: "land",
    location: "europe",
    author: AUTHORS.marcus,
    date: "2026-05-20",
    tags: ["riviera", "grand hotel", "france", "sea"],
    relatedArticleIds: ["a8", "a9", "a14", "a1"],
    image: {
      src: u("photo-1551882547-ff40c63fe5fa"),
      alt: {
        en: "A Mediterranean grand hotel terrace with white parasols above the sea",
        sq: "Tarraca e një hoteli të madh mesdhetar me çadra të bardha mbi det",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "The Grand Hotel That Refuses to Hurry",
        subtitle:
          "On the Riviera, a century-old address proves that true luxury is the absence of urgency.",
        excerpt:
          "White parasols, a saltwater pool cut into the rock, and a service culture measured in decades rather than stars.",
        body: [
          {
            type: "paragraph",
            spans: [
              "The great hotels of the Riviera were built for a slower century, and the best of them have never apologised for it. You arrive through an avenue of parasol pines; you are not asked for a credit card at the door. The lobby smells of beeswax and cut stems.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "What you pay for here is restraint. No music by the pool. No branding on the towels. The cabanas have been assigned to the same families for three generations. It is the hospitality equivalent of ",
              { text: "the cave suites of Santorini", articleSlug: "santorini-cave-suites" },
              " — a room that knows exactly what to leave out.",
            ],
          },
          {
            type: "quote",
            text: "We do not add things for guests. We remove the things that would disturb them.",
            cite: "The general manager",
          },
        ],
      },
      sq: {
        title: "Hoteli i Madh që Nuk Pranon të Nxitojë",
        subtitle:
          "Në Riviera, një adresë shekullore dëshmon se luksi i vërtetë është mungesa e nxitimit.",
        excerpt:
          "Çadra të bardha, një pishinë me ujë deti e gdhendur në shkëmb dhe një kulturë shërbimi e matur me dekada, jo me yje.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Hotelet e mëdha të Rivierës u ndërtuan për një shekull më të ngadaltë dhe më të mirët mes tyre nuk janë kërkuar falje kurrë për këtë. Mbërrin përmes një rrugice me pisha çadër; nuk të kërkojnë kartë krediti te dera. Holli mban erë dylli bletësh dhe kërcell të prerë.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Ajo që paguan këtu është përmbajtja. Pa muzikë te pishina. Pa markë mbi peshqirë. Kabinat u janë caktuar të njëjtave familje për tre breza. Është ekuivalenti i mikpritjes me ",
              { text: "suitat-shpella të Santorinit", articleSlug: "santorini-cave-suites" },
              " — një dhomë që e di saktësisht çfarë të lërë jashtë.",
            ],
          },
          {
            type: "quote",
            text: "Ne nuk u shtojmë gjëra mysafirëve. Ne heqim gjërat që do t'i shqetësonin.",
            cite: "Drejtori i përgjithshëm",
          },
        ],
      },
    },
  },

  // 3 — dining · albania ------------------------------------------------------
  {
    id: "a3",
    slug: "tirana-new-table",
    category: "taste",
    location: "albania",
    author: AUTHORS.dardan,
    date: "2026-05-12",
    tags: ["tirana", "chefs", "albania", "new nordic of the balkans"],
    relatedArticleIds: ["a7", "a9", "a1"],
    image: {
      src: u("photo-1414235077428-338989a2e8c0"),
      alt: {
        en: "An intimate candlelit restaurant interior with warm wood and low lighting",
        sq: "Brendësi intime restoranti me dritë qiriu, dru të ngrohtë dhe ndriçim të ulët",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "Tirana Sets a New Table",
        subtitle:
          "A generation of Albanian chefs is turning mountain produce into a quietly radical cuisine.",
        excerpt:
          "Foraged greens, raw-milk cheeses and seventy-year-old olive oil — the Balkans' most exciting dining city is the one you weren't watching.",
        body: [
          {
            type: "paragraph",
            spans: [
              "For years the story of Albanian food was told in someone else's accent — Italian, Greek, Ottoman. The new Tirana kitchens are finally telling it in their own. The pantry is astonishing: alpine herbs, wild trout, cheeses from herds that never see a barn.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "The mood is confident rather than precious. You eat at a marble counter; the chef pours the wine. The same energy is reshaping the coast — see ",
              { text: "the awakening of the Albanian Riviera", articleSlug: "albanian-riviera-awakening" },
              " — and it rhymes with what is happening at ",
              { text: "the best new tables in Paris", articleSlug: "paris-tables-to-know" },
              ": less spectacle, more ingredient.",
            ],
          },
          {
            type: "quote",
            text: "We are not the next anywhere. We are the first Tirana.",
            cite: "A chef on the Blloku",
          },
        ],
      },
      sq: {
        title: "Tirana Shtron një Tryezë të Re",
        subtitle:
          "Një brez kuzhinierësh shqiptarë po e kthen prodhimin e malit në një kuzhinë qetësisht radikale.",
        excerpt:
          "Barishte të mbledhura, djathëra me qumësht të papërpunuar dhe vaj ulliri shtatëdhjetëvjeçar — qyteti më emocionues i Ballkanit për të ngrënë është ai që nuk po e vëzhgonit.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Për vite me radhë historia e ushqimit shqiptar u tregua me theksin e dikujt tjetër — italian, grek, osman. Kuzhinat e reja të Tiranës më në fund po e tregojnë me theksin e tyre. Qilari është mahnitës: barishte alpine, troftë e egër, djathëra nga tufa që nuk e shohin kurrë stallën.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Atmosfera është e sigurt, jo e çmuar. Ha te një banak mermeri; kuzhinieri të derdh verën. E njëjta energji po riformëson bregdetin — shih ",
              { text: "zgjimin e Rivierës Shqiptare", articleSlug: "albanian-riviera-awakening" },
              " — dhe rimon me atë që po ndodh te ",
              { text: "tryezat më të mira të reja në Paris", articleSlug: "paris-tables-to-know" },
              ": më pak spektakël, më shumë përbërës.",
            ],
          },
          {
            type: "quote",
            text: "Ne nuk jemi 'e ardhmja' e askund. Ne jemi Tirana e parë.",
            cite: "Një kuzhinier në Bllok",
          },
        ],
      },
    },
  },

  // 4 — design · italy --------------------------------------------------------
  {
    id: "a4",
    slug: "milan-quiet-design",
    category: "insights",
    location: "italy",
    author: AUTHORS.sofia,
    date: "2026-05-04",
    tags: ["milan", "interiors", "craft", "minimalism"],
    relatedArticleIds: ["a10", "a11", "a1"],
    image: {
      src: u("photo-1505691938895-1758d7feb511"),
      alt: {
        en: "A serene minimalist living room in warm neutrals with sculptural furniture",
        sq: "Një dhomë ndenjeje minimaliste e qetë në tone të ngrohta neutrale me mobilje skulpturore",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "Milan's Quiet Design Revolution",
        subtitle:
          "The city that gave us spectacle is now whispering — and the world is leaning in to listen.",
        excerpt:
          "Inside the studios where Italian design is trading gloss for grain, colour for shadow, and noise for an almost monastic calm.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Walk the courtyards off Via Tortona during design week and you notice what is missing: the shouting. The most talked-about rooms this year are nearly silent — lime plaster, raw travertine, a single chair placed like a sculpture in a chapel.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "This restraint is not poverty; it is confidence. It is the same instinct that animates ",
              { text: "the stone villas of the Cyclades", articleSlug: "cycladic-stone-villas" },
              " and the long Italian summers we wrote about in ",
              { text: "our Amalfi dispatch", articleSlug: "amalfi-coast-slow-summer" },
              ". Luxury, here, has learned to hold its tongue.",
            ],
          },
        ],
      },
      sq: {
        title: "Revolucioni i Qetë i Dizajnit në Milano",
        subtitle:
          "Qyteti që na dha spektaklin tani po pëshpërit — dhe bota po përkulet ta dëgjojë.",
        excerpt:
          "Brenda studiove ku dizajni italian po shkëmben shkëlqimin me teksturën, ngjyrën me hijen dhe zhurmën me një qetësi gati murgjore.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Ec nëpër oborret pranë Via Tortona gjatë javës së dizajnit dhe vëren atë që mungon: britmën. Dhomat më të përfolura këtë vit janë gati të heshtura — suva gëlqereje, travertin i papërpunuar, një karrige e vetme e vendosur si skulpturë në një kishëz.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Kjo përmbajtje nuk është varfëri; është siguri. Është i njëjti instinkt që gjallëron ",
              { text: "vilat prej guri të Kikladeve", articleSlug: "cycladic-stone-villas" },
              " dhe verat e gjata italiane për të cilat shkruam te ",
              { text: "reportazhi ynë nga Amalfi", articleSlug: "amalfi-coast-slow-summer" },
              ". Luksi, këtu, ka mësuar të mbajë gjuhën pas dhëmbëve.",
            ],
          },
        ],
      },
    },
  },

  // 5 — real-estate · greece --------------------------------------------------
  {
    id: "a5",
    slug: "cycladic-stone-villas",
    category: "people",
    location: "greece",
    author: AUTHORS.sofia,
    date: "2026-04-26",
    tags: ["cyclades", "architecture", "greece", "villas"],
    relatedArticleIds: ["a8", "a11", "a14"],
    image: {
      src: u("photo-1469796466635-455ede028aca"),
      alt: {
        en: "Whitewashed Cycladic architecture with smooth curved walls against a blue sky",
        sq: "Arkitekturë kikladike e lyer me të bardhë me mure të lakuara të lëmuara nën një qiell blu",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "The New Cycladic Houses Buyers Are Chasing",
        subtitle:
          "Hand-built stone, no straight lines, and a waiting list that stretches into the next decade.",
        excerpt:
          "A quiet boom in vernacular architecture is making the Cyclades the most coveted address in the Aegean — if you can find a mason.",
        body: [
          {
            type: "paragraph",
            spans: [
              "The most sought-after houses in the islands are also the most modest looking: low, white, hand-smoothed, indistinguishable at a glance from the fishermen's cottages they replaced. That is precisely the point. The market has tired of glass boxes.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Buyers now ask for lime, not concrete; for cisterns, not pools. The same sensibility runs through ",
              { text: "Milan's quiet design studios", articleSlug: "milan-quiet-design" },
              " and the cliff hotels of ",
              { text: "the Santorini caldera", articleSlug: "santorini-cave-suites" },
              ". Scarcity, here, is the architecture itself.",
            ],
          },
        ],
      },
      sq: {
        title: "Shtëpitë e Reja Kikladike që Blerësit po Ndjekin",
        subtitle:
          "Gur i punuar me dorë, asnjë vijë e drejtë dhe një listë pritjeje që shtrihet në dekadën tjetër.",
        excerpt:
          "Një bum i qetë i arkitekturës vernakulare po e bën Kikladën adresën më të lakmuar në Egje — nëse gjen një muratorë.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Shtëpitë më të kërkuara në ishuj janë edhe ato më modeste në pamje: të ulëta, të bardha, të lëmuara me dorë, të padallueshme në shikim të parë nga kasollet e peshkatarëve që zëvendësuan. Pikërisht kjo është poenta. Tregu është lodhur me kuti xhami.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Blerësit tani kërkojnë gëlqere, jo beton; sterna, jo pishina. E njëjta ndjeshmëri kalon nëpër ",
              { text: "studiot e qeta të dizajnit në Milano", articleSlug: "milan-quiet-design" },
              " dhe hotelet mbi shkëmb të ",
              { text: "kalderës së Santorinit", articleSlug: "santorini-cave-suites" },
              ". Mungesa, këtu, është vetë arkitektura.",
            ],
          },
        ],
      },
    },
  },

  // 6 — lifestyle · dubai -----------------------------------------------------
  {
    id: "a6",
    slug: "dubai-vertical-living",
    category: "water",
    location: "dubai",
    author: AUTHORS.lara,
    date: "2026-04-18",
    tags: ["dubai", "skyline", "wellness", "city"],
    relatedArticleIds: ["a12", "a13", "a2"],
    image: {
      src: u("photo-1512453979798-5ea266f8880c"),
      alt: {
        en: "Dubai's towers rising through golden evening haze",
        sq: "Kullat e Dubait që ngrihen përmes mjegullës së artë të mbrëmjes",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "Living Vertically: Dubai's Quiet Hours",
        subtitle:
          "Beyond the spectacle, a city is learning the rituals of slowness — at altitude.",
        excerpt:
          "Rooftop gardens, dawn swims at the eightieth floor, and a new generation choosing stillness over the skyline's roar.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Dubai is famous for its volume. Less reported is its quiet — the residents who treat the city as a vertical village, who swim at dawn before the heat, who keep herb gardens eighty floors above the desert.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "The new luxury here is private and slow. It looks a great deal like ",
              { text: "the desert wellness retreats", articleSlug: "desert-wellness-retreats" },
              " an hour out of town, and nothing at all like the city's old reputation.",
            ],
          },
        ],
      },
      sq: {
        title: "Të Jetosh Vertikalisht: Orët e Qeta të Dubait",
        subtitle:
          "Përtej spektaklit, një qytet po mëson ritualet e ngadalësisë — në lartësi.",
        excerpt:
          "Kopshte në çati, not në agim në katin e tetëdhjetë dhe një brez i ri që zgjedh qetësinë mbi gjëmimin e horizontit.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Dubai është i famshëm për volumin e tij. Më pak përmendet qetësia e tij — banorët që e trajtojnë qytetin si një fshat vertikal, që notojnë në agim para vapës, që mbajnë kopshte barishtesh tetëdhjetë kate mbi shkretëtirë.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Luksi i ri këtu është privat dhe i ngadaltë. Ngjan shumë me ",
              { text: "tërheqjet e mirëqenies në shkretëtirë", articleSlug: "desert-wellness-retreats" },
              " një orë jashtë qytetit, dhe aspak me reputacionin e vjetër të qytetit.",
            ],
          },
        ],
      },
    },
  },

  // 7 — travel · albania ------------------------------------------------------
  {
    id: "a7",
    slug: "albanian-riviera-awakening",
    category: "air",
    location: "albania",
    author: AUTHORS.marcus,
    date: "2026-04-09",
    tags: ["riviera", "albania", "coast", "ionian"],
    relatedArticleIds: ["a3", "a1", "a5"],
    image: {
      src: u("photo-1559128010-7c1ad6e1b6a5"),
      alt: {
        en: "A turquoise Ionian cove backed by olive-covered hills on the Albanian Riviera",
        sq: "Një gji jonian bruz i rrethuar nga kodra të mbuluara me ullinj në Rivierën Shqiptare",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "The Albanian Riviera Wakes Up",
        subtitle:
          "The last wild coast of the Mediterranean is having its moment — carefully.",
        excerpt:
          "Empty coves, hand-pressed oil, and a coastline that still belongs to its villages. A dispatch from the Ionian's best-kept secret.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Drive the Llogara pass at dawn and the whole Ionian opens beneath you: a coast of grey-green olive and impossible blue, still mercifully short of the cranes that flattened its neighbours. The Albanian Riviera knows what it has, and — for now — it is keeping it.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "The villages are the point. You eat what was caught that morning; the oil on the table was pressed in the hills behind you. It pairs naturally with ",
              { text: "the new energy in Tirana's kitchens", articleSlug: "tirana-new-table" },
              ", an hour and a world away.",
            ],
          },
          {
            type: "quote",
            text: "We are not trying to become the next Amalfi. We are trying to stay the first Himara.",
            cite: "A guesthouse owner in Himara",
          },
        ],
      },
      sq: {
        title: "Riviera Shqiptare Zgjohet",
        subtitle:
          "Bregdeti i fundit i egër i Mesdheut po e jeton çastin e vet — me kujdes.",
        excerpt:
          "Gjire bosh, vaj i shtrydhur me dorë dhe një vijë bregdetare që ende u përket fshatrave të saj. Një reportazh nga sekreti më i ruajtur i Jonit.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Ngjit qafën e Llogarasë në agim dhe i gjithë Joni hapet poshtë teje: një bregdet ulliri gri-jeshil dhe blu të pamundur, ende fatmirësisht pa vinçat që rrafshuan fqinjët. Riviera Shqiptare e di çfarë ka dhe — për tani — po e ruan.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Fshatrat janë thelbi. Ha atë që u kap atë mëngjes; vaji në tryezë u shtrydh në kodrat pas teje. Shoqërohet natyrshëm me ",
              { text: "energjinë e re në kuzhinat e Tiranës", articleSlug: "tirana-new-table" },
              ", një orë dhe një botë larg.",
            ],
          },
          {
            type: "quote",
            text: "Nuk po përpiqemi të bëhemi Amalfi tjetër. Po përpiqemi të mbetemi Himara e parë.",
            cite: "Pronar bujtine në Himarë",
          },
        ],
      },
    },
  },

  // 8 — hotels · greece -------------------------------------------------------
  {
    id: "a8",
    slug: "santorini-cave-suites",
    category: "land",
    location: "greece",
    author: AUTHORS.eleonora,
    date: "2026-03-30",
    tags: ["santorini", "caldera", "greece", "suites"],
    relatedArticleIds: ["a5", "a2", "a13"],
    image: {
      src: u("photo-1570077188670-e3a8d69ac5ff"),
      alt: {
        en: "Whitewashed cave suites carved into the Santorini caldera above the sea",
        sq: "Suita-shpella të lyera me të bardhë të gdhendura në kalderën e Santorinit mbi det",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "Santorini's Cave Suites, Without the Crowd",
        subtitle:
          "How a handful of small hotels reclaimed the caldera from the cruise-ship hour.",
        excerpt:
          "Carved into volcanic rock, lit by a single skylight, these rooms make a virtue of the island's oldest building trick.",
        body: [
          {
            type: "paragraph",
            spans: [
              "The cave house was never built for views; it was built for shade. The genius of the new caldera hotels is to remember that — to keep the thick cool walls and the single shaft of light, and simply open one side to the sea.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Go in the shoulder season, when the cruise ships thin and the island exhales. The same restraint defines ",
              { text: "the grand hotels of the Riviera", articleSlug: "cap-eden-roc-riviera" },
              " and the houses in ",
              { text: "our Cyclades property report", articleSlug: "cycladic-stone-villas" },
              ".",
            ],
          },
        ],
      },
      sq: {
        title: "Suitat-Shpella të Santorinit, pa Turmën",
        subtitle:
          "Si një grusht hotelesh të vegjël e morën kalderën nga ora e anijeve të lundrimit.",
        excerpt:
          "Të gdhendura në shkëmb vullkanik, të ndriçuara nga një dritare e vetme në çati, këto dhoma e kthejnë në virtyt mashtrimin më të vjetër ndërtimor të ishullit.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Shtëpia-shpellë nuk u ndërtua kurrë për pamjen; u ndërtua për hije. Gjenialiteti i hoteleve të reja të kalderës është ta kujtojnë këtë — të ruajnë muret e trasha të freskëta dhe rrezen e vetme të dritës, dhe thjesht të hapin njërën anë nga deti.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Shko në sezonin e ndërmjetëm, kur anijet rrallohen dhe ishulli merr frymë. E njëjta përmbajtje përcakton ",
              { text: "hotelet e mëdha të Rivierës", articleSlug: "cap-eden-roc-riviera" },
              " dhe shtëpitë te ",
              { text: "raporti ynë i pronave në Kiklade", articleSlug: "cycladic-stone-villas" },
              ".",
            ],
          },
        ],
      },
    },
  },

  // 9 — dining · europe -------------------------------------------------------
  {
    id: "a9",
    slug: "paris-tables-to-know",
    category: "taste",
    location: "europe",
    author: AUTHORS.dardan,
    date: "2026-03-21",
    tags: ["paris", "bistro", "france", "wine"],
    relatedArticleIds: ["a3", "a2", "a1"],
    image: {
      src: u("photo-1517248135467-4c7edcad34c4"),
      alt: {
        en: "A warm Parisian bistro with marble tables and a zinc bar",
        sq: "Një bistro pariziene e ngrohtë me tavolina mermeri dhe një banak zinku",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "The Paris Tables Worth Crossing Town For",
        subtitle:
          "The new bistros have dropped the white tablecloth and kept everything that mattered.",
        excerpt:
          "Natural wine, a single chalkboard menu, and cooking confident enough to be simple. Where Paris eats now.",
        body: [
          {
            type: "paragraph",
            spans: [
              "The white-tablecloth temple is not dead, but Paris has fallen back in love with the small room: twenty covers, an open kitchen, a menu that changes when the market does. The wine is natural, the bread is extraordinary, and nobody is performing.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "It is the same instinct driving ",
              { text: "Tirana's new table", articleSlug: "tirana-new-table" },
              ": trust the ingredient, lose the theatre. Pair dinner with a night at ",
              { text: "a Riviera grand hotel", articleSlug: "cap-eden-roc-riviera" },
              " and you have the whole arc of how Europe eats now.",
            ],
          },
        ],
      },
      sq: {
        title: "Tryezat e Parisit që ia Vlen ta Kalosh Qytetin",
        subtitle:
          "Bistrot e reja kanë hequr mbulesën e bardhë dhe kanë mbajtur gjithçka që kishte rëndësi.",
        excerpt:
          "Verë natyrale, një meny e vetme në dërrasë të zezë dhe gatim mjaftueshëm i sigurt për të qenë i thjeshtë. Ku ha Parisi tani.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Tempulli me mbulesë të bardhë nuk ka vdekur, por Parisi është rikthyer në dashuri me dhomën e vogël: njëzet vende, kuzhinë e hapur, një meny që ndryshon kur ndryshon tregu. Vera është natyrale, buka është e jashtëzakonshme dhe askush nuk po luan rol.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Është i njëjti instinkt që shtyn ",
              { text: "tryezën e re të Tiranës", articleSlug: "tirana-new-table" },
              ": beso përbërësin, hiq teatrin. Shoqëroje darkën me një natë te ",
              { text: "një hotel i madh i Rivierës", articleSlug: "cap-eden-roc-riviera" },
              " dhe ke të gjithë harkun se si ha Evropa sot.",
            ],
          },
        ],
      },
    },
  },

  // 10 — design · global ------------------------------------------------------
  {
    id: "a10",
    slug: "nordic-light-interiors",
    category: "insights",
    location: "global",
    author: AUTHORS.sofia,
    date: "2026-03-11",
    tags: ["nordic", "light", "interiors", "minimalism"],
    relatedArticleIds: ["a4", "a13", "a6"],
    image: {
      src: u("photo-1493809842364-78817add7ffb"),
      alt: {
        en: "A pale Scandinavian interior with timber, linen and soft northern light",
        sq: "Një brendësi e zbehtë skandinave me dru, liri dhe dritë të butë veriore",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "Chasing the Light: The New Nordic Interior",
        subtitle:
          "Designers from Oslo to Kyoto are building rooms around a single, fugitive ingredient.",
        excerpt:
          "Pale timber, deep sills, and a near-religious attention to how daylight moves across a wall from morning to dusk.",
        body: [
          {
            type: "paragraph",
            spans: [
              "In the far north, light is rationed, and so it is revered. The rooms that define this aesthetic are designed first for the sun's brief passage: deep windowsills, pale floors that bounce it, a palette that does nothing to compete.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "The idea has gone global. You feel its cousin in ",
              { text: "Milan's hushed studios", articleSlug: "milan-quiet-design" },
              " and even, improbably, eighty floors above the desert in ",
              { text: "Dubai's quiet hours", articleSlug: "dubai-vertical-living" },
              ".",
            ],
          },
        ],
      },
      sq: {
        title: "Në Ndjekje të Dritës: Brendësia e Re Nordike",
        subtitle:
          "Dizajnerë nga Oslo te Kioto po ndërtojnë dhoma rreth një përbërësi të vetëm, të rrëshqitshëm.",
        excerpt:
          "Dru i zbehtë, prag i thellë dhe një vëmendje gati fetare ndaj mënyrës si lëviz drita e ditës nëpër mur nga mëngjesi në muzg.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Në veriun e largët, drita është e racionuar, dhe prandaj nderohet. Dhomat që përcaktojnë këtë estetikë janë projektuar para së gjithash për kalimin e shkurtër të diellit: pragje të thella dritaresh, dysheme të zbehta që e pasqyrojnë, një paletë që nuk bën asgjë për të konkurruar.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Ideja është bërë globale. E ndjen kushëririn e saj te ",
              { text: "studiot e heshtura të Milanos", articleSlug: "milan-quiet-design" },
              " dhe madje, çuditërisht, tetëdhjetë kate mbi shkretëtirë te ",
              { text: "orët e qeta të Dubait", articleSlug: "dubai-vertical-living" },
              ".",
            ],
          },
        ],
      },
    },
  },

  // 11 — real-estate · italy --------------------------------------------------
  {
    id: "a11",
    slug: "lake-como-estates",
    category: "people",
    location: "italy",
    author: AUTHORS.eleonora,
    date: "2026-02-28",
    tags: ["lake como", "villas", "italy", "gardens"],
    relatedArticleIds: ["a1", "a5", "a14"],
    image: {
      src: u("photo-1516483638261-f4dbaf036963"),
      alt: {
        en: "A lakeside villa with cypress trees and terraced gardens above still water",
        sq: "Një vilë buzë liqenit me selvi dhe kopshte me tarraca mbi ujë të qetë",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "Why Lake Como's Old Villas Are Changing Hands",
        subtitle:
          "A generation of garden estates is passing to buyers who want the gardener, not just the gate.",
        excerpt:
          "On Como, the prize is no longer the house. It is two centuries of cypress, terrace and patient horticulture.",
        body: [
          {
            type: "paragraph",
            spans: [
              "The villas of Como were always about the gardens — the long allées, the lemon houses, the terraces stepping down to the water. What is changing is the buyer: a new owner who values the head gardener above the helipad, and who measures the estate in seasons rather than square metres.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "It is the property-market echo of a wider mood, the same one we traced through ",
              { text: "Milan's quiet design", articleSlug: "milan-quiet-design" },
              " and the slow summers of ",
              { text: "the Amalfi Coast", articleSlug: "amalfi-coast-slow-summer" },
              ".",
            ],
          },
        ],
      },
      sq: {
        title: "Pse Vilat e Vjetra të Liqenit Komo po Ndërrojnë Duar",
        subtitle:
          "Një brez pronash me kopshte po u kalon blerësve që duan kopshtarin, jo vetëm portën.",
        excerpt:
          "Te Komo, çmimi nuk është më shtëpia. Janë dy shekuj selvie, tarrace dhe kopshtari e durueshme.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Vilat e Komos kanë qenë gjithmonë për kopshtet — rrugicat e gjata, shtëpitë e limonit, tarracat që zbresin shkallë-shkallë drejt ujit. Ajo që po ndryshon është blerësi: një pronar i ri që e vlerëson kryekopshtarin mbi pistën e helikopterit, dhe që e mat pronën në stinë, jo në metra katrorë.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Është jehona në tregun e pronave e një atmosfere më të gjerë, e njëjta që gjurmuam përmes ",
              { text: "dizajnit të qetë të Milanos", articleSlug: "milan-quiet-design" },
              " dhe verave të ngadalta të ",
              { text: "Bregdetit Amalfi", articleSlug: "amalfi-coast-slow-summer" },
              ".",
            ],
          },
        ],
      },
    },
  },

  // 12 — lifestyle · dubai ----------------------------------------------------
  {
    id: "a12",
    slug: "desert-wellness-retreats",
    category: "water",
    location: "dubai",
    author: AUTHORS.lara,
    date: "2026-02-16",
    tags: ["wellness", "desert", "dubai", "retreat"],
    relatedArticleIds: ["a6", "a13", "a2"],
    image: {
      src: u("photo-1542401886-65d6c61db217"),
      alt: {
        en: "A minimalist desert retreat at dusk with low lamplight against the dunes",
        sq: "Një tërheqje minimaliste në shkretëtirë në muzg me dritë llambe të ulët përballë dunave",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "Silence for Sale: The Desert Wellness Boom",
        subtitle:
          "An hour from Dubai's towers, a new kind of retreat is selling the one thing the city can't: nothing.",
        excerpt:
          "No screens, no schedule, no skyline. Inside the desert camps trading spectacle for stars and sand.",
        body: [
          {
            type: "paragraph",
            spans: [
              "The dunes begin where the motorway ends, and so does the noise. The new desert retreats have understood that their guests are not buying treatments; they are buying the absence of stimulation — the silence, the cold night, the unreasonable number of stars.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "It is the natural counterweight to ",
              { text: "Dubai's vertical life", articleSlug: "dubai-vertical-living" },
              ", and a cousin to the ",
              { text: "private islands", articleSlug: "private-islands-global" },
              " buyers are chasing across the globe.",
            ],
          },
        ],
      },
      sq: {
        title: "Heshtje për Shitje: Bumi i Mirëqenies në Shkretëtirë",
        subtitle:
          "Një orë nga kullat e Dubait, një lloj i ri tërheqjeje po shet të vetmen gjë që qyteti s'e ka: asgjënë.",
        excerpt:
          "Pa ekrane, pa orar, pa horizont. Brenda kampeve të shkretëtirës që shkëmbejnë spektaklin me yje dhe rërë.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Dunat nisin aty ku mbaron autostrada, dhe po ashtu zhurma. Tërheqjet e reja të shkretëtirës e kanë kuptuar se mysafirët e tyre nuk po blejnë trajtime; po blejnë mungesën e stimulimit — heshtjen, natën e ftohtë, numrin e paarsyeshëm të yjeve.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Është kundërpesha natyrale e ",
              { text: "jetës vertikale të Dubait", articleSlug: "dubai-vertical-living" },
              ", dhe kushëririe e ",
              { text: "ishujve privatë", articleSlug: "private-islands-global" },
              " që blerësit po ndjekin anembanë globit.",
            ],
          },
        ],
      },
    },
  },

  // 13 — travel · global ------------------------------------------------------
  {
    id: "a13",
    slug: "private-islands-global",
    category: "air",
    location: "global",
    author: AUTHORS.marcus,
    date: "2026-02-02",
    tags: ["islands", "global", "remote", "sea"],
    relatedArticleIds: ["a1", "a10", "a6"],
    image: {
      src: u("photo-1505228395891-9a51e7e86bf6"),
      alt: {
        en: "A single sandy island ringed by turquoise shallows seen from above",
        sq: "Një ishull i vetëm me rërë i rrethuar nga cektina bruz, parë nga lart",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "The New Geography of the Private Island",
        subtitle:
          "Forget the tropics-only cliché. The most interesting islands now are cold, near, and quietly run.",
        excerpt:
          "From Scandinavian skerries to Aegean rocks, the private island is being reinvented for a generation that prizes proximity over palm trees.",
        body: [
          {
            type: "paragraph",
            spans: [
              "The private island used to mean one thing: equatorial, faraway, fringed with palms. The new map is stranger and closer to home — a Baltic skerry, a Croatian rock, a single Hebridean acre with a stone bothy and a boat.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "What unites them is not climate but quiet. They share a sensibility with ",
              { text: "the desert retreats outside Dubai", articleSlug: "desert-wellness-retreats" },
              " and the light-struck rooms of ",
              { text: "the new Nordic interior", articleSlug: "nordic-light-interiors" },
              ".",
            ],
          },
        ],
      },
      sq: {
        title: "Gjeografia e Re e Ishullit Privat",
        subtitle:
          "Harroje klishenë vetëm-tropikale. Ishujt më interesantë tani janë të ftohtë, afër dhe të drejtuar në heshtje.",
        excerpt:
          "Nga shkëmbinjtë skandinavë te shkëmbinjtë e Egjeut, ishulli privat po rishpiket për një brez që çmon afërsinë mbi palmat.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Ishulli privat dikur kishte një kuptim: ekuatorial, i largët, i rrethuar me palma. Harta e re është më e çuditshme dhe më pranë shtëpisë — një shkëmb baltik, një shkëmb kroat, një aker i vetëm hebridian me një kasolle guri dhe një barkë.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Ajo që i bashkon nuk është klima por qetësia. Ndajnë një ndjeshmëri me ",
              { text: "tërheqjet e shkretëtirës jashtë Dubait", articleSlug: "desert-wellness-retreats" },
              " dhe dhomat e mbushura me dritë të ",
              { text: "brendësisë së re nordike", articleSlug: "nordic-light-interiors" },
              ".",
            ],
          },
        ],
      },
    },
  },

  // 14 — real-estate · europe -------------------------------------------------
  {
    id: "a14",
    slug: "london-garden-townhouses",
    category: "people",
    location: "europe",
    author: AUTHORS.eleonora,
    date: "2026-01-22",
    tags: ["london", "townhouse", "garden", "europe"],
    relatedArticleIds: ["a11", "a2", "a5"],
    image: {
      src: u("photo-1600585154340-be6161a56a0c"),
      alt: {
        en: "An elegant white stucco London townhouse facade with tall sash windows",
        sq: "Një fasadë elegante shtëpie qyteti londineze me suva të bardhë dhe dritare të larta",
      },
      credit: "Unsplash",
    },
    i18n: {
      en: {
        title: "London's Garden Townhouses Have a Secret",
        subtitle:
          "Behind the stucco facades, the real estate is horizontal — and green.",
        excerpt:
          "The most valuable square metres in the capital are the ones nobody sees from the street: the communal gardens behind the terraces.",
        body: [
          {
            type: "paragraph",
            spans: [
              "London sells itself on its facades, but its secret is behind them: the great communal gardens, locked and leafy, that a row of townhouses shares like a private park. A key to one of these is worth more than any number of reception rooms.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "It is the urban relative of the impulse driving ",
              { text: "Lake Como's garden estates", articleSlug: "lake-como-estates" },
              " and the vernacular houses of ",
              { text: "the Cyclades", articleSlug: "cycladic-stone-villas" },
              ": buy the planting, not just the plot.",
            ],
          },
        ],
      },
      sq: {
        title: "Shtëpitë e Qytetit me Kopsht në Londër Kanë një Sekret",
        subtitle:
          "Pas fasadave prej suvaje, prona e vërtetë është horizontale — dhe e gjelbër.",
        excerpt:
          "Metrat katrorë më të vlefshëm në kryeqytet janë ata që askush nuk i sheh nga rruga: kopshtet e përbashkëta pas rreshtave të shtëpive.",
        body: [
          {
            type: "paragraph",
            spans: [
              "Londra shitet me fasadat e saj, por sekreti i saj është pas tyre: kopshtet e mëdha të përbashkëta, të kyçura dhe me gjethe, që një rresht shtëpish e ndan si një park privat. Një çelës i njërit prej tyre vlen më shumë se çdo numër sallonesh.",
            ],
          },
          {
            type: "paragraph",
            spans: [
              "Është i afërmi urban i impulsit që shtyn ",
              { text: "pronat me kopshte të Liqenit Komo", articleSlug: "lake-como-estates" },
              " dhe shtëpitë vernakulare të ",
              { text: "Kikladeve", articleSlug: "cycladic-stone-villas" },
              ": bli mbjelljen, jo vetëm truallin.",
            ],
          },
        ],
      },
    },
  },
];
