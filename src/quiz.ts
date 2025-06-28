import { JsQuiz } from "./generators/js";
import { MathQuiz } from "./generators/math";
import { BibleQuiz } from "./generators/bible";
import { JsHomework } from "./generators/js-homework";
import {
  setLanguage,
  getEl,
  getUserName,
  hideEl,
  debounce,
  download,
  getStoredUserName,
  getEls
} from "./common/common";
import {
  Quiz,
  getParam,
  getLevels,
  isSubmitted,
  initTime,
  submitTest,
  setParam,
  setParams,
  collectAnswers,
  getPreviewQuestions,
  getFileName,
  createToolbar,
  createTbFill,
  createSelect,
  sortByLevel,
  printPage,
  getCountBlur,
  externalImport,
  selectQuestions,
  zipGradeCSV,
  getPrevAnswers,
  showStatistics
} from "./common/utilities";
import { simplePrompt, simpleAlert, simpleConfirm } from "./common/simplePrompt/simplePrompt";
import { getContextMenu, showByCursor } from "./common/tooltip/tooltip";
import { HtmlEditor } from "./components/htmlEditor";
import { getPublicTestLink, getQuestionIndexes } from "./common/links";

// =============================
const generators = {
  js: JsQuiz,
  "js-homework": JsHomework,
  math: MathQuiz,
  bible: BibleQuiz
};
// =============================

// Global functions
/**
 * @param defaultLevel
 * @param questions
 * @constructor
 */
window.LOAD_QUESTIONS = function (defaultLevel: number | null | undefined, questions: QuizOption[]) {
  //console.info("LOAD_QUESTIONS", defaultLevel, questions);
  window.ALL_QUESTIONS = [
    ...(window.ALL_QUESTIONS || []),
    ...questions.map(q => ({
      ...q,
      level: q.level || defaultLevel
    }))
  ];
};

// =============================

function getQuestionsByIdx(generator: QuizGenerator, groups: { [level: string]: number[] }) {
  let questions = Object.entries(groups).reduce((acc, [level, ids]) => {
    let currentLevel = parseInt(level);
    const levelQuestions = ids
      .map(id => generator.ALL_QUESTIONS.find(q => q.level == currentLevel && q.id === id))
      .filter(Boolean);
    acc.push(...levelQuestions);
    return acc;
  }, []);

  if (["questions", "q", "both"].includes(generator.shuffle)) {
    //@ts-ignore
    questions.shuffle();
  }
  return questions;
}

function getGenerator(domain: string): QuizGenerator {
  // @ts-ignore
  return generators[domain] || JsQuiz;
}

function initGeneratorParams(generator: QuizGenerator) {
  const limit = getParam("limit");
  if (limit) {
    generator.displayLimit = parseInt(limit);
  }
  const shuffle = getParam("shuffle") as ShuffleType;
  if (shuffle) {
    generator.shuffle = shuffle;
  }
  const correct = getParam("correct");
  if (correct === "true" || correct === "1") {
    generator.showCorrectAnswers = true;
  }
}

async function applyUserName(type: string, day: string, ask: boolean) {
  const userName = await getUserName(ask);
  if (day) {
    document.title = `${type}-test-${day}-${userName}`.replace("-&nbsp;", "");
  }
  getEls(".student-name").forEach(el => {
    el.innerHTML = userName;
  });
  return userName;
}

function previewQuestions(value: string, generator: QuizGenerator, lastId: number, level: number) {
  const questions = getPreviewQuestions(value, lastId, level);
  Quiz.removeAll();
  Quiz.render(questions, generator);
}

function initAddQuestionInput(generator: QuizGenerator, btn: HTMLButtonElement) {
  const [level] = getLevels(generator);
  const lastQ = generator.ALL_QUESTIONS.filter(q => q.level === level).slice(-1)[0];
  const lastId = lastQ ? lastQ.id : 0;
  getEl("#add-questions-wrapper").classList.remove("hide");
  getEl("#result").classList.add("hide");
  const addInput = getEl<HTMLInputElement>("#addQuestions");
  const storageKey = "quiz-add-questions";
  addInput.value = localStorage.getItem(storageKey) || "";
  addInput.addEventListener(
    "input",
    debounce(() => {
      const value = addInput.value;
      previewQuestions(value, generator, lastId, level);
      btn.disabled = value.trim() === "";
      localStorage.setItem(storageKey, value);
    }, 1000)
  );
}

