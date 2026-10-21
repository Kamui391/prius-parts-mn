import { t } from "../core/i18n.js";
import { mountPage, renderHero, renderSection } from "../layouts/pageLayout.js";

export function renderSuppliersPage() {
  const types = [
    { icon: "fa-store", title: t("suppliers.t1Title"), text: t("suppliers.t1Text") },
    { icon: "fa-screwdriver-wrench", title: t("suppliers.t2Title"), text: t("suppliers.t2Text") },
    { icon: "fa-box-open", title: t("suppliers.t3Title"), text: t("suppliers.t3Text") },
  ];

  const cards = types
    .map(
      (item) => `
        <article class="app-card">
          <span class="app-card__icon"><i class="fas ${item.icon}"></i></span>
          <h3 class="app-card__title">${item.title}</h3>
          <p class="app-card__text">${item.text}</p>
        </article>`,
    )
    .join("");

  mountPage(
    `
    ${renderHero({ compact: true, title: t("suppliers.title"), text: t("suppliers.text") })}
    ${renderSection({ content: `<div class="app-grid">${cards}</div>` })}
    ${renderSection({
      content: `
        <div class="app-cta">
          <div>
            <h2>${t("suppliers.ctaTitle")}</h2>
            <p>${t("suppliers.ctaText")}</p>
          </div>
          <a class="button app-btn app-btn--accent" href="#/contact">${t("suppliers.ctaButton")}</a>
        </div>`,
    })}
    `,
    "page-suppliers",
  );
}