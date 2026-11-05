# Project coding standards

A browser-only quiz app that generates domain-specific questions (JavaScript, Bible, Math) with no backend. Built with Vanilla TypeScript/JS, bundled by Webpack, deployed as static files to `docs/` (GitHub Pages).

## Technologies

- **TypeScript / JavaScript** — prefer pure functions for new code
- **HTML / CSS** — no UI frameworks
- **Webpack 5** — bundles `src/` → `docs/`; entry point `src/index.ts`
- **Jest + ts-jest** — unit and integration tests in `tests/`
- No backend; all logic runs in the browser

## Architecture

Four layers:

1. **Generators** (`src/generators/`) — domain-specific question generators, each implementing `QuizGenerator`
2. **Quiz engine** (`src/quiz.ts`) — initializes the app, renders questions, handles submission & statistics
3. **Utilities** (`src/common/utilities.ts`) — answer rendering (`createAnswersSelector`), grading (`checkPoints`), shuffling
4. **Common helpers** (`src/common/common.ts`) — DOM utils, localization, localStorage, `debounce`, `download`

## Generators

Each quiz domain is a generator object implementing the `QuizGenerator` interface (see `src/@types/globals.d.ts`).

**Registered generators** (`src/quiz.ts`):

```ts
const generators = {
  js: JsQuiz,
  "js-homework": JsHomework,
  math: MathQuiz,
  bible: BibleQuiz
};
```

**To add a new generator**: implement `QuizGenerator`, export the object from `src/generators/<name>.ts`, and add it to the map above.

**Key `QuizGenerator` fields:**

```ts
interface QuizGenerator {
  domain: string; // unique key ("js", "math", "bible", ...)
  defaultTitle: string;
  shuffle: "none" | "questions" | "answers" | "both";
  displayLimit: number;
  defaultLevels?: number[];

  init(): Promise<void>;
  reset(): void;
  generateQuestions(levels: number[]): Promise<QuizOption[]>;
  getLevelSelector(level: number[], onChange: (levels: number[]) => void): HTMLElement;
  afterRender(): void; // post-render hook (e.g. init ACE editor)
  getOptions?(): BaseLevel[];
}
```

## Key Types (`src/@types/globals.d.ts`)

```ts
type QuizOption = {
  id: number;
  level: number;
  text: string;
  answerType: AnswerType; // "radio" | "text" | "number" | "checkbox"
  answers?: Answer[];
  groupId?: string; // deduplication key (for verse groups)
  shuffle?: boolean; // per-question override
  type?: CodeType; // "js" | "html" | "css" | "mixed" | "code"
  disabled?: boolean;
  [key: string]: any;
};

type Answer = {
  id: string | number;
  text: string | number;
  correct?: boolean | number;
  type?: CodeType;
};

type BaseLevel = { value: number; text: string; short?: string };

type CorrectAnswers = {
  [level: string]: { [id: string]: number | number[] };
};
```

## DOM Conventions

- **Always use** `getEl(selector)` / `getEls(selector)` from `src/common/common.ts` instead of raw `querySelector`
- CSS classes for state: `.hide`, `.show-correct-answers`, `.changed`, `.checked`, `.focused`
- Data attributes: `data-type` (code type), `data-readOnly`, `data-copy`

```ts
import { getEl, getEls } from "../common/common";
const form = getEl<HTMLFormElement>("#quiz-form");
const inputs = getEls<HTMLInputElement>("input[type=radio]");
```

## Data Loading

- **JSON data files** (`src/data/`) — load with `fetch()`, copied to `docs/data/` on build
- **JS question files** (`src/data/questions/*.js`) — loaded dynamically via `externalImport()` which injects a `<script>` tag; questions are delivered via `window.LOAD_QUESTIONS()` callback populating `window.ALL_QUESTIONS`
- **Bible data** — fetched from `src/data/bible/questions-{year}.json`, `references-{year}.json`, `answers-{year}.json`

## State Management

**localStorage keys** (all prefixed `quiz-`):

- `quiz-user-name` — stored user name
- `app-language` — locale (`"en"` | `"ro"`)
- `quiz-{domain}-{type}` — saved test link groups
- `quiz-hide-logo`, `quiz-hide-points`, `quiz-show-custom-header`, `quiz-custom-header`

**URL params**: `?domain=js&level=5-6&shuffle=both&limit=10&correct=1&type=practical`

## CSS Architecture

- `src/css/root.css` — CSS custom properties (design tokens)
- `src/css/style.css` — main quiz layout and form styles
- `src/css/print.css` — print optimizations
- `src/css/statistics.css` — statistics panel
- Component styles co-located: `src/common/tooltip/tooltip.css`, `src/components/multiselect/style.css`

## Build & Test Commands

```bash
npm start          # dev server with hot reload
npm run build      # production build → docs/
npm run qa         # build + serve docs/ locally
npm test           # run Jest tests once
npm run tests      # run Jest in watch mode
npm run deploy     # test → build → git commit → git push
```

## Localization

Locale strings live in `src/localization/js/{en,ro}.json` under two keys:

- `common` — UI strings
- `questions` — per-question overrides (text + optional answer translations)

Load via `applyTranslations(localization: Localization)`. Add new strings to both `en.json` and `ro.json`.
