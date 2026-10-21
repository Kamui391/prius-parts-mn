// src/ хавтасыг docs/ руу хуулна (GitHub Pages: /docs хавтаснаас ажиллана).
import { rmSync, cpSync } from "node:fs";

rmSync("docs", { recursive: true, force: true });
cpSync("src", "docs", { recursive: true });
console.log("src/ -> docs/ хууллаа");