import { getPreviewQuestions } from "../../src/common/utilities";

/**
 * Consistency checks for the 2027 Bible questions imported from the PDF
 * (see .claude/skills/bible-pdf-import/SKILL.md and tests/questions/2027/SUMMARY.md).
 *
 * Sources:  tests/questions/2027/books.json, *.txt, answers.txt
 * Generated: src/data/bible/questions-2027.json, answers-2027.json
 */

// the project has no @types/node: declare the few Node APIs used here
declare const require: (id: string) => any;
declare const __dirname: string;
const fs: { readFileSync(file: string, encoding: string): string } = require("fs");
const path: { join(...parts: string[]): string } = require("path");

const year = 2027;
const root = path.join(__dirname, "../..");
const dir = path.join(root, "tests/questions", String(year));
const readJSON = (file: string) => JSON.parse(fs.readFileSync(file, "utf8"));

type Book = { level: number; text: string; file: string; pages: string; count: number };
const config: { books: Book[] } = readJSON(path.join(dir, "books.json"));
const questions: QuizOption[] = readJSON(path.join(root, `src/data/bible/questions-${year}.json`));
const answers: CorrectAnswers = readJSON(path.join(root, `src/data/bible/answers-${year}.json`));

/** same regex as convertAnswersToJSON (tests/integration/admin.test.ts) */
function parseAnswersTxt(content: string) {
  const result: { [level: string]: { [id: string]: number } } = {};
  let level = "";
  content.split("\n").forEach(line => {
    const header = line.match(/^#\s*(\d+)\./);
    if (header) {
      level = header[1];
      result[level] = {};
      return;
    }
    const match = line.trim().match(/^(\d+)\s*-\s*([abc])/i);
    if (match && level) {
      const answer = match[2].toLowerCase();
      result[level][match[1]] = answer === "a" ? 1 : answer === "b" ? 2 : 3;
    }
  });
  return result;
}

describe(`Bible questions ${year}`, function () {
  test.each(config.books.map(book => [book.level, book.text, book]))(
    "level %i (%s): questions match txt, ids continuous, 3 answers each",
    function (level, text, book) {
      const { file, count } = book as Book;
      const levelQuestions = questions.filter(q => q.level === level);
      expect(levelQuestions.length).toBe(count);
      expect(levelQuestions.map(q => q.id)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
      levelQuestions.forEach(q => {
        expect(q.answers).toHaveLength(3);
        expect(q.text).not.toMatch(/[şţŞŢ$￿]/);
      });

      // same result as the UI "Add questions" flow (getPreviewQuestions + "Download new Questions")
      const txt = fs.readFileSync(path.join(dir, file), "utf8");
      const expected = getPreviewQuestions(txt, 0, level as number).map(q => ({
        ...q,
        answers: q.answers.map(a => a.text)
      }));
      expect(levelQuestions).toEqual(expected);
    }
  );

  it("answers json has one answer (1-3) for every question and nothing else", function () {
    const levels = config.books.map(b => String(b.level));
    expect(Object.keys(answers).sort()).toEqual(levels.sort());
    questions.forEach(q => {
      expect([1, 2, 3]).toContain(answers[q.level][q.id]);
    });
    const total = Object.values(answers).reduce((sum, level) => sum + Object.keys(level).length, 0);
    expect(total).toBe(questions.length);
  });

  it("answers json matches answers.txt (copied from the PDF)", function () {
    const fromTxt = parseAnswersTxt(fs.readFileSync(path.join(dir, "answers.txt"), "utf8"));
    expect(answers).toEqual(fromTxt);
  });

  it("SUMMARY.md lists the same answers", function () {
    const summary = fs.readFileSync(path.join(dir, "SUMMARY.md"), "utf8");
    config.books.forEach(book => {
      const block = summary.split(/^### /m).find((s: string) => s.startsWith(`${book.level}. ${book.text}\n`));
      expect(block).toBeDefined();
      const fromSummary = parseAnswersTxt(`# ${book.level}.\n` + block);
      expect(fromSummary[book.level]).toEqual(answers[book.level]);
    });
  });
});