function initCustomHeader(generator: QuizGenerator) {
  const searchParams = new URLSearchParams(location.search);
  const startTime = localStorage.getItem("quiz-test-start-time") || new Date().toISOString();
  const extraProps = {
    "user-name": getStoredUserName(),
    "start-time": startTime,
    "start-date": startTime.substring(0, 10)
  };
  let headerParam = getParam("header");
  if (headerParam) {
    headerParam = decodeURIComponent(escape(atob(headerParam)));
  }
  const textarea = HtmlEditor("", "<h1>Custom Header...</h1>");
  const el = getEl("#custom-header-editor");
  el.appendChild(textarea);
  let edit = false;
  if (localStorage.getItem("quiz-show-custom-header") === "1") {
    el.classList.remove("hide");
    edit = true;
  } else {
    el.classList.add("hide");
  }
  const storageKey = "quiz-custom-header";
  const initialValue = headerParam || (edit && localStorage.getItem(storageKey)) || generator.header || "";
  textarea.value = initialValue;
  applyCustomHeader(initialValue, searchParams, extraProps);

  textarea.addEventListener(
    "input",
    debounce(() => {
      localStorage.setItem(storageKey, textarea.value);
      applyCustomHeader(textarea.value, searchParams, extraProps);
    }, 1000)
  );
}

function replacePlaceHolders(value: string, props: Record<string, string>) {
  // replace placeholders from extra props
  Object.entries(props).forEach(([key, text]) => {
    // @ts-ignore
    value = value.replaceAll ? value.replaceAll(`{${key}}`, text) : value;
  });
  return value;
}

function applyCustomHeader(value: string, searchParams: URLSearchParams, props?: Record<string, string>) {
  const customHeader = getEl("#custom-header");

  // if value contains any string like "... {word} ..." then replace them with empty string
  //   create matchAll to create an array of all matches
  const matches = [...value.matchAll(/{([^}]+)}/g)];
  const keys = matches.map(match => match[1]);
  let templateValues = keys.reduce(
    (acc, key) => {
      acc[key] = "&nbsp;";
      return acc;
    },
    {} as Record<string, string>
  );
  //console.warn("templateValues", templateValues);

  templateValues = { ...templateValues, ...props };
  // replace placeholders from url params
  for (const [key, text] of searchParams.entries()) {
    templateValues[key] = text;
  }
  value = replacePlaceHolders(value, templateValues);

  // TODO HTML sanity check
  customHeader.innerHTML = value;
  if (value) {
    customHeader.classList.remove("hide");
    getEl("#main-header").classList.add("hide");
  } else {
    customHeader.classList.add("hide");
    getEl("#main-header").classList.remove("hide");
  }
}

