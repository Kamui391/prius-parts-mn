import { t } from "../core/i18n.js";
import { mountPage, renderSection } from "../layouts/pageLayout.js";

export function renderNotFoundPage() {
  mountPage(
    renderSection({
      content: `
        <div class="app-404">
          <p class="app-404__code">${t("notFound.title")}</p>
          <p class="app-card__text mb-5">${t("notFound.text")}</p>
          <a class="button app-btn app-btn--solid" href="#/home">${t("notFound.button")}</a>
        </div>`,
    }),
    "page-404",
  );
}