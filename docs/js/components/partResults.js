import { t } from "../core/i18n.js";
import { formatMoney } from "../core/format.js";
import { generations, getCategory } from "../data/catalog.js";
import { getPartName, getSupplierName } from "../fn/partGetters.js";
import { getImageUrls } from "../services/imageService.js";

const CONDITION_KEYS = { new: "filters.conditionNew", used: "filters.conditionUsed" };

// Зураггүй үед ангиллын дүрсийг харуулна
function renderPlaceholder(part) {
  const category = getCategory(part.category);
  return `<div class="app-part__thumb is-placeholder"><i class="fas ${category.icon}"></i></div>`;
}

// Зураг байвал дарж томруулах товч, үгүй бол placeholder
function renderThumb(part, imageMap) {
  const urls = getImageUrls(imageMap, part.id);
  if (urls.length === 0) return renderPlaceholder(part);

  return `
    <button type="button" class="app-part__thumb" data-action="open-gallery" data-part-id="${part.id}"
            aria-label="${t("gallery.open")}">
      <img src="${urls[0]}" alt="${getPartName(part)}" loading="lazy" />
      ${urls.length > 1 ? `<span class="app-part__badge"><i class="fas fa-images"></i> ${urls.length}</span>` : ""}
    </button>
  `;
}

function renderOffer(offer, supplierMap, isBest) {
  const supplier = supplierMap.get(offer.supplierId);

  return `
    <li class="${isBest ? "is-best" : ""}">
      <span>
        ${supplier ? getSupplierName(supplier) : "—"}
        <em class="app-tag is-${offer.condition}">${t(CONDITION_KEYS[offer.condition])}</em>
      </span>
      <strong>${formatMoney(offer.priceMnt)}</strong>
    </li>
  `;
}

function renderPartCard({ part, offers }, context) {
  const category = getCategory(part.category);
  const tags = part.generations
    .map((id) => generations.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => `<span class="app-tag">${item.name}</span>`)
    .join("");

  const offerItems = offers
    .map((offer, index) => renderOffer(offer, context.supplierMap, offers.length > 1 && index === 0))
    .join("");

  return `
    <article class="app-part">
      ${renderThumb(part, context.imageMap)}
      <div class="app-part__body">
        <span class="app-part__category"><i class="fas ${category.icon}"></i> ${t(category.key)}</span>
        <h3 class="app-part__name">${getPartName(part)}</h3>
        <p class="app-part__number">${part.partNumber}</p>
        <div class="app-part__tags">${tags}</div>
        <p class="app-part__price">
          <span>${t("results.from")}</span>
          <strong>${formatMoney(offers[0].priceMnt)}</strong>
        </p>
        <details class="app-offers">
          <summary>${t("results.compare")} (${offers.length})</summary>
          <ul>${offerItems}</ul>
        </details>
      </div>
    </article>
  `;
}

export function renderResults(results, context) {
  return `<div class="app-parts">${results.map((item) => renderPartCard(item, context)).join("")}</div>`;
}

export function renderEmpty() {
  return `
    <div class="app-empty">
      <i class="fas fa-magnifying-glass"></i>
      <h3>${t("results.emptyTitle")}</h3>
      <p>${t("results.emptyText")}</p>
      <button type="button" class="button app-btn app-btn--solid mt-4" data-action="reset">
        ${t("filters.reset")}
      </button>
    </div>
  `;
}