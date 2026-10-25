import { t } from "../core/i18n.js";

export function renderSearchNameSidebar() {
  return `
    <section class="app-filter">
      <label class="app-filter__title" for="partQuery">${t("filters.search")}</label>
      <div class="control has-icons-left">
        <input id="partQuery" class="input app-input" type="search" autocomplete="off"
               placeholder="${t("filters.searchPlaceholder")}" />
        <span class="icon is-left"><i class="fas fa-magnifying-glass"></i></span>
      </div>
    </section>
  `;
}

// Хэрэглэгч бичиж байгаа үед (focus-той) утгыг дарж бичихгүй
export function syncSearchName(filters) {
  const input = document.getElementById("partQuery");
  if (input && document.activeElement !== input) {
    input.value = filters.query;
  }
}