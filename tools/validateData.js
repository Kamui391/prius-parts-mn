// src/data/ доторх JSON өгөгдлийн бүрэн бүтэн байдлыг шалгана.  Ажиллуулах: npm run validate
import { readFileSync } from "node:fs";
import { categories, generations } from "../src/js/data/catalog.js";

const read = (file) => JSON.parse(readFileSync(new URL(`../src/data/${file}`, import.meta.url), "utf8"));

const { parts } = read("parts.json");
const suppliers = read("suppliers.json");

const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

const supplierIds = new Set(suppliers.map((item) => item.id));
const categoryIds = new Set(categories.map((item) => item.id));
const generationIds = new Set(generations.map((item) => item.id));

check(new Set(parts.map((part) => part.id)).size === parts.length, "parts: id давхардсан байна");
check(supplierIds.size === suppliers.length, "suppliers: id давхардсан байна");

for (const part of parts) {
  const label = `parts[id=${part.id}]`;

  check(part.nameMn && part.nameEn, `${label}: nameMn, nameEn хоёулаа байх ёстой`);
  check(part.partNumber, `${label}: partNumber байхгүй`);
  check(categoryIds.has(part.category), `${label}: category буруу (${part.category})`);
  check(
    part.generations.length > 0 && part.generations.every((id) => generationIds.has(id)),
    `${label}: generations буруу`,
  );
  check(part.offers.length > 0, `${label}: offers хоосон байна`);

  for (const offer of part.offers) {
    check(supplierIds.has(offer.supplierId), `${label}: supplierId=${offer.supplierId} олдсонгүй`);
    check(Number.isInteger(offer.priceMnt) && offer.priceMnt > 0, `${label}: priceMnt буруу`);
    check(["new", "used"].includes(offer.condition), `${label}: condition буруу (${offer.condition})`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`OK: ${parts.length} эд анги, ${suppliers.length} нийлүүлэгч`);