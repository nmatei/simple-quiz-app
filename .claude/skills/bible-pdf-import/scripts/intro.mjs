// Join the OCR of the intro pages (text before the questions of each book) into one intro.txt.
// OCR the pages first with: ocr-pdf <pdf> <intro-ocr-dir> <from-to> --png --single
// Usage: node intro.mjs <books.json> <intro-ocr-dir>
// books.json: "introPages" (general introduction, optional) and "intro" per book (page range).
import fs from "node:fs";
import path from "node:path";

const [booksFile, ocrDir] = process.argv.slice(2);
if (!booksFile || !ocrDir) {
  console.error("usage: node intro.mjs <books.json> <intro-ocr-dir>");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(booksFile, "utf8"));

const fixChars = s =>
  s
    .replace(/ş/g, "ș").replace(/ţ/g, "ț").replace(/Ş/g, "Ș").replace(/Ţ/g, "Ț")
    .replace(/ã/g, "ă").replace(/á/g, "ă")
    .replace(/„([^„”"“]*)["“']/g, "„$1”");

const pages = r => {
  const [a, b] = r.split("-").map(Number);
  return Array.from({ length: (b || a) - a + 1 }, (_, i) => a + i);
};

// join wrapped lines of each paragraph, glue words hyphenated at line end ("Penta-" + "teuhul")
function reflow(text) {
  return text
    .split(/\n\s*\n/)
    .map(p =>
      p
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean)
        .reduce((acc, line) => {
          if (!acc) return line;
          if (/[a-zăâîșț]-$/.test(acc) && /^[a-zăâîșț]/.test(line)) return acc.slice(0, -1) + line;
          return acc + " " + line;
        }, "")
    )
    .filter(p => p && !/^(carmel|\d+)$/i.test(p))
    .map(fixChars)
    .join("\n\n");
}

const read = range =>
  pages(range)
    .map(p => path.join(ocrDir, `page-${String(p).padStart(3, "0")}.txt`))
    .filter(f => fs.existsSync(f))
    .map(f => fs.readFileSync(f, "utf8"))
    .join("\n\n");

const sections = [];
if (config.introPages) {
  sections.push(`=== Introducere ===\n\n${reflow(read(config.introPages))}`);
}
for (const book of config.books) {
  if (!book.intro) continue;
  sections.push(`=== ${book.level}. ${book.text} ===\n\n${reflow(read(book.intro))}`);
}
const out = path.join(path.dirname(booksFile), "intro.txt");
fs.writeFileSync(out, sections.join("\n\n\n") + "\n");
console.log(`wrote ${out} (${sections.length} sections)`);
