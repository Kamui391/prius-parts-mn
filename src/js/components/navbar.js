import { t, toggleLanguage } from "../core/i18n.js";
import { getTheme, toggleTheme } from "../core/theme.js";

// Цэсийн зүйлсийг нэг массивт хадгална. Цэс нэмэх бол нэг мөр нэмэхэд хангалттай.
const navItems = [
  { route: "#/home", icon: "fa-house", key: "nav.home" },
  { route: "#/parts", icon: "fa-screwdriver-wrench", key: "nav.parts" },
  { route: "#/calculator", icon: "fa-calculator", key: "nav.calculator" },
  { route: "#/suppliers", icon: "fa-store", key: "nav.suppliers" },
  { route: "#/contact", icon: "fa-envelope", key: "nav.contact" },
];

let navbarRoot = null;

function renderNavbar() {
  const links = navItems
    .map(
      (item) => `
        <a class="navbar-item app-nav-link" href="${item.route}" data-route="${item.route}">
          <i class="fas ${item.icon}"></i>
          <span>${t(item.key)}</span>
        </a>`,
    )
    .join("");

  const themeIcon = getTheme() === "dark" ? "fa-sun" : "fa-moon";

  return `
    <header class="app-header">
      <nav class="navbar app-navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item app-brand" href="#/home">
              <img src="./img/logo.svg" alt="" width="38" height="38" />
              <span class="app-brand__text">
                <strong>${t("brand.name")}</strong>
                <small>${t("brand.tagline")}</small>
              </span>
            </a>
            <a class="navbar-burger" role="button" aria-label="menu" aria-expanded="false" data-target="topNavbar">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div class="navbar-menu" id="topNavbar">
            <div class="navbar-start app-nav-center">${links}</div>
            <div class="navbar-end">
              <div class="navbar-item app-nav-tools">
                <button class="app-icon-btn" id="themeToggle" type="button" aria-label="${t("nav.theme")}">
                  <i class="fas ${themeIcon}"></i>
                </button>
                <button class="app-icon-btn is-text" id="languageToggle" type="button" aria-label="${t("nav.language")}">
                  ${t("nav.languageShort")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
}

// Идэвхтэй хуудасны цэсийг тодруулж, гар утасны цэсийг хаана.
function highlightActiveLink() {
  const current = window.location.hash.split("?")[0] || "#/home";

  document.querySelectorAll(".app-nav-link").forEach((link) => {
    const active = link.dataset.route === current;
    link.classList.toggle("is-active", active);

    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  document.querySelector(".navbar-burger")?.classList.remove("is-active");
  document.getElementById("topNavbar")?.classList.remove("is-active");
}

function bindNavbar(root) {
  const burger = root.querySelector(".navbar-burger");
  const menu = root.querySelector("#topNavbar");

  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("is-active");
    menu.classList.toggle("is-active", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  root.querySelector("#themeToggle").addEventListener("click", toggleTheme);
  root.querySelector("#languageToggle").addEventListener("click", toggleLanguage);
}

export function mountNavbar(root) {
  navbarRoot = root;
  root.innerHTML = renderNavbar();
  bindNavbar(root);
  highlightActiveLink();
}

// Хэл эсвэл харагдац солигдоход navbar өөрийгөө дахин зурна.
function remount() {
  if (navbarRoot) mountNavbar(navbarRoot);
}

window.addEventListener("hashchange", highlightActiveLink);
window.addEventListener("languagechange", remount);
window.addEventListener("themechange", remount);