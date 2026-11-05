// Join OCR page texts (page-NNN.txt) into one clean txt per book, same format as previous years:
//   N. question text (chapter:verse)
//   a) ...
//   b) ...
//   c) ...
//   <empty line>
// Usage: node normalize.mjs <books.json> <ocr-dir> [level]
// Writes the txt files next to books.json and prints a validation report.
import fs from "node:fs";
import path from "node:path";

const [booksFile, ocrDir, onlyLevel] = process.argv.slice(2);
if (!booksFile || !ocrDir) {
  console.error("usage: node normalize.mjs <books.json> <ocr-dir> [level]");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(booksFile, "utf8"));
const outDir = path.dirname(booksFile);

export function fixChars(s) {
  return s
    .replace(/ş/g, "ș").replace(/ţ/g, "ț").replace(/Ş/g, "Ș").replace(/Ţ/g, "Ț")
    .replace(/ã/g, "ă").replace(/á/g, "ă").replace(/Ã/g, "Ă")
    .replace(/[“"](?=[^„]*$)/g, m => m) // keep, fixed below
    .replace(/„([^„”"“]*)["“]/g, "„$1”") // closing quote after „
    .replace(/\s+/g, " ")
    .trim();
}

function pagesRange(r) {
  const [a, b] = r.split("-").map(Number);
  return Array.from({ length: (b || a) - a + 1 }, (_, i) => a + i);
}

const isQuestion = l => /^\d{1,3}\s*\.\s+\S/.test(l);
const isAnswer = l => /^[abc]\s*\)/.test(l);
// lines to drop: section titles, watermark garbage
const isNoise = l =>
  /^întreb[ăa]ri privitoare la text/i.test(l) ||
  /^\(?preluate din volumul/i.test(l) ||
  // short lines are kept ("sus" from "ambele variante de mai sus"), only non-letter garbage is dropped
  !/[a-zăâîșțA-ZĂÂÎȘȚ0-9]/.test(l) ||
  /^(carmel|cara|car|nel|el|rel|sne!|# re!|carane!)$/i.test(l);

function joinLines(prev, next) {
  if (/[a-zăâîșț]-$/.test(prev) && /^[a-zăâîșț]/.test(next)) {
    // word split at end of line: "împă-" + "ratului"; keep hyphen for known compounds
    const keep = /(ardere|de|-tot|s|l|i|ne|v|m|și|n|într|dintr|printr)-$/i.test(prev);
    return keep ? prev + next : prev.slice(0, -1) + next;
  }
  return prev + " " + next;
}

export function normalize(raw) {
  const items = []; // {q, answers[]}
  let cur = null;
  let target = null; // "q" | index of answer
  for (let line of raw.split("\n")) {
    line = line.trim();
    if (!line || isNoise(line)) continue;
    if (isQuestion(line)) {
      cur = { q: line.replace(/^(\d{1,3})\s*\.\s*/, "$1. "), answers: [] };
      items.push(cur);
      target = "q";
    } else if (cur && isAnswer(line)) {
      cur.answers.push(line.replace(/^([abc])\s*\)\s*/, "$1) "));
      target = cur.answers.length - 1;
    } else if (cur) {
      if (target === "q") cur.q = joinLines(cur.q, line);
      else cur.answers[target] = joinLines(cur.answers[target], line);
    }
  }
  return items.map(({ q, answers }) => {
    // references "(18.14-17)" -> "(18:14-17)" like previous years
    q = fixChars(q).replace(/\((\d+)\s*[.,]\s*(\d+)/g, "($1:$2");
    return [q, ...answers.map(fixChars)].join("\n");
  });
}

for (const book of config.books) {
  if (onlyLevel && String(book.level) !== onlyLevel) continue;
  const raw = pagesRange(book.pages)
    .map(p => fs.readFileSync(path.join(ocrDir, `page-${String(p).padStart(3, "0")}.txt`), "utf8"))
    .join("\n");
  const questions = normalize(raw);
  fs.writeFileSync(path.join(outDir, book.file), questions.join("\n\n") + "\n");
  // validation report
  const problems = [];
  questions.forEach((q, i) => {
    const lines = q.split("\n");
    const nr = parseInt(lines[0]);
    if (nr !== i + 1) problems.push(`#${i + 1}: numbering is ${nr}`);
    if (lines.length !== 4) problems.push(`#${nr}: ${lines.length - 1} answers`);
    if (/[$￿|]/.test(q)) problems.push(`#${nr}: suspicious chars`);
  });
  const countOk = questions.length === book.count ? "ok" : `EXPECTED ${book.count}`;
  console.log(`${book.level}. ${book.text}: ${questions.length} questions (${countOk}) -> ${book.file}`);
  problems.forEach(p => console.log("   - " + p));
}
