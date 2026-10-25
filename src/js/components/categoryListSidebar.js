import { t } from "../core/i18n.js";
import { categories, generations } from "../data/catalog.js";

export function renderCategoryListSidebar() {
  const generationChips = generations
    .map(
      (item) => `
        <button type="button" class="app-chip" data-action="generation" data-value="${item.id}">
          ${item.name}
        </button>`,
    )
    .join("");

  const categoryItems = categories
    .map(
      (item) => `
        <button type="button" class="app-filter-list__item" data-action="category" data-value="${item.id}">
          <i class="fas ${item.icon}"></i>
          <span>${t(item.key)}</span>
          <span class="app-count" data-count="${item.id}">0</span>
        </button>`,
    )
    .join("");

  return `
    <section class="app-filter">
      <h3 class="app-filter__title">${t("filters.generation")}</h3>
      <div class="app-chips">${generationChips}</div>
    </section>
    <section class="app-filter">
      <h3 class="app-filter__title">${t("filters.category")}</h3>
      <div class="app-filter-list">${categoryItems}</div>
    </section>
  `;
}

// Идэвхтэй үе, ангиллыг тодруулж, ангилал бүрийн тоог шинэчилнэ
export function syncCategoryList(filters, counts) {
  document.querySelectorAll('[data-action="generation"]').forEach((button) => {
    button.classList.toggle("is-active", button.dataset.value === filters.generation);
  });

  document.querySelectorAll('[data-action="category"]').forEach((button) => {
    button.classList.toggle("is-active", button.dataset.value === filters.category);
  });

  document.querySelectorAll("[data-count]").forEach((element) => {
    element.textContent = counts[element.dataset.count] ?? 0;
  });
}