function getContextMenuActions(e: MouseEvent, generator: QuizGenerator): Object[] {
  const body = getEl("body");
  const actions = [];

  actions.push({
    text: "Print",
    icon: "🖨️",
    itemId: "print",
    handler: () => {
      // hide count blur events
      const blurCount = getEl("#mainForm").dataset.blur;
      printPage();
    }
  });
  actions.push({
    text: document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen",
    icon: "🔲",
    itemId: "fullscreen",
    handler: () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  });

  actions.push("-");

  const correct = getParam("correct");
  const submitted = isSubmitted();
  const actionText =
    (submitted && !body.classList.contains("show-correct-answers")) || (!submitted && correct) ? "Hide" : "Show";
  actions.push({
    text: submitted ? `${actionText} correct questions` : `${actionText} correct answers`,
    icon: "📌",
    itemId: "toggleCorrect",
    handler: () => {
      if (submitted) {
        body.classList.toggle("show-correct-answers");
        // hide correct answers after submission
        const articles = getEls("article");
        articles.forEach(article => {
          const correct = article.classList.contains("correct");
          if (correct) {
            article.classList.toggle("hide");
          }
        });
      } else {
        setParam("correct", correct === "1" ? undefined : "1");
        window.location.reload();
      }
    }
  });

  if (generator.getOptions) {
    actions.push({
      text: "Statistics",
      icon: "📊️",
      itemId: "statistics",
      handler: async () => {
        const { values } = getPrevAnswers(generator);
        await showStatistics({
          newValues: values,
          options: generator.getOptions(),
          generator: generator
        });
      }
    });
  }

  // Add option to download ZipGrade CSV if test is submitted and the CSV is not empty
  if (submitted && generator.showCorrectAnswers && zipGradeCSV.length > 1) {
    actions.push({
      text: "Download ZipGrade CSV",
      icon: "📥",
      itemId: "downloadZipGradeCSV",
      handler: async () => {
        console.info("============================");
        console.info("  https://www.zipgrade.com  ");
        console.info("============================");
        const keyLetter = (await simplePrompt("Please provide Key Letter", "A")) || "A";
        const csvContent = zipGradeCSV.join(`\n${keyLetter},`);
        const date = new Date().toISOString().substring(0, 10);
        const fileName = `zipgrade-${keyLetter}-${date}.csv`;
        download(csvContent, fileName, "text/csv");
      }
    });
  }

  if (getParam("test")) {
    actions.push(togglePointsVisibility(body));
    return actions;
  }

  actions.push("-");

  const target = e.target as HTMLElement;
  if (target.closest("header") || target.closest("#custom-header-editor")) {
    const customHeaderEditor = getEl("#custom-header-editor");
    actions.push({
      text: customHeaderEditor.classList.contains("hide") ? "Show Custom header editor" : "Hide Custom header editor",
      icon: "📝",
      itemId: "customHeader",
      handler: () => {
        customHeaderEditor.classList.toggle("hide");
        if (customHeaderEditor.classList.contains("hide")) {
          localStorage.removeItem("quiz-show-custom-header");
        } else {
          localStorage.setItem("quiz-show-custom-header", "1");
        }
        // refresh to make sure the new header is applied (from localStorage if there are changes)
        window.location.reload();
      }
    });
  }

  if (target.closest("#custom-header")) {
    actions.push({
      text: "Set Custom header on URL",
      icon: "➔",
      itemId: "publishCustomHeader",
      handler: () => {
        const storageKey = "quiz-custom-header";
        const header = localStorage.getItem(storageKey) || "";
        const headerParam = btoa(unescape(encodeURIComponent(header)));
        setParam("header", headerParam);
      }
    });
  }

  if (!getEl("#main-header").classList.contains("hide")) {
    actions.push({
      text: body.classList.contains("hide-logo") ? "Show Logo" : "Hide Logo",
      icon: "🔲",
      itemId: "hideLogo",
      handler: () => {
        body.classList.toggle("hide-logo");
        if (body.classList.contains("hide-logo")) {
          localStorage.setItem("quiz-hide-logo", "1");
        } else {
          localStorage.removeItem("quiz-hide-logo");
        }
      }
    });
  }

  if (isSubmitted()) {
    actions.push(togglePointsVisibility(body));
    actions.push("-");
  }

  const index = getParam("index");
  const showId = index === "id";
  actions.push({
    text: showId ? "Hide ID's" : "Select questions by ID's",
    icon: "✅",
    itemId: "selectQuestions",
    handler: () => {
      if (showId) {
        setParam("shuffle");
        setParam("limit", "10");
        setParam("index");
      } else {
        setParam("test");
        setParam("shuffle", "none");
        setParam("limit", "10000"); // all
        setParam("index", "id");
      }
      allowUnload = true;
      window.location.reload();
    }
  });
  if (showId) {
    actions.push({
      text: "Select all",
      icon: "✅",
      itemId: "selectAll",
      handler: () => {
        selectQuestions();
      }
    });

    actions.push({
      text: "Select each (n) questions",
      icon: "✅",
      itemId: "selectEach",
      handler: async () => {
        const each = parseInt(await simplePrompt("Select (each) questions", "3"));
        const skip = parseInt(await simplePrompt("Skip first (skip) questions", "0"));
        const max = 100;

        selectQuestions(function (article, index, selected) {
          return selected < max && index % each === skip;
        });
      }
    });

    actions.push({
      text: "Generate Test Link",
      icon: "📋",
      itemId: "generateTestLink",
      handler: async () => {
        const type = await simplePrompt("Test type", getParam("type") || "practical");
        setParam("type", type);
        setParam("shuffle");
        setParam("limit");
        setParam("index");
        setParam("test", 1);
        setParam("correct", 1);
        allowUnload = true;
        window.location.reload();
      }
    });
  }

  return actions;
}

