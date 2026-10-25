import { getLanguage } from "../core/i18n.js";

// Одоогийн хэлний талбарыг сонгоно: nameMn эсвэл nameEn. Байхгүй бол Монгол хэлийг ашиглана.
function localized(item, field) {
  const suffix = getLanguage() === "en" ? "En" : "Mn";
  return item[`${field}${suffix}`] ?? item[`${field}Mn`];
}

export const getPartName = (part) => localized(part, "name");
export const getSupplierName = (supplier) => localized(supplier, "name");

// Үнийн саналуудыг хямдаас нь эхлүүлж эрэмбэлнэ
export const sortOffers = (offers) => [...offers].sort((a, b) => a.priceMnt - b.priceMnt);

export const getMinPrice = (part) => Math.min(...part.offers.map((offer) => offer.priceMnt));
export const getMaxPrice = (part) => Math.max(...part.offers.map((offer) => offer.priceMnt));