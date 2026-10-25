import { t } from "../core/i18n.js";

let modal = null;
let controller = null;
let opener = null;

export function openImageModal({ title, urls, startIndex = 0 }) {
  closeImageModal();

  opener = document.activeElement; // хаахад focus буцаах элемент
  const multiple = urls.length > 1;
  let index = startIndex;

  modal = document.createElement("div");
  modal.className = "app-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", title);
  modal.innerHTML = `
    <div class="app-modal__backdrop" data-modal="close"></div>
    <figure class="app-modal__figure">
      <img class="app-modal__image" alt="" />
      <figcaption class="app-modal__caption"></figcaption>
    </figure>
    <button type="button" class="app-modal__btn is-close" data-modal="close" aria-label="${t("gallery.close")}">
      <i class="fas fa-xmark"></i>
    </button>
    ${
      multiple
        ? `<button type="button" class="app-modal__btn is-prev" data-modal="prev" aria-label="${t("gallery.prev")}">
             <i class="fas fa-chevron-left"></i>
           </button>
           <button type="button" class="app-modal__btn is-next" data-modal="next" aria-label="${t("gallery.next")}">
             <i class="fas fa-chevron-right"></i>
           </button>`
        : ""
    }
  `;
  document.body.append(modal);
  document.body.classList.add("has-modal-open");

  const image = modal.querySelector(".app-modal__image");
  const caption = modal.querySelector(".app-modal__caption");

  function show(next) {
    index = (next + urls.length) % urls.length; // төгсгөлөөс эхлэл рүү эргэнэ
    image.src = urls[index];
    image.alt = title;
    caption.textContent = `${title} · ${index + 1} / ${urls.length}`;
  }
  show(index);

  // Бүх event-ийг нэг signal-д холбож, хаахад нэг дор цэвэрлэнэ
  controller = new AbortController();
  const { signal } = controller;

  modal.addEventListener(
    "click",
    (event) => {
      const action = event.target.closest("[data-modal]")?.dataset.modal;
      if (action === "close") closeImageModal();
      if (action === "prev") show(index - 1);
      if (action === "next") show(index + 1);
    },
    { signal },
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") closeImageModal();
      if (multiple && event.key === "ArrowLeft") show(index - 1);
      if (multiple && event.key === "ArrowRight") show(index + 1);
    },
    { signal },
  );

  window.addEventListener("hashchange", closeImageModal, { signal });
  window.addEventListener("languagechange", closeImageModal, { signal });

  modal.querySelector(".is-close").focus();
}

export function closeImageModal() {
  if (!modal) return;

  controller.abort();
  modal.remove();
  modal = null;
  document.body.classList.remove("has-modal-open");
  opener?.focus();
}