function togglePointsVisibility(body: HTMLElement): Object {
  return {
    text: body.classList.contains("hide-points") ? "Show Points" : "Hide Points",
    icon: "①",
    itemId: "hidePoints",
    handler: () => {
      body.classList.toggle("hide-points");
      if (body.classList.contains("hide-points")) {
        localStorage.setItem("quiz-hide-points", "1");
      } else {
        localStorage.removeItem("quiz-hide-points");
      }
    }
  };
}

function initContextMenu(generator: QuizGenerator) {
  const body = getEl("body");

  if (localStorage.getItem("quiz-hide-logo") === "1") {
    body.classList.add("hide-logo");
  }
  if (localStorage.getItem("quiz-hide-points") === "1") {
    body.classList.add("hide-points");
  }

  getEl("main").addEventListener("contextmenu", e => {
    e.preventDefault();
    const actions = getContextMenuActions(e, generator);
    const menu = getContextMenu(actions);
    showByCursor(menu, e);
  });
  getEl("#contextMenu").addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    const actions = getContextMenuActions(e, generator);
    const menu = getContextMenu(actions);
    showByCursor(menu, e);
  });
}

let allowUnload = getParam("allowUnload") === "true";
function preventTabRefresh() {
  window.addEventListener("beforeunload", event => {
    console.warn("beforeunload");
    if (!allowUnload) {
      event.preventDefault();
      event.returnValue = true;
    }
  });
}

function countBlurEvents() {
  let blurCount = 0;
  document.body.classList.add("focused");
  window.addEventListener("focus", () => {
    document.body.classList.add("focused");
  });
  window.addEventListener("blur", () => {
    console.warn("page blur");
    document.body.classList.remove("focused");
    if (getCountBlur()) {
      blurCount++;
      getEl("#mainForm").dataset.blur = blurCount.toString();
    }
  });
}

async function importPolyfills() {
  const requires = [];
  if (!String.prototype.padStart) {
    requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
  }
  if (!String.prototype.matchAll) {
    requires.push("https://cdnjs.cloudflare.com/ajax/libs/core-js/3.26.1/minified.js");
  }
  await externalImport(requires);
}

