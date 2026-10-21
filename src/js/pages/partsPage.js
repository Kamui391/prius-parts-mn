import { t } from "../core/i18n.js";
import { categories, generations } from "../data/catalog.js";
import { mountPage, renderHero, renderSection } from "../layouts/pageLayout.js";

// Хэрэглэгчийн сонголтыг модуль дотор хадгална. Хуудас дахин зурагдсан ч (жишээ нь хэл солигдоход) алдагдахгүй.
const filters = { query: "", generation: null, category: null };

function updateSummary() {
  const parts = [];

  if (filters.query.trim()) parts.push(`“${filters.query.trim()}”`);

  const generation = generations.find((item) => item.id === filters.generation);
  if (generation) parts.push(generation.name);

  const category = categories.find((item) => item.id === filters.category);
  if (category) parts.push(t(category.key));

  // textContent ашигласан тул хэрэглэгчийн бичсэн текст HTML болж задрахгүй
  document.getElementById("partSummary").textContent = parts.length
    ? `${t("parts.summaryLabel")}: ${parts.join(" · ")}`
    : t("parts.summaryNone");
}

function syncChips() {
  document.querySelectorAll("[data-gen]").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.gen === filters.generation);
  });
  document.querySelectorAll("[data-category]").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.category === filters.category);
  });
}

function bindFilters() {
  const input = document.getElementById("partQuery");
  input.value = filters.query;
  input.addEventListener("input", () => {
    filters.query = input.value;
    updateSummary();
  });

  document.querySelectorAll("[data-gen]").forEach((chip) => {
    chip.addEventListener("click", () => {
      filters.generation = filters.generation === chip.dataset.gen ? null : chip.dataset.gen;
      syncChips();
      updateSummary();
    });
  });

  document.querySelectorAll("[data-category]").forEach((chip) => {
    chip.addEventListener("click", () => {
      filters.category = filters.category === chip.dataset.category ? null : chip.dataset.category;
      syncChips();
      updateSummary();
    });
  });

  syncChips();
  updateSummary();
}

export function renderPartsPage() {
  const generationChips = generations
    .map((item) => `<button type="button" class="app-chip" data-gen="${item.id}">${item.name}</button>`)
    .join("");

  const categoryChips = categories
    .map(
      (item) => `
        <button type="button" class="app-chip" data-category="${item.id}">
          <i class="fas ${item.icon}"></i>${t(item.key)}
        </button>`,
    )
    .join("");

  mountPage(
    `
    ${renderHero({ compact: true, title: t("parts.title"), text: t("parts.text") })}
    ${renderSection({
      content: `
        <div class="app-panel">
          <div class="field">
            <div class="control has-icons-left">
              <input id="partQuery" class="input is-medium app-input" type="search"
                     placeholder="${t("parts.placeholder")}" />
              <span class="icon is-left"><i class="fas fa-magnifying-glass"></i></span>
            </div>
          </div>
          <p class="app-label">${t("parts.generation")}</p>
          <div class="app-chips">${generationChips}</div>
          <p class="app-label">${t("parts.category")}</p>
          <div class="app-chips">${categoryChips}</div>
          <p class="app-summary" id="partSummary"></p>
        </div>
        <div class="app-empty">
          <i class="fas fa-database"></i>
          <h3>${t("parts.emptyTitle")}</h3>
          <p>${t("parts.emptyText")}</p>
        </div>`,
    })}
    `,
    "page-parts",
  );

  bindFilters();
}