// mn.js ба en.js дахь орчуулгын түлхүүрүүд ижил эсэхийг шалгана.  Ажиллуулах: npm run check:locales
import mn from "../src/js/locales/mn.js";
import en from "../src/js/locales/en.js";

// { nav: { home: "..." } } -> ["nav.home"]
function flatten(object, prefix = "") {
  return Object.entries(object).flatMap(([key, value]) =>
    typeof value === "object" ? flatten(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );
}

const mnKeys = new Set(flatten(mn));
const enKeys = new Set(flatten(en));

const missingInEn = [...mnKeys].filter((key) => !enKeys.has(key));
const missingInMn = [...enKeys].filter((key) => !mnKeys.has(key));

if (missingInEn.length > 0 || missingInMn.length > 0) {
  if (missingInEn.length > 0) console.error("en.js-д дутуу:", missingInEn.join(", "));
  if (missingInMn.length > 0) console.error("mn.js-д дутуу:", missingInMn.join(", "));
  process.exit(1);
}

console.log(`OK: хоёр хэлэнд ${mnKeys.size} түлхүүр таарч байна`);