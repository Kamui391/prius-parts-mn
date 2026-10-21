import { t } from "../core/i18n.js";
import { mountPage, renderHero, renderSection } from "../layouts/pageLayout.js";

const ISSUES_URL = "https://github.com/Kamui391/prius-parts-mn/issues/new";

export function renderContactPage() {
  const items = [
    t("contact.c2Item1"),
    t("contact.c2Item2"),
    t("contact.c2Item3"),
    t("contact.c2Item4"),
  ]
    .map((text) => `<li><i class="fas fa-check"></i><span>${text}</span></li>`)
    .join("");

  mountPage(
    `
    ${renderHero({ compact: true, title: t("contact.title"), text: t("contact.text") })}
    ${renderSection({
      content: `
        <div class="app-grid">
          <article class="app-card">
            <span class="app-card__icon"><i class="fab fa-github"></i></span>
            <h3 class="app-card__title">${t("contact.c1Title")}</h3>
            <p class="app-card__text">${t("contact.c1Text")}</p>
            <a class="button app-btn app-btn--solid mt-4" href="${ISSUES_URL}" target="_blank" rel="noopener">
              ${t("contact.c1Button")}
            </a>
          </article>
          <article class="app-card">
            <span class="app-card__icon"><i class="fas fa-tags"></i></span>
            <h3 class="app-card__title">${t("contact.c2Title")}</h3>
            <ul class="app-list">${items}</ul>
          </article>
        </div>`,
    })}
    `,
    "page-contact",
  );
}