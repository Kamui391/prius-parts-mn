import { t } from "../core/i18n.js";
import { filters, resetFilters, writeFiltersToUrl } from "./searchState.js";
import { getPartName } from "./partGetters.js";
import { searchParts, countByCategory } from "../services/partService.js";
import { getImageUrls } from "../services/imageService.js";
import { renderResults, renderEmpty } from "../components/partResults.js";
import { syncSearchName } from "../components/searchNameSidebar.js";
import { syncCategoryList } from "../components/categoryListSidebar.js";
import { syncSearchSettings } from "../components/searchSettingsSidebar.js";
import { openImageModal } from "../components/imageModal.js";

// Хоосон бол null, эс бөгөөс сөрөг биш тоо
const toNumberOrNull = (value) => (value === "" ? null : Math.max(0, Number(value)) || null);

// Хэрэглэгч бичиж дуустал 200мс хүлээнэ (товч бүрт дахин тооцоолохгүй)
function debounce(callback, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

export function initPartsSearch(root, { parts, supplierMap, imageMap }) {
  const resultsElement = root.querySelector("#partResults");
  const countElement = root.querySelector("#resultCount");

  // filters өөрчлөгдөх бүрд дуудагдаж, дэлгэцийг шинэчилнэ
  function update() {
    const results = searchParts(parts, filters);

    resultsElement.innerHTML =
      results.length > 0 ? renderResults(results, { supplierMap, imageMap }) : renderEmpty();
    countElement.textContent = `${results.length} ${t("results.count")}`;

    syncSearchName(filters);
    syncCategoryList(filters, countByCategory(parts, filters));
    syncSearchSettings(filters);
    writeFiltersToUrl();
  }

  // Нэг товшилт: сонгогдсон бол болиулж, үгүй бол сонгоно
  const toggle = (key, value) => {
    filters[key] = filters[key] === value ? null : value;
  };

  // Бүх товчийг нэг газраас (event delegation) удирдана
  root.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;

    const { action, value } = target.dataset;

    if (action === "generation") toggle("generation", value);
    else if (action === "category") toggle("category", value);
    else if (action === "condition") filters.condition = value;
    else if (action === "reset") resetFilters();
    else if (action === "open-gallery") {
      const part = parts.find((item) => item.id === Number(target.dataset.partId));
      openImageModal({ title: getPartName(part), urls: getImageUrls(imageMap, part.id) });
      return;
    }
    else return;

    update();
  });

  root.querySelector("#partQuery").addEventListener(
    "input",
    debounce((event) => {
      filters.query = event.target.value;
      update();
    }),
  );

  ["minPrice", "maxPrice"].forEach((key) => {
    root.querySelector(`#${key}`).addEventListener(
      "input",
      debounce((event) => {
        filters[key] = toNumberOrNull(event.target.value);
        update();
      }, 300),
    );
  });

  root.querySelector("#sortSelect").addEventListener("change", (event) => {
    filters.sort = event.target.value;
    update();
  });

  update();
}