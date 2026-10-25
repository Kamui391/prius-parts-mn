import { t } from "../core/i18n.js";

// Зүүн талд шүүлтүүрийн sidebar, баруун талд үр дүн бүхий хуудасны загвар.
// Жижиг дэлгэц дээр sidebar нь зүүнээс гарч ирдэг drawer болно.
export function renderSidebarPageLayout({ sidebar = "", toolbar = "", content = "" }) {
  return `
    <section class="app-section">
      <div class="container">
        <div class="app-sidebar-layout">
          <aside class="app-sidebar" id="appSidebar" aria-label="${t("filters.title")}">
            <div class="app-sidebar__head">
              <h2>${t("filters.title")}</h2>
              <button type="button" class="app-icon-btn" id="sidebarClose" aria-label="${t("filters.close")}">
                <i class="fas fa-xmark"></i>
              </button>
            </div>
            ${sidebar}
          </aside>
          <div class="app-sidebar-backdrop" id="sidebarBackdrop"></div>
          <div class="app-sidebar-layout__main">
            ${toolbar}
            ${content}
          </div>
        </div>
      </div>
    </section>
  `;
}

let controller = null;

export function bindSidebarToggle() {
  // Өмнөх хуудсанд холбосон document-ийн event-үүдийг цэвэрлэнэ
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  const sidebar = document.getElementById("appSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");

  function setOpen(open) {
    sidebar.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    document.body.classList.toggle("has-sidebar-open", open);
  }

  document.getElementById("sidebarOpen")?.addEventListener("click", () => setOpen(true), { signal });
  document.getElementById("sidebarClose").addEventListener("click", () => setOpen(false), { signal });
  backdrop.addEventListener("click", () => setOpen(false), { signal });
  document.addEventListener("keydown", (event) => event.key === "Escape" && setOpen(false), { signal });

  // Хуудас солигдоход (hashchange) drawer-ийг хаана
  window.addEventListener(
    "hashchange",
    () => {
      setOpen(false);
      controller.abort();
    },
    { signal },
  );
}