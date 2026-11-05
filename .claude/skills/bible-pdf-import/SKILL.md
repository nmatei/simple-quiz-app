---
name: bible-pdf-import
description: Import the yearly Bible quiz book (scanned PDF "Jocul cu copiii nu-i o joacă") into the app — OCR, per-book txt files, questions/answers JSON, bible.ts levels, summary and tests. Run only when explicitly invoked.
argument-hint: "<year> [path/to/book.pdf]"
disable-model-invocation: true
---

# Import Bible questions from the yearly PDF

Arguments: `$ARGUMENTS` (year, optional PDF path; default `tests/questions/<year>/*.pdf`).

The result is, for `<year>`:

| Output                                   | Content                                                     |
| ---------------------------------------- | ----------------------------------------------------------- |
| `tests/questions/<year>/books.json`      | config: level, book name, txt file, PDF pages, nr questions |
| `tests/questions/<year>/<book>.txt`      | proofread questions, format of previous years               |
| `tests/questions/<year>/answers.txt`     | answers from the PDF, `# level. Book` + `1-a` lines         |
| `tests/questions/<year>/SUMMARY.md`      | books, counts, answers (generated)                          |
| `src/data/bible/questions-<year>.json`   | generated                                                   |
| `src/data/bible/answers-<year>.json`     | generated, `{ level: { id: 1\|2\|3 } }`                     |
| `src/generators/bible.ts`                | one option per book + verses levels                         |
| `tests/integration/bible-<year>.test.ts` | consistency test                                            |

Scripts live in `.claude/skills/bible-pdf-import/scripts/`. Temporary files (OCR text, page PNGs) go to the
scratchpad, never into the repo. `$S` below = a scratchpad folder.

## 0. Tooling (macOS, nothing to install)

The PDF is image-only (no text layer: PDFKit returns 0 characters). Use macOS Vision OCR, which supports `ro-RO`.
`ts-node` is not installed, so the scripts are plain Node `.mjs`.

```bash
swiftc -O -o $S/ocr-pdf .claude/skills/bible-pdf-import/scripts/ocr-pdf.swift
```

## 1. Map the book (which pages hold what)

```bash
$S/ocr-pdf tests/questions/<year>/<book>.pdf $S/scan 1-999 --fast
```

It prints the first lines of every page. For each Bible book find:

- the pages after the title **„Întrebări privitoare la text"**: only these multiple-choice questions (a/b/c) are imported.
  Skip the intro text, „Întrebări de interpretare și de aplicație", and the games (careu, aritmogrif, 7x7, Cine sunt eu,
  Adevărat sau fals, Completează versetele), plus the reading plan („Planificare").
- the answers section („RĂSPUNSURI", near the end). Book titles there are followed by `N-x` columns, mixed with game answers.

Write `tests/questions/<year>/books.json` (see `tests/questions/2027/books.json`). Use the book order from the PDF as
levels 1..N. `count` = number of answers for that book in the answers section.

## 2. OCR the question and answer pages

```bash
$S/ocr-pdf tests/questions/<year>/<book>.pdf $S/ocr <first>-<last> --png
```

This writes `page-NNN.txt` (column-aware: left column, then right; page numbers and the „carmel" watermark are
dropped) and `page-NNN.png` (3x, for proofreading).

## 3. Build the per-book txt files

```bash
node .claude/skills/bible-pdf-import/scripts/normalize.mjs tests/questions/<year>/books.json $S/ocr [level]
```

- It joins wrapped lines (one line per question and per answer) and joins words hyphenated at the end of a line.
- It turns references `(18.14-17)` into `(18:14-17)`, cedilla `ş ţ` into comma `ș ț`, and closing quotes into `„…”`.
- It reports the question count against `count`, questions that don't have 3 answers, and suspicious characters.

## 4. Proofread (mandatory)

OCR mistakes are frequent: `l`↔`I` („lacov", „lerusalim", „loan"), `t`↔`l`/`ț`, missing `î/ă/â`, wrong names, answers
glued to the question line, watermark garbage. Compare **every** question and answer with `page-NNN.png` and fix the txt.
For a big book, split the work across parallel subagents, each with a group of books, its page range and the rules below:

- Format: `N. question (ref)` on one line, then `a) …` `b) …` `c) …`, with a blank line between questions. Keep the
  numbering continuous, exactly 3 answers, and the PDF order.
- References use `:` for every chapter:verse, e.g. `(1:3, 6, 2:1, 4)`.
- Diacritics use the comma below (`ș ț`), quotes are `„…”`, and real compounds keep their hyphen (`ardere-de-tot`, `s-a`).
- Write exactly `ambele variante de mai sus` and `niciuna dintre variantele de mai sus`: `bible.ts` relies on these
  phrases to disable shuffling and to convert the question to checkboxes.

Then run the checks again:

```bash
grep -nE "ş|ţ|\$|￿" tests/questions/<year>/*.txt
for f in tests/questions/<year>/*.txt; do awk -v f=$f 'BEGIN{RS=""}{n=split($0,a,"\n"); if(n!=4) print f": #"NR" has "n-1" answers"}' $f; done
```

## 5. Answers

OCR on the answer pages is noisy (`1-2`, `11-0`), so **transcribe the answers from the PNGs** into
`tests/questions/<year>/answers.txt`:

```
# 1. 1 Cronici
1-a
2-a
...

# 2. 2 Cronici
1-a
```

Cross-check the transcription against the OCR tokens. Every `N-x` that OCR read must agree with the transcription:

```bash
grep -oE "\b[0-9]+-[abc]\b" $S/ocr/page-<answers-page>.txt
```

## 6. Generate the JSON files and the summary

```bash
node .claude/skills/bible-pdf-import/scripts/build-json.mjs tests/questions/<year>/books.json
```

- It uses the same parsing as the UI (`getPreviewQuestions` → „Download new Questions"): `answers` are plain strings,
  and ids restart at 1 for each level.
- It writes `questions-<year>.json`, `answers-<year>.json` and `SUMMARY.md`.
- It exits with code 2 if a book's question count differs from its answer count.

## 7. `src/generators/bible.ts`

- Add one option per book, in a block `// ====== <year> ======`: `{ value: level, url: <year>, text, short }`.
  `short` is the book name used to build references (`"1 Ioan" + " 1:5"`). If a reference needs a different name, add
  `book` (e.g. `book: "Psalmul"`).
- The verses levels come **after** the books: `...generateVersesQuestions(<year>, <last book level + 1>)`. Years
  2024–2026 use the default 10, so their links keep working.
- `init()` sets `defaultLevels` to the first verses level of the selected year, so you don't need to change anything there.

## 8. Test and verify

- Copy `tests/integration/bible-2027.test.ts` to `bible-<year>.test.ts` and change `year`. The test checks the JSON
  against the txt files (through the real `getPreviewQuestions`), the answers against `answers.txt` and `SUMMARY.md`,
  that ids are continuous and that every question has 3 answers.
- Run `npm test` and `npx tsc --noEmit -p tsconfig.json`. Do **not** run `npm run build` or `deploy`, because they
  run git add, commit and push.

## Notes

- `?hints=` needs `src/data/bible/references-<year>.json` (verse texts); see the comment in `bible.ts` about how to
  collect them.
- `questions-<year>-verses.json` holds the verses to memorize. Compare it with the „Versete de memorat" pages of the PDF.
