import { t } from "../core/i18n.js";
import { formatMoney } from "../core/format.js";
import { mountPage, renderHero, renderSection } from "../layouts/pageLayout.js";

const defaults = { price: 0, qty: 1, tax: 0, delivery: 0, labour: 0 };
const state = { ...defaults };

// input-ийн id -> state-ийн түлхүүр
const inputs = {
  calcPrice: "price",
  calcQty: "qty",
  calcTax: "tax",
  calcDelivery: "delivery",
  calcLabour: "labour",
};

function calculate() {
  const subtotal = state.price * state.qty;
  const tax = (subtotal * state.tax) / 100;
  const total = subtotal + tax + state.delivery + state.labour;
  return { subtotal, tax, total };
}

function updateResult() {
  const { subtotal, tax, total } = calculate();

  document.getElementById("resSubtotal").textContent = formatMoney(subtotal);
  document.getElementById("resTax").textContent = formatMoney(tax);
  document.getElementById("resDelivery").textContent = formatMoney(state.delivery);
  document.getElementById("resLabour").textContent = formatMoney(state.labour);
  document.getElementById("resTotal").textContent = formatMoney(total);
}

function bindCalculator() {
  Object.entries(inputs).forEach(([id, key]) => {
    const input = document.getElementById(id);

    input.addEventListener("input", () => {
      const value = Math.max(0, Number(input.value) || 0);
      state[key] = key === "qty" ? Math.max(1, value) : value;
      updateResult();
    });
  });

  document.getElementById("calcReset").addEventListener("click", () => {
    Object.assign(state, defaults);
    renderCalculatorPage();
  });

  updateResult();
}

function renderField(id, label, value) {
  return `
    <div class="field">
      <label class="label" for="${id}">${label}</label>
      <div class="control">
        <input id="${id}" class="input app-input" type="number" min="0" step="any"
               inputmode="decimal" placeholder="0" value="${value || ""}" />
      </div>
    </div>`;
}

export function renderCalculatorPage() {
  mountPage(
    `
    ${renderHero({ compact: true, title: t("calculator.title"), text: t("calculator.text") })}
    ${renderSection({
      content: `
        <div class="app-calc">
          <div class="app-panel">
            ${renderField("calcPrice", t("calculator.price"), state.price)}
            ${renderField("calcQty", t("calculator.qty"), state.qty)}
            ${renderField("calcTax", t("calculator.tax"), state.tax)}
            ${renderField("calcDelivery", t("calculator.delivery"), state.delivery)}
            ${renderField("calcLabour", t("calculator.labour"), state.labour)}
            <button id="calcReset" type="button" class="button app-btn app-btn--solid">${t("calculator.reset")}</button>
          </div>

          <aside class="app-result">
            <h3>${t("calculator.resultTitle")}</h3>
            <p class="app-result__total" id="resTotal"></p>
            <div class="app-result__row"><span>${t("calculator.subtotal")}</span><strong id="resSubtotal"></strong></div>
            <div class="app-result__row"><span>${t("calculator.taxAmount")}</span><strong id="resTax"></strong></div>
            <div class="app-result__row"><span>${t("calculator.deliveryAmount")}</span><strong id="resDelivery"></strong></div>
            <div class="app-result__row"><span>${t("calculator.labourAmount")}</span><strong id="resLabour"></strong></div>
            <p class="app-result__note">${t("calculator.note")}</p>
          </aside>
        </div>`,
    })}
    `,
    "page-calculator",
  );

  bindCalculator();
}