export const startQuiz = async () => {
  await importPolyfills();
  let questions;
  let groupsLink = getQuestionIndexes();
  const domain = getParam("domain") || "js";
  const generator = getGenerator(domain);
  initGeneratorParams(generator);
  await generator.init();
  document.title = generator.defaultTitle.replace("-&nbsp;", "");
  const isAdd = getParam("add") === "true";
  if (isAdd) {
    generator.shuffle = "none";
    getEl("#submit-test").style.display = "none";
    getEl("body").classList.add("middle-scroll");
    // ignore limit for now (All)
    setParams({ limit: 10000 });
  }
  let levels = getLevels(generator);

  const day = initTime();

  preventTabRefresh();
  countBlurEvents();

  const questionsEl = getEl("#questions");

  const type = getParam("type") || "theoretical";
  if (groupsLink) {
    if (JSON.stringify(groupsLink) === "{}") {
      console.info("Generate Test link...");
      const key = `quiz-${domain}-${type}`;
      const defaultTest = localStorage.getItem(key) || "";

      const enterMinutes = (await simplePrompt("Expire after (minutes)", "5")) || "5";
      const expire = parseInt(enterMinutes.trim()) || 5;
      const groupsString = await simplePrompt("<code>[CTRL+V]</code> Paste questions groups", defaultTest);
      const groups = JSON.parse(groupsString);
      localStorage.setItem(key, groupsString);

      if (!generator.ALL_QUESTIONS && generator.load) {
        await generator.load(levels);
      }

      const test = getPublicTestLink(groups, expire);
      groupsLink = getQuestionIndexes(test);
      setParams({ domain, type, test });
    } else {
      if (!generator.ALL_QUESTIONS && generator.load) {
        await generator.load(levels);
      }
    }
    await applyUserName(type, day, false);

    hideEl("#reset");
    questions = getQuestionsByIdx(generator, groupsLink);

    sortByLevel(questions, levels);
  } else {
    await applyUserName(type, "", false);
    questions = await generator.generateQuestions(levels);
  }

  if (!groupsLink) {
    const LevelSelector = generator.getLevelSelector(levels, async newLevels => {
      setParam("level", newLevels.join("-"));
      if (isAdd) {
        allowUnload = true;
        window.location.reload();
        return;
      }
      questions = await generator.generateQuestions(newLevels);
      await Quiz.reset(questions);
      generator.reset();
    });

    const toolbar = createToolbar();
    toolbar.style.alignItems = "center";
    toolbar.appendChild(LevelSelector);
    toolbar.appendChild(createTbFill());
    // TODO math & homework does not use limit for now...
    toolbar.appendChild(
      createSelect({
        id: "limitSelector",
        label: "Limit",
        cls: ["inline-input", "hide-on-print"],
        value: generator.displayLimit,
        options: [
          { value: 10, text: "10" },
          { value: 20, text: "20" },
          { value: 30, text: "30" },
          { value: 50, text: "50" },
          { value: 100, text: "100" },
          { value: 150, text: "150" },
          { value: 10000, text: "All" }
        ],
        onChange: async e => {
          const limit = parseInt((e.target as HTMLSelectElement).value);
          setParam("limit", limit);
          allowUnload = true;
          window.location.reload();
        }
      })
    );

    questionsEl.appendChild(toolbar);
    if (generator.toolbarRendered) {
      generator.toolbarRendered(toolbar);
    }
  }

  Quiz.render(questions, generator);

  // init events
  getEl("#reset").addEventListener("click", () => {
    Quiz.reset();
  });
  getEl("#submit-test").addEventListener("click", async () => {
    const userName = await getUserName();
    if (userName) {
      await submitTest(generator);
    } else {
      await applyUserName(type, day, true);
    }
  });
  getEl("#language-selector").addEventListener("click", e => {
    const target: any = e.target;
    if (target.matches("a")) {
      setLanguage(target.innerText);
    }
  });

  if (isAdd) {
    hideEl("#reset");
    const btn = createAddQuestionsButton(generator);
    createClearEntersButton(generator);
    initAddQuestionInput(generator, btn);
  }

  const index = getParam("index");
  const showId = index === "id";
  if (showId) {
    getEls<HTMLInputElement>("article .answer").forEach(input => (input.disabled = true));

    const copyIdsBtn = createCopyIdsBtn();
    const loadIdsBtn = createButton({
      text: "Select ID's",
      disabled: false,
      cls: ["primary", "hide-on-print"]
    });
    loadIdsBtn.addEventListener("click", async () => {
      const groupsString = await simplePrompt("Enter question groups", `{"3": [1, 2]}`);
      const groups = JSON.parse(groupsString) as { [level: string]: number[] };

      Object.entries(groups).forEach(([level, ids]) => {
        ids.forEach(id => {
          const article = getEl(`#q-${level}-${id}`);
          if (article) {
            article.classList.add("selected");
            getEl<HTMLInputElement>("input.select", article).checked = true;
          }
        });
      });

      const length = getSelectedIds().length;
      copyIdsBtn.disabled = length === 0;
      copyIdsBtn.innerHTML = `Copy ID's (${length})`;
    });
    getEl("#footer-actions").appendChild(loadIdsBtn);

    questionsEl.addEventListener("click", e => {
      const target: any = e.target;
      if (target.matches("article .select")) {
        const article = target.closest("article");
        article.classList.toggle("selected");
        const length = getSelectedIds().length;
        copyIdsBtn.disabled = length === 0;
        copyIdsBtn.innerHTML = `Copy ID's (${length})`;
      }
    });
  }

  initContextMenu(generator);
  initCustomHeader(generator);

  getEls(".student-name").forEach(el => {
    el.addEventListener("click", async () => {
      await applyUserName(type, day, true);
    });
  });
};

