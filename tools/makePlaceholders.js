// Бодит зураг ирэхээс өмнө ашиглах түр SVG зургуудыг эд анги бүрт 2 ширхээр үүсгэнэ.
// Ажиллуулах: npm run placeholders.  Бодит зургаа ижил нэрээр (1-1.jpg ...) хавтас руу хийж, npm run images ажиллуулна.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const { parts } = JSON.parse(readFileSync("src/data/parts.json", "utf8"));
const OUT = "src/img/parts";
mkdirSync(OUT, { recursive: true });

// Ангилал бүрийн өнгө, дүрс (800x600 зураг дээрх төвлөрсөн дүрс)
const styles = {
  battery: { from: "#0a4f59", to: "#19b5a5", icon: `<rect x="260" y="200" width="280" height="170" rx="22"/><rect x="300" y="170" width="50" height="30"/><rect x="450" y="170" width="50" height="30"/><path d="M410 235l-45 65h38l-14 55 55-75h-38z" fill="#fff" stroke="none"/>` },
  engine: { from: "#1f3a5f", to: "#4f8fd9", icon: `<circle cx="400" cy="285" r="85"/><circle cx="400" cy="285" r="30"/><path d="M400 165v40M400 365v40M280 285h40M480 285h40M315 200l28 28M457 342l28 28M485 200l-28 28M343 342l-28 28"/>` },
  brakes: { from: "#5b1f2e", to: "#e0566e", icon: `<circle cx="400" cy="285" r="120"/><circle cx="400" cy="285" r="35"/><circle cx="400" cy="205" r="12"/><circle cx="469" cy="245" r="12"/><circle cx="469" cy="325" r="12"/><circle cx="400" cy="365" r="12"/><circle cx="331" cy="325" r="12"/><circle cx="331" cy="245" r="12"/>` },
  suspension: { from: "#3d2a6b", to: "#9b7bea", icon: `<path d="M400 150v40M335 190h130l-65 25 65 25-130 25 130 25-65 25h-65M400 315v20" /><path d="M400 340v90"/><circle cx="400" cy="450" r="14"/>` },
  body: { from: "#2b3a42", to: "#7f98a6", icon: `<path d="M230 330l30-85a40 40 0 0 1 38-27h204a40 40 0 0 1 38 27l30 85v45H230z"/><circle cx="305" cy="385" r="32" fill="#0b1f2a"/><circle cx="495" cy="385" r="32" fill="#0b1f2a"/><path d="M290 250h220"/>` },
  lights: { from: "#7a4a07", to: "#f5a623", icon: `<path d="M250 285a150 105 0 0 1 300 0a150 105 0 0 1-300 0z"/><circle cx="400" cy="285" r="45"/><path d="M590 215l45-25M595 285h55M590 355l45 25"/>` },
};

const escapeXml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const part of parts) {
  const style = styles[part.category];

  [1, 2].forEach((variant) => {
    const angle = variant === 1 ? "0" : "1";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${escapeXml(part.nameEn)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${angle}" y2="${variant === 1 ? "1" : "0.4"}">
      <stop offset="0" stop-color="${style.from}"/><stop offset="1" stop-color="${style.to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <g fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.92">${style.icon}</g>
  <text x="40" y="540" font-family="system-ui, sans-serif" font-size="34" font-weight="700" fill="#fff">${escapeXml(part.nameEn)}</text>
  <text x="40" y="578" font-family="system-ui, sans-serif" font-size="22" fill="#fff" opacity="0.8">${escapeXml(part.partNumber)} · ${variant}/2</text>
  <rect x="40" y="36" width="116" height="40" rx="20" fill="#fff" opacity="0.2"/>
  <text x="98" y="63" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#fff">DEMO</text>
</svg>
`;
    writeFileSync(`${OUT}/${part.id}-${variant}.svg`, svg);
  });
}

console.log(`${parts.length * 2} түр зураг -> ${OUT}`);