import { DATA_URLS } from "../config.js";
import { fetchJson, once } from "../fn/http.js";
import { getPartName, sortOffers } from "../fn/partGetters.js";
import { getLanguage } from "../core/i18n.js";

const loadData = once(() => fetchJson(DATA_URLS.parts));

export async function loadParts() {
  return (await loadData()).parts;
}

export async function loadMeta() {
  return (await loadData()).meta;
}

export const defaultFilters = {
  query: "",
  generation: null,
  category: null,
  condition: "any", // any | new | used
  minPrice: null,
  maxPrice: null,
  sort: "name", // name | price-asc | price-desc
};

function matchesQuery(part, query) {
  const text = query.trim().toLowerCase();
  if (!text) return true;

  const haystack = [part.nameMn, part.nameEn, part.partNumber].join(" ").toLowerCase();
  return haystack.includes(text);
}

// Эд ангийн үнийн саналуудаас шүүлтүүрт таарсныг (хямдаас нь эхлүүлэн) буцаана
function getMatchingOffers(part, filters) {
  const offers = part.offers.filter((offer) => {
    if (filters.condition !== "any" && offer.condition !== filters.condition) return false;
    if (filters.minPrice !== null && offer.priceMnt < filters.minPrice) return false;
    if (filters.maxPrice !== null && offer.priceMnt > filters.maxPrice) return false;
    return true;
  });
  return sortOffers(offers);
}

// Шүүлтүүрт таарсан эд ангиудыг [{ part, offers }] хэлбэрээр буцаана.
// ignore: тоолол хийхдээ нэг шүүлтүүрийг түр орхих (жишээ нь ["category"]).
export function filterParts(parts, filters, ignore = []) {
  const results = [];

  for (const part of parts) {
    if (!ignore.includes("query") && !matchesQuery(part, filters.query)) continue;

    if (!ignore.includes("generation") && filters.generation) {
      if (!part.generations.includes(filters.generation)) continue;
    }
    if (!ignore.includes("category") && filters.category) {
      if (part.category !== filters.category) continue;
    }

    const offers = getMatchingOffers(part, filters);
    if (offers.length > 0) results.push({ part, offers });
  }

  return results;
}

const currentLocale = () => getLanguage();

const sorters = {
  name: (a, b) => getPartName(a.part).localeCompare(getPartName(b.part), currentLocale()),
  "price-asc": (a, b) => a.offers[0].priceMnt - b.offers[0].priceMnt,
  "price-desc": (a, b) => b.offers[0].priceMnt - a.offers[0].priceMnt,
};

export function searchParts(parts, filters) {
  return filterParts(parts, filters).sort(sorters[filters.sort] ?? sorters.name);
}

// Ангилал бүрд хэдэн эд анги таарахыг тоолно (category шүүлтүүрийг үл харгалзан)
export function countByCategory(parts, filters) {
  const counts = {};

  for (const { part } of filterParts(parts, filters, ["category"])) {
    counts[part.category] = (counts[part.category] ?? 0) + 1;
  }
  return counts;
}

// Бүх үнийн саналын хамгийн бага, их үнэ (үнийн шүүлтүүрийн placeholder-д)
export function getPriceBounds(parts) {
  const prices = parts.flatMap((part) => part.offers.map((offer) => offer.priceMnt));
  return { min: Math.min(...prices), max: Math.max(...prices) };
}