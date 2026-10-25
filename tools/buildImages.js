// src/img/parts/ хавтас дахь зургуудыг уншиж src/data/images.json үүсгэнэ.  Ажиллуулах: npm run images
// Файлын нэрийн дүрэм: <эд ангийн id>-<дугаар>.<өргөтгөл>   жишээ: 1-1.jpg, 1-2.jpg, 7-1.webp
import { readdirSync, writeFileSync } from "node:fs";

const IMAGE_DIR = "src/img/parts";
const OUTPUT = "src/data/images.json";
const PATTERN = /^(\d+)-(\d+)\.(jpg|jpeg|png|webp|svg)$/i;

const imageMap = {};

const files = readdirSync(IMAGE_DIR)
  .map((file) => ({ file, match: file.match(PATTERN) }))
  .filter((item) => item.match)
  // id, дараа нь дугаараар нь эрэмбэлнэ
  .sort((a, b) => Number(a.match[1]) - Number(b.match[1]) || Number(a.match[2]) - Number(b.match[2]));

for (const { file, match } of files) {
  const partId = match[1];
  (imageMap[partId] ??= []).push(file);
}

writeFileSync(OUTPUT, `${JSON.stringify(imageMap, null, 2)}\n`);
console.log(`${files.length} зураг, ${Object.keys(imageMap).length} эд анги -> ${OUTPUT}`);