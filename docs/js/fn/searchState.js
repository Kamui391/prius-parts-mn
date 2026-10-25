import { defaultFilters } from "../services/partService.js";

// Хайлтын одоогийн төлөв. Модуль дотор хадгалагдах тул хуудас дахин зурагдахад ч алдагдахгүй.
export const filters = { ...defaultFilters };

// URL-ийн query нэр -> filters-ийн түлхүүр.  Жишээ: #/parts?q=шүүлтүүр&gen=gen3&cat=engine
const PARAMS = {
  q: "query",
  gen: "generation",
  cat: "category",
  cond: "condition",
  min: "minPrice",
  max: "maxPrice",
  sort: "sort",
};
const NUMBER_KEYS = ["minPrice", "maxPrice"];
const CONDITIONS = ["any", "new", "used"];
const SORTS = ["name", "price-asc", "price-desc"];

// "#/parts?cat=battery" -> filters.category = "battery"
export function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  Object.assign(filters, defaultFilters);

  for (const [param, key] of Object.entries(PARAMS)) {
    const value = params.get(param);
    if (value === null || value === "") continue;

    filters[key] = NUMBER_KEYS.includes(key) ? Number(value) || null : value;
  }

  // URL-ийг гараар засаж буруу утга оруулсан тохиолдолд default руу буцаана
  if (!CONDITIONS.includes(filters.condition)) filters.condition = defaultFilters.condition;
  if (!SORTS.includes(filters.sort)) filters.sort = defaultFilters.sort;
}

// filters -> "#/parts?cat=battery". Default утгатай шүүлтүүрийг URL-д оруулахгүй.
export function writeFiltersToUrl() {
  const params = new URLSearchParams();

  for (const [param, key] of Object.entries(PARAMS)) {
    if (filters[key] !== defaultFilters[key]) params.set(param, filters[key]);
  }

  const query = params.toString();
  // replaceState нь hashchange event үүсгэдэггүй тул хуудас дахин зурагдахгүй
  history.replaceState(null, "", `#/parts${query ? `?${query}` : ""}`);
}

export function resetFilters() {
  Object.assign(filters, defaultFilters);
}