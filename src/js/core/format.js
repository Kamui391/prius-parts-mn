import { getLanguage } from "./i18n.js";

const currentLocale = () => (getLanguage() === "mn" ? "mn-MN" : "en-US");

// 1250000 -> "1,250,000 ₮"
export function formatMoney(value) {
  const number = new Intl.NumberFormat(currentLocale(), { maximumFractionDigits: 0 }).format(value);
  return `${number} ₮`;
}

// "2026-10-22" -> тухайн хэлний форматаар (жишээ нь "Oct 22, 2026")
export function formatDate(isoDate) {
  return new Intl.DateTimeFormat(currentLocale(), { dateStyle: "medium" }).format(new Date(isoDate));
}