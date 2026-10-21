// #app дотор хуудсыг зурна. Анимацийг .app-page класс удирдана.
export function mountPage(html, id = "") {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-page" ${id ? `id="${id}"` : ""}>${html}</div>`;
}

// Хуудасны дээд хэсгийн том зураг, гарчиг (hero).
// compact = true бол дотоод хуудсанд зориулсан намхан хувилбар.
export function renderHero({ eyebrow = "", title = "", text = "", actions = "", compact = false }) {
  return `
    <section class="app-hero ${compact ? "is-compact" : ""}">
      <div class="container app-hero__inner">
        ${eyebrow ? `<span class="app-eyebrow">${eyebrow}</span>` : ""}
        <h1 class="app-hero__title">${title}</h1>
        ${text ? `<p class="app-hero__text">${text}</p>` : ""}
        ${actions ? `<div class="app-hero__actions">${actions}</div>` : ""}
      </div>
    </section>
  `;
}

// Гарчигтай, container бүхий агуулгын хэсэг (section).
export function renderSection({ id = "", title = "", text = "", content = "", alt = false }) {
  return `
    <section ${id ? `id="${id}"` : ""} class="app-section ${alt ? "is-alt" : ""}">
      <div class="container">
        ${
          title
            ? `<header class="app-section__head">
                 <h2 class="app-section__title">${title}</h2>
                 ${text ? `<p class="app-section__text">${text}</p>` : ""}
               </header>`
            : ""
        }
        ${content}
      </div>
    </section>
  `;
}