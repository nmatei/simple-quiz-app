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
  getQuestionIndexes,
  getPublicTestLink,
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
  getCountBlur
} from "./common/utilities";
import { simplePrompt } from "./components/simplePrompt";
import { getContextMenu, showByCursor } from "./common/tooltip/tooltip";
import { HtmlEditor } from "./components/htmlEditor";

// =============================
const generators = {
  js: JsQuiz,
  "js-homework": JsHomework,
  math: MathQuiz,
  bible: BibleQuiz
};
// =============================

function getQuestionsByIdx(generator: QuizGenerator, indexes: number[]) {
  //console.warn("questions %o?", generator.ALL_QUESTIONS);
  let questions = indexes.map(i => generator.ALL_QUESTIONS[i]);
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
    document.title = `${type}-test-${day}-${userName}`;
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
  const lastQ = generator.ALL_QUESTIONS.slice(-1)[0];
  const lastId = lastQ ? lastQ.id : 0;
  const levels = getLevels();
  getEl("#add-questions-wrapper").classList.remove("hide");
  getEl("#result").classList.add("hide");
  const addInput = getEl<HTMLInputElement>("#addQuestions");
  const storageKey = "quiz-add-questions";
  addInput.value = localStorage.getItem(storageKey) || "";
  addInput.addEventListener(
    "input",
    debounce(() => {
      const value = addInput.value;
      previewQuestions(value, generator, lastId, levels[0]);
      btn.disabled = value.trim() === "";
      localStorage.setItem(storageKey, value);
    }, 1000)
  );
}

