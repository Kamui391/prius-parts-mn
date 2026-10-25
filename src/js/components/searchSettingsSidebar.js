import { t } from "../core/i18n.js";

const CONDITIONS = [
  ["any", "filters.conditionAny"],
  ["new", "filters.conditionNew"],
  ["used", "filters.conditionUsed"],
];

const SORTS = [
  ["name", "filters.sortName"],
  ["price-asc", "filters.sortPriceAsc"],
  ["price-desc", "filters.sortPriceDesc"],
];

export function renderSearchSettingsSidebar(bounds) {
  const conditionButtons = CONDITIONS.map(
    ([value, key]) => `<button type="button" data-action="condition" data-value="${value}">${t(key)}</button>`,
  ).join("");

  const sortOptions = SORTS.map(([value, key]) => `<option value="${value}">${t(key)}</option>`).join("");

  return `
    <section class="app-filter">
      <h3 class="app-filter__title">${t("filters.condition")}</h3>
      <div class="app-segment">${conditionButtons}</div>
    </section>
    <section class="app-filter">
      <h3 class="app-filter__title">${t("filters.price")}</h3>
      <div class="app-price-row">
        <input id="minPrice" class="input app-input" type="number" min="0" step="1000" inputmode="numeric"
               placeholder="${bounds.min}" aria-label="${t("filters.min")}" />
        <span>–</span>
        <input id="maxPrice" class="input app-input" type="number" min="0" step="1000" inputmode="numeric"
               placeholder="${bounds.max}" aria-label="${t("filters.max")}" />
      </div>
    </section>
    <section class="app-filter">
      <label class="app-filter__title" for="sortSelect">${t("filters.sort")}</label>
      <div class="select is-fullwidth">
        <select id="sortSelect">${sortOptions}</select>
      </div>
    </section>
    <button type="button" class="button app-btn app-btn--solid is-fullwidth mt-5" data-action="reset">
      ${t("filters.reset")}
    </button>
  `;
}

export function syncSearchSettings(filters) {
  document.querySelectorAll('[data-action="condition"]').forEach((button) => {
    button.classList.toggle("is-active", button.dataset.value === filters.condition);
  });

  const min = document.getElementById("minPrice");
  const max = document.getElementById("maxPrice");
  if (document.activeElement !== min) min.value = filters.minPrice ?? "";
  if (document.activeElement !== max) max.value = filters.maxPrice ?? "";

  document.getElementById("sortSelect").value = filters.sort;
}