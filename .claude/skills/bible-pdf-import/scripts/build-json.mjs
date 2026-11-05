// Build src/data/bible/questions-{year}.json and answers-{year}.json from the proofread txt files.
// Mirrors the UI flow ("Add questions" textarea -> getPreviewQuestions -> "Download new Questions"),
// see src/common/utilities.ts getPreviewQuestions / cleanupQNumbering / cleanupNumbering.
// tests/integration/bible-{year}.test.ts re-checks the output against the real getPreviewQuestions.
// Usage: node build-json.mjs <books.json>
import fs from "node:fs";
import path from "node:path";

const booksFile = process.argv[2];
if (!booksFile) {
  console.error("usage: node build-json.mjs <books.json>");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(booksFile, "utf8"));
const dir = path.dirname(booksFile);
const { year } = config;

// --- same logic as src/common/utilities.ts ---
const cleanupQNumbering = text => text.replace(/^\s*(\d+)\s*\.\s*/, "").trim();
const cleanupNumbering = text => text.replace(/^\s*(\w+|\d{2,})\s*\)\s*/, "").trim();
function getPreviewQuestions(value, lastId, level) {
  return value
    .trim()
    .split(/\n{2,}/)
    .map((q, i) => {
      const [text, ...answers] = q.split(/\n/);
      return {
        id: lastId + i + 1,
        level,
        answerType: "radio",
        text: cleanupQNumbering(text),
        answers: answers.map((answer, i) => ({ id: i + 1, text: cleanupNumbering(answer) }))
      };
    });
}

// --- answers.txt: blocks "# level. Name" followed by "N-x" lines (same regex as convertAnswersToJSON) ---
export function parseAnswers(content) {
  const result = {};
  let level = null;
  content.split("\n").forEach(line => {
    const header = line.match(/^#\s*(\d+)\./);
    if (header) {
      level = header[1];
      result[level] = {};
      return;
    }
    const match = line.trim().match(/^(\d+)\s*-\s*([abc])/i);
    if (match && level) {
      result[level][match[1]] = { a: 1, b: 2, c: 3 }[match[2].toLowerCase()];
    }
  });
  return result;
}

const answers = parseAnswers(fs.readFileSync(path.join(dir, "answers.txt"), "utf8"));
const questions = [];
let ok = true;
for (const book of config.books) {
  const txt = fs.readFileSync(path.join(dir, book.file), "utf8");
  const items = getPreviewQuestions(txt, 0, book.level).map(q => ({
    ...q,
    answers: q.answers.map(a => a.text) // simplified answers, like "Download new Questions"
  }));
  const nrAnswers = Object.keys(answers[book.level] || {}).length;
  const bad = items.filter(q => q.answers.length !== 3).map(q => q.id);
  const status = items.length === nrAnswers && !bad.length ? "ok" : "MISMATCH";
  if (status !== "ok") ok = false;
  console.log(
    `${book.level}. ${book.text}: ${items.length} questions, ${nrAnswers} answers ${status}` +
      (bad.length ? ` (not 3 answers: ${bad.join(", ")})` : "")
  );
  questions.push(...items);
}

const dataDir = path.resolve(dir, "../../../src/data/bible");
fs.writeFileSync(path.join(dataDir, `questions-${year}.json`), JSON.stringify(questions, null, 2) + "\n");
fs.writeFileSync(path.join(dataDir, `answers-${year}.json`), JSON.stringify(answers, null, 2) + "\n");
console.log(`wrote questions-${year}.json (${questions.length}) and answers-${year}.json`);

// --- SUMMARY.md: books, counts and answers in "1-a" format (for convertAnswersToJSON / selectAnswersFromPDF) ---
const letter = v => ["", "a", "b", "c"][v];
const firstVerses = Math.max(...config.books.map(b => b.level)) + 1;
const summary = [
  `# Întrebări biblice ${year}`,
  "",
  `Sursa: \`${config.pdf}\` (răspunsuri: paginile ${config.answerPages}).`,
  `Generat cu skill-ul \`/bible-pdf-import\` (\`.claude/skills/bible-pdf-import/\`).`,
  "",
  "| Nivel | Carte | Fișier | Întrebări | Pagini PDF |",
  "| ----- | ----- | ------ | --------- | ---------- |",
  ...config.books.map(
    b => `| ${b.level} | ${b.text} | [${b.file}](${b.file}) | ${(answers[b.level] && Object.keys(answers[b.level]).length) || 0} | ${b.pages} |`
  ),
  `| | **Total** | | **${questions.length}** | |`,
  "",
  `Nivelurile pentru versete (în \`src/generators/bible.ts\`): ${firstVerses} = Alege Referința, ${firstVerses + 1} = Scrie Referința, ${firstVerses + 2} = Completează Versetul.`,
  "",
  "## Răspunsuri",
  "",
  "Format `număr-literă`, se poate lipi direct în `convertAnswersToJSON(text, level)` (tests/integration/admin.test.ts)",
  "sau în consola browserului: `selectAnswersFromPDF(\`...\`)`.",
  "",
  ...config.books.flatMap(b => [
    `### ${b.level}. ${b.text}`,
    "",
    "```",
    ...Object.entries(answers[b.level] || {}).map(([id, v]) => `${id}-${letter(v)}`),
    "```",
    ""
  ])
].join("\n");
fs.writeFileSync(path.join(dir, "SUMMARY.md"), summary);
console.log("wrote SUMMARY.md");
if (!ok) process.exit(2);
