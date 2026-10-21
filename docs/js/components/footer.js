import { t } from "../core/i18n.js";

let footerRoot = null;

function renderFooter() {
  return `
    <footer class="app-footer">
      <div class="container app-footer__inner">
        <p><strong>${t("brand.name")}</strong> · ${t("footer.text")} · ${new Date().getFullYear()}</p>
        <a href="https://github.com/Kamui391/prius-parts-mn" target="_blank" rel="noopener">
          <i class="fab fa-github"></i> ${t("footer.github")}
        </a>
      </div>
    </footer>
  `;
}

export function mountFooter(root) {
  footerRoot = root;
  root.innerHTML = renderFooter();
}

window.addEventListener("languagechange", () => {
  if (footerRoot) mountFooter(footerRoot);
});