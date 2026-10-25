import { t } from "../core/i18n.js";
import { formatDate } from "../core/format.js";
import { mountPage, renderHero, renderSection } from "../layouts/pageLayout.js";
import { renderSidebarPageLayout, bindSidebarToggle } from "../layouts/sidebarPageLayout.js";
import { renderSearchNameSidebar } from "../components/searchNameSidebar.js";
import { renderCategoryListSidebar } from "../components/categoryListSidebar.js";
import { renderSearchSettingsSidebar } from "../components/searchSettingsSidebar.js";
import { loadParts, loadMeta, getPriceBounds } from "../services/partService.js";
import { loadSupplierMap } from "../services/supplierService.js";
import { loadImageMap } from "../services/imageService.js";
import { readFiltersFromUrl } from "../fn/searchState.js";
import { initPartsSearch } from "../fn/searchEvents.js";

// Өгөгдөл ачаалж дуустал хэрэглэгч өөр хуудас руу шилжиж магадгүй. Хуучин хүсэлтийн үр дүн
// шинэ хуудсыг дарж бичихгүйн тулд render бүрийг дугаарлаж, хамгийн сүүлийнхийг л зурна.
let renderId = 0;

function renderHeader() {
  return renderHero({ compact: true, title: t("parts.title"), text: t("parts.text") });
}

function renderLoading() {
  mountPage(
    `${renderHeader()}${renderSection({ content: `<p class="app-loading">${t("results.loading")}</p>` })}`,
    "page-parts",
  );
}

function renderError() {
  mountPage(
    `${renderHeader()}${renderSection({
      content: `
        <div class="app-empty">
          <i class="fas fa-triangle-exclamation"></i>
          <h3>${t("results.error")}</h3>
          <button type="button" id="retry" class="button app-btn app-btn--solid mt-4">${t("results.retry")}</button>
        </div>`,
    })}`,
    "page-parts",
  );
  document.getElementById("retry").addEventListener("click", renderPartsPage);
}

export async function renderPartsPage() {
  const id = ++renderId;
  readFiltersFromUrl();
  renderLoading();

  try {
    const [parts, meta, supplierMap, imageMap] = await Promise.all([
      loadParts(),
      loadMeta(),
      loadSupplierMap(),
      loadImageMap(),
    ]);

    // Өөр хуудас руу шилжсэн эсвэл шинэ render эхэлсэн бол зогсооно
    if (id !== renderId || !window.location.hash.startsWith("#/parts")) return;

    const updated = formatDate(meta.updated);

    const notice = meta.demo
      ? `<div class="container">
           <p class="app-notice">
             <i class="fas fa-circle-info"></i>
             <span>${t("results.demoNotice")} ${t("results.updated")}: ${updated}</span>
           </p>
         </div>`
      : "";

    mountPage(
      `
      ${renderHeader()}
      ${notice}
      ${renderSidebarPageLayout({
        sidebar:
          renderSearchNameSidebar() +
          renderCategoryListSidebar() +
          renderSearchSettingsSidebar(getPriceBounds(parts)),
        toolbar: `
          <div class="app-toolbar">
            <button type="button" id="sidebarOpen" class="button app-btn app-btn--solid is-hidden-desktop">
              <i class="fas fa-sliders"></i>&nbsp;${t("filters.open")}
            </button>
            <p id="resultCount" class="app-toolbar__count" aria-live="polite"></p>
          </div>`,
        content: `<div id="partResults"></div>`,
      })}
      `,
      "page-parts",
    );

    bindSidebarToggle();
    initPartsSearch(document.getElementById("page-parts"), { parts, supplierMap, imageMap });
  } catch (error) {
    if (id !== renderId) return;
    console.error(error);
    renderError();
  }
}