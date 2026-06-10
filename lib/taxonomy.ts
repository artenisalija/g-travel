import type { Category, Location } from "@/lib/types";

// Display order for homepage rails and navigation. Kept dependency-free so it
// can be imported into client components without bundling the article data.
export const CATEGORY_ORDER: Category[] = [
  "air",
  "land",
  "water",
  "taste",
  "people",
  "insights",
];

export const LOCATION_ORDER: Location[] = [
  "europe",
  "albania",
  "italy",
  "greece",
  "dubai",
  "global",
];
