import mn from "../locales/mn.js";
import en from "../locales/en.js";

const dictionaries = { mn, en };
const DEFAULT_LANGUAGE = "mn";

export function getLanguage() {
  const saved = localStorage.getItem("language");
  return saved in dictionaries ? saved : DEFAULT_LANGUAGE;
}

export function setLanguage(language) {
  if (!(language in dictionaries)) return;

  localStorage.setItem("language", language);
  document.documentElement.lang = language;

  // Navbar, footer, router зэрэг хэсгүүд энэ event-ийг сонсож өөрсдийгөө шинэчилнэ
  window.dispatchEvent(new CustomEvent("languagechange", { detail: language }));
}

export function toggleLanguage() {
  setLanguage(getLanguage() === "mn" ? "en" : "mn");
}

// t("nav.home") -> dictionaries[хэл].nav.home
export function t(path) {
  const dictionary = dictionaries[getLanguage()];
  const value = path.split(".").reduce((node, key) => node?.[key], dictionary);
  return value ?? path;
}