function initCustomHeader() {
  const searchParams = new URLSearchParams(location.search);
  const extraProps = {
    "user-name": getStoredUserName(),
    "start-time": localStorage.getItem("quiz-test-start-time")
  };
  let headerParam = getParam("header");
  if (headerParam) {
    headerParam = decodeURIComponent(escape(atob(headerParam)));
  }
  const textarea = HtmlEditor("", "<h1>Custom Header...</h1>");
  const el = getEl("#custom-header-editor");
  el.appendChild(textarea);
  if (localStorage.getItem("quiz-show-custom-header") === "1") {
    el.classList.remove("hide");
  } else {
    el.classList.add("hide");
  }
  const storageKey = "quiz-custom-header";
  const initialValue = headerParam || localStorage.getItem(storageKey) || "";
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

function applyCustomHeader(value: string, searchParams: URLSearchParams, extraProps?: Record<string, string>) {
  const customHeader = getEl("#custom-header");
  // replace placeholders from url params
  for (const [key, text] of searchParams.entries()) {
    // @ts-ignore
    value = value.replaceAll(`{${key}}`, text);
  }
  // replace placeholders from extra props
  Object.entries(extraProps).forEach(([key, text]) => {
    // @ts-ignore
    value = value.replaceAll(`{${key}}`, text);
  });
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

function getContextMenuActions(e: MouseEvent) {
  const body = getEl("body");
  const actions = [];

  actions.push({
    text: "Print",
    icon: "🖨️",
    itemId: "print",
    handler: () => {
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
  actions.push({
    text: "Hide/Show correct answers",
    icon: "📌",
    itemId: "showWrong",
    handler: () => {
      const articles = getEls("article");
      articles.forEach(article => {
        const correct = article.classList.contains("correct");
        if (correct) {
          article.classList.toggle("hide");
        }
      });
    }
  });

  if (getParam("test")) {
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
  actions.push({
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
  });
  actions.push("-");

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
        const articles = document.querySelectorAll("article");
        let length = 0;
        articles.forEach(article => {
          if (!article.classList.contains("disabled")) {
            article.classList.add("selected");
            getEl<HTMLInputElement>("input.select", article).checked = true;
            length++;
          }
        });
        const copyIdsBtn = getEl<HTMLButtonElement>("#copy-ids");
        copyIdsBtn.disabled = length === 0;
        copyIdsBtn.innerHTML = `Copy ID's (${length})`;
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

function initContextMenu() {
  const body = getEl("body");

  if (localStorage.getItem("quiz-hide-logo") === "1") {
    body.classList.add("hide-logo");
  }
  if (localStorage.getItem("quiz-hide-points") === "1") {
    body.classList.add("hide-points");
  }

  body.addEventListener("contextmenu", e => {
    e.preventDefault();

    const actions = getContextMenuActions(e);

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

export const startQuiz = async () => {
  let questions;
  let indexes = getQuestionIndexes();
  const domain = getParam("domain") || "js";
  const generator = getGenerator(domain);
  initGeneratorParams(generator);
  await generator.init();
  document.title = generator.defaultTitle;
  const isAdd = getParam("add") === "true";
  if (isAdd) {
    generator.shuffle = "none";
    getEl("#submit-test").style.display = "none";
    getEl("body").classList.add("middle-scroll");
  }
  let levels = getLevels();

  const day = initTime();

  preventTabRefresh();
  countBlurEvents();

  const questionsEl = getEl("#questions");

  const type = getParam("type") || "theoretical";
  if (indexes) {
    if (indexes.length === 1) {
      console.info("Generate Test link...");
      const key = `quiz-${domain}-${type}`;
      const defaultTest = localStorage.getItem(key) || "";

      const enterMinutes = (await simplePrompt("Expire after (minutes)", "5")) || "5";
      const expire = parseInt(enterMinutes.trim()) || 5;
      const ids = (await simplePrompt("Enter questions IDS (comma separated)", defaultTest)).split(/\s*,\s*/gi);

      localStorage.setItem(key, ids.join(", "));

      if (!generator.ALL_QUESTIONS && generator.load) {
        await generator.load(levels);
      }

      const test = getPublicTestLink(generator, ids, expire);
      indexes = getQuestionIndexes(test);
      console.debug("indexes", indexes);
      setParams({ domain, type, test });
    } else {
      if (!generator.ALL_QUESTIONS && generator.load) {
        await generator.load(levels);
      }
    }
    await applyUserName(type, day, false);

    hideEl("#reset");
    questions = getQuestionsByIdx(generator, indexes);

    sortByLevel(questions, levels);
  } else {
    applyUserName(type, "", false);
    questions = await generator.generateQuestions(levels);
  }

  if (!indexes) {
    const LevelSelector = generator.getLevelSelector(levels, async newLevels => {
      setParam("level", newLevels.join("-"));
      if (isAdd) {
        allowUnload = true;
        window.location.reload();
        return;
      }
      questions = await generator.generateQuestions(newLevels);
      Quiz.reset(questions);
      generator.reset();
    });

    const toolbar = createToolbar();
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
  }

  Quiz.render(questions, generator);

  // init events
  getEl("#reset").addEventListener("click", () => {
    Quiz.reset();
  });
  getEl("#submit-test").addEventListener("click", async () => {
    const userName = await getUserName();
    if (userName) {
      submitTest(generator);
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
    const copyIdsBtn = createCopyIdsBtn();
    const loadIdsBtn = createButton({
      text: "Select ID's",
      disabled: false,
      cls: ["primary", "hide-on-print"]
    });
    loadIdsBtn.addEventListener("click", async () => {
      const ids = (await simplePrompt("Enter questions IDS (comma separated)", "1, 2")).split(/\s*,\s*/gi);
      ids.forEach(id => {
        const article = getEl(`#q-${id}`);
        if (article) {
          article.classList.add("selected");
          getEl<HTMLInputElement>("input.select", article).checked = true;
        }
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

  initContextMenu();
  initCustomHeader();

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
  const ids = Array.from(document.querySelectorAll<HTMLInputElement>("input[type=checkbox].select:checked")).map(
    input => input.value
  );
  console.warn("copy", ids);
  return ids;
}

function createClearEntersButton(generator: QuizGenerator) {
  const btn = createButton({
    text: "Remove Enters",
    disabled: false,
    cls: ["hide-on-print"]
  });
  btn.addEventListener("click", () => {
    const lastQ = generator.ALL_QUESTIONS.slice(-1)[0];
    const lastId = lastQ ? lastQ.id : 0;
    const levels = getLevels();
    const addInput = getEl<HTMLInputElement>("#addQuestions");
    addInput.value = addInput.value.replace(/\n{2,}/gi, "\n");
    previewQuestions(addInput.value, generator, lastId, levels[0]);
  });
  getEl("#footer-actions").appendChild(btn);
}

function createAddQuestionsButton(generator: QuizGenerator) {
  const btn = createButton({
    text: "Add Questions",
    disabled: true,
    cls: ["primary", "hide-on-print"]
  });
  btn.addEventListener("click", async () => {
    const response = await fetch(generator.answersUrl);
    const correctAnswers = await response.json();
    const answers = collectAnswers();
    Object.entries(answers).forEach(([key, value]) => {
      const correctValues = value.filter(v => v.checked).map(v => v.value);
      correctAnswers[key] = correctValues.length === 1 ? correctValues[0] : correctValues;
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
    const answersUrl = getFileName(generator.answersUrl) || "answers.json";
    const questionsUrl = getFileName(generator.questionsUrl) || "questions.json";
    download(questionsStr, questionsUrl, "application/json");
    download(answersStr, answersUrl, "application/json");
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
    navigator.clipboard.writeText(ids.join(", "));
  });
  getEl("#footer-actions").appendChild(btn);
  return btn;
}
