import { DATA_URLS, IMAGE_BASE } from "../config.js";
import { fetchJson, once } from "../fn/http.js";

// images.json байхгүй бол зураггүй гэж үзнэ (сайт эвдрэхгүй)
export const loadImageMap = once(() => fetchJson(DATA_URLS.images).catch(() => ({})));

// { "1": ["1-1.svg", "1-2.svg"] } -> ["./img/parts/1-1.svg", "./img/parts/1-2.svg"]
export function getImageUrls(imageMap, partId) {
  return (imageMap[partId] ?? []).map((file) => `${IMAGE_BASE}${file}`);
}