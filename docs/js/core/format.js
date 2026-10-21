import { getLanguage } from "./i18n.js";

// 1250000 -> "1 250 000 ₮" (mn) эсвэл "1,250,000 ₮" (en)
export function formatMoney(value) {
  const locale = getLanguage() === "mn" ? "mn-MN" : "en-US";
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
  return `${number} ₮`;
}