type ButtonConfig = {
  text: string;
  disabled: boolean;
  cls?: string[];
};
function createButton({ text, disabled, cls = [] }: ButtonConfig) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add(...cls);
  btn.innerHTML = text;
  btn.disabled = disabled;
  return btn;
}

function getSelectedIds() {
  return getEls<HTMLInputElement>("input[type=checkbox].select:checked").map(input => ({
    level: parseInt(input.closest("article").dataset.level),
    id: parseInt(input.value)
  }));
}

function processContent(content: string) {
  const lines = content.split("\n");
  const processedLines: string[] = [];
  lines.forEach((line: string) => {
    const isQuestion = line.match(/^\d+\.\s/);
    if (isQuestion || line.match(/^[a-zA-Z]\)\s/)) {
      processedLines.push(isQuestion ? "\n" + line : line);
    } else if (processedLines.length > 0) {
      processedLines[processedLines.length - 1] += " " + line.trim();
    }
  });
  return processedLines.join("\n").trim();
}

function createClearEntersButton(generator: QuizGenerator) {
  const btn = createButton({
    text: "Pre Process *",
    disabled: false,
    cls: ["hide-on-print"]
  });
  btn.addEventListener("click", () => {
    const [level] = getLevels(generator);
    const lastQ = generator.ALL_QUESTIONS.filter(q => q.level === level).slice(-1)[0];
    const lastId = lastQ ? lastQ.id : 0;
    const addInput = getEl<HTMLInputElement>("#addQuestions");
    addInput.value = processContent(addInput.value);
    previewQuestions(addInput.value, generator, lastId, level);
  });
  getEl("#footer-actions").appendChild(btn);
}

function createAddQuestionsButton(generator: QuizGenerator) {
  const btn = createButton({
    text: "Download new Questions",
    disabled: true,
    cls: ["primary", "hide-on-print"]
  });
  btn.addEventListener("click", async () => {
    const [firstUrl] = [].concat(generator.answersUrl);
    const response = await fetch(firstUrl);
    const correctAnswers = await response.json();
    const answers = collectAnswers();
    Object.entries(answers).forEach(([key, value]) => {
      const correctValues = value.filter(v => v.checked).map(v => v.value);
      const [level, id] = key.split("-");
      correctAnswers[level] = correctAnswers[level] || {};
      correctAnswers[level][id] = correctValues.length === 1 ? correctValues[0] : correctValues;
    });
    const all = [
      ...generator.ALL_QUESTIONS,
      // simplified version of answers
      ...Quiz.renderedQuestions.map(question => {
        return {
          ...question,
          answers: question.answers.map(answer => answer.text)
        };
      })
    ];

    // console.warn("out", all, correctAnswers);
    const questionsStr = JSON.stringify(all, null, 2);
    const answersStr = JSON.stringify(correctAnswers, null, 2);
    // navigator.clipboard.writeText(questionsStr);
    const answersUrl = getFileName(firstUrl) || "answers.json";
    const questionsUrl = getFileName(generator.questionsUrl) || "questions.json";
    download(questionsStr, questionsUrl, "application/json");
    download(answersStr, answersUrl, "application/json");
    console.warn("q", all);
    console.warn("correctAnswers", correctAnswers);
  });
  getEl("#footer-actions").appendChild(btn);
  return btn;
}

function createCopyIdsBtn() {
  const btn = createButton({
    text: "Copy ID's",
    disabled: true,
    cls: ["primary", "hide-on-print"]
  });
  btn.id = "copy-ids";
  btn.addEventListener("click", () => {
    const ids = getSelectedIds();
    const groups = groupIds(ids);
    navigator.clipboard.writeText(JSON.stringify(groups));
  });
  getEl("#footer-actions").appendChild(btn);
  return btn;
}

function groupIds(ids: { level: number; id: number }[]) {
  return ids.reduce(
    (acc, entity) => {
      acc[entity.level] = acc[entity.level] || [];
      acc[entity.level].push(entity.id);
      return acc;
    },
    {} as { [level: string]: number[] }
  );
}
