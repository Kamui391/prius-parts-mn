import { t } from "./i18n.js";

export function initRouter(routes) {
  function renderRoute({ resetScroll = true } = {}) {
    // "#/parts?gen=gen3" гэх мэт query хэсгийг хасаж зөвхөн замыг авна
    const hash = window.location.hash.split("?")[0] || "#/home";
    const route = routes[hash] ?? routes["#/404"];

    document.title = `${t(route.titleKey)} · Prius Parts`;
    route.render();

    if (resetScroll) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  // Хуудас анх ачаалагдахад
  window.addEventListener("load", renderRoute);

  // URL-ийн # хэсэг өөрчлөгдөх бүрд
  window.addEventListener("hashchange", renderRoute);

  // Хэл солигдоход хуудсыг байрлалаас нь салгахгүйгээр дахин зурна
  window.addEventListener("languagechange", () => renderRoute({ resetScroll: false }));
}