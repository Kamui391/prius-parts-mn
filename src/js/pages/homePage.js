import { t } from "../core/i18n.js";
import { categories, generations } from "../data/catalog.js";
import { mountPage, renderHero, renderSection } from "../layouts/pageLayout.js";

// Нүүр хуудаснаас хайлтын хуудас руу шүүлтүүртэй нь холбоно: #/parts?cat=battery
const categoryLink = (item) => `#/parts?cat=${item.id}`;
const generationLink = (item) => `#/parts?gen=${item.id}`;

export function renderHomePage() {
  const features = [
    { icon: "fa-scale-balanced", title: t("home.f1Title"), text: t("home.f1Text") },
    { icon: "fa-calculator", title: t("home.f2Title"), text: t("home.f2Text") },
    { icon: "fa-shield-halved", title: t("home.f3Title"), text: t("home.f3Text") },
  ];

  const featureCards = features
    .map(
      (item) => `
        <article class="app-card">
          <span class="app-card__icon"><i class="fas ${item.icon}"></i></span>
          <h3 class="app-card__title">${item.title}</h3>
          <p class="app-card__text">${item.text}</p>
        </article>`,
    )
    .join("");

  const categoryTiles = categories
    .map(
      (item) => `
        <a class="app-tile" href="${categoryLink(item)}">
          <i class="fas ${item.icon}"></i>
          <span>${t(item.key)}</span>
        </a>`,
    )
    .join("");

  const generationCards = generations
    .map(
      (item) => `
        <a class="app-gen" href="${generationLink(item)}">
          <strong>${item.name}</strong>
          <span>${item.years}</span>
        </a>`,
    )
    .join("");

  mountPage(
    `
    ${renderHero({
      eyebrow: t("home.eyebrow"),
      title: t("home.title"),
      text: t("home.text"),
      actions: `
        <a class="button app-btn app-btn--accent" href="#/parts">${t("home.ctaPrimary")}</a>
        <a class="button app-btn app-btn--ghost" href="#/calculator">${t("home.ctaSecondary")}</a>`,
    })}
    ${renderSection({
      title: t("home.featuresTitle"),
      text: t("home.featuresText"),
      content: `<div class="app-grid">${featureCards}</div>`,
    })}
    ${renderSection({
      alt: true,
      title: t("home.categoriesTitle"),
      text: t("home.categoriesText"),
      content: `<div class="app-grid is-tight">${categoryTiles}</div>`,
    })}
    ${renderSection({
      title: t("home.generationsTitle"),
      text: t("home.generationsText"),
      content: `<div class="app-grid is-tight">${generationCards}</div>`,
    })}
    ${renderSection({
      content: `
        <div class="app-cta">
          <div>
            <h2>${t("home.ctaTitle")}</h2>
            <p>${t("home.ctaText")}</p>
          </div>
          <a class="button app-btn app-btn--accent" href="#/suppliers">${t("home.ctaButton")}</a>
        </div>`,
    })}
    `,
    "page-home",
  );
}