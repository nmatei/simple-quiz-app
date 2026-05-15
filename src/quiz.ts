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
  setUserName,
  getEls,
  sleep
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
  getHintsParam,
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
import { getContextMenu, showBy, showByCursor } from "./common/tooltip/tooltip";
import { HtmlEditor } from "./components/htmlEditor";
import { getPublicTestLink, getQuestionIndexes } from "./common/links";
import { icons } from "./images/icons";

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
  applyCustomHeader(initialValue, searchParams, extraProps, generator);

  textarea.addEventListener(
    "input",
    debounce(() => {
      localStorage.setItem(storageKey, textarea.value);
      applyCustomHeader(textarea.value, searchParams, extraProps, generator);
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

function applyCustomHeader(value: string, searchParams: URLSearchParams, props?: Record<string, string>, generator?: QuizGenerator) {
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

  const defaultParams = (generator?.defaultHeaderParams || {}) as Record<string, string>;
  templateValues = { ...templateValues, ...defaultParams, ...props };
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
    (submitted && !body.classList.contains("show-correct-answers")) ||
    (!submitted && (correct === "true" || correct === "1"))
      ? "Hide"
      : "Show";
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
          const isCorrect = article.classList.contains("correct");
          if (isCorrect) {
            article.classList.toggle("hide");
          }
        });
      } else {
        setParam("correct", correct === "true" || correct === "1" ? undefined : "1");
        window.location.reload();
      }
    }
  });

  if (submitted && (correct === "true" || correct === "1")) {
    actions.push({
      text: body.classList.contains("show-only-correct-answers") ? "Show all answers" : "Show correct answers only",
      icon: "✅",
      itemId: "toggleCorrectOnly",
      handler: () => {
        body.classList.toggle("show-only-correct-answers");
      }
    });
  }

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

  const isTest = getParam("test");
  if (isTest) {
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

  // Trainer Tools submenu
  actions.push({
    text: "Trainer Tools",
    icon: "🎯",
    itemId: "trainerTools",
    rightIcon: icons.rightArrow,
    handler: () => {
      displayTrainerMenu(e, generator, submitted);
    }
  });

  // hints
  actions.push("-");
  actions.push({
    text: "Hints",
    icon: "💡",
    itemId: "hints",
    rightIcon: icons.rightArrow,
    handler: () => {
      displayHintMenu(e);
    }
  });

  return actions;
}

function displayTrainerMenu(e: MouseEvent, generator: QuizGenerator, submitted: boolean) {
  const index = getParam("index");
  const showId = index === "id";

  const items: Object[] = ["🎯 Trainer Tools", "-"];

  items.push({
    text: showId ? "Student Mode" : "Prepare Test",
    icon: showId ? "🎓" : "📝",
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
    items.push("-");
    items.push({
      text: "Select All",
      icon: "✅",
      itemId: "selectAll",
      handler: () => {
        selectQuestions(() => true, generator);
      }
    });
    items.push({
      text: "Select each (n) questions",
      icon: "✅",
      itemId: "selectEach",
      handler: async () => {
        const each = parseInt(await simplePrompt("Select (each) questions", "3"));
        const skip = parseInt(await simplePrompt("Skip first (skip) questions", "0"));
        const max = parseInt(await simplePrompt("Maximum questions to select", "100"));
        selectQuestions(function (article, index, selected) {
          return selected < max && index % each === skip;
        }, generator);
      }
    });
    items.push({
      text: "Select by ID's",
      icon: "✅",
      itemId: "selectByIds",
      handler: async () => {
        await selectByIdsPrompt();
      }
    });

    items.push("-");
    items.push({
      text: "Generate Test Link",
      icon: "📋",
      itemId: "generateTestLink",
      handler: async () => {
        const type = await simplePrompt("Test type", getParam("type") || "practical", "", { outsideClickClose: false });
        setParams({
          type,
          shuffle: undefined,
          limit: undefined,
          index: undefined,
          test: 1,
          correct: 1
        });
        allowUnload = true;
        window.location.reload();
      }
    });
    items.push({
      text: "Generate Complete <strong>Test Set</strong>",
      icon: "📦",
      itemId: "generateCompleteTestSet",
      handler: async () => {
        const ids = getSelectedIds();
        if (ids.length === 0) {
          await simpleAlert("No questions selected. Please select questions first.");
          return;
        }
        const domain = getParam("domain") || "js";
        const type =
          (await simplePrompt("Test type", getParam("type") || "practical", "", { outsideClickClose: false })) ||
          "practical";
        const expire = await promptExpireMinutes();
        const groups = groupIds(ids);
        // Save groups for future manual use (pre-fills the "Paste questions groups" prompt)
        localStorage.setItem(`quiz-${domain}-${type}`, JSON.stringify(groups));
        const generatedAt = new Date().toISOString();
        const validUntilISO = new Date(Date.now() + expire * 60000).toISOString();
        // Deep-clone groups before getPublicTestLink mutates them
        const testEncoded = getPublicTestLink(JSON.parse(JSON.stringify(groups)), expire);
        const autoState: AutoTestSetState = { type, domain, expire, groups, generatedAt, validUntilISO };
        localStorage.setItem("quiz-auto-generate-test-set", JSON.stringify(autoState));
        setParams({
          shuffle: undefined,
          limit: undefined,
          index: undefined,
          type,
          test: testEncoded,
          correct: 1
        });
        allowUnload = true;
        window.location.reload();
      }
    });
  }

  if (submitted && generator.showCorrectAnswers && zipGradeCSV.length > 1) {
    items.push({
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

  const menu = getContextMenu(items, true);
  showByCursor(menu, e);
}

function displayHintMenu(e: MouseEvent) {
  const currentHint = getHintsParam();
  const hintOptions: (
    | {
        value: string | null;
        text: string;
        cls?: string;
        icon: string;
        state?: number;
      }
    | string
  )[] = [
    {
      value: null,
      text: "Disabled - Testing Mode",
      icon: icons.close
    },
    "-",
    {
      value: "click",
      text: "<strong>Click</strong> to show hints",
      icon: "👆"
    },
    {
      value: "left",
      state: 2,
      text: "<strong>Left</strong> side",
      icon: icons.screenSources,
      cls: "screen-source"
    },
    {
      value: "right",
      state: 1,
      text: "<strong>Right</strong> side",
      icon: icons.screenSources,
      cls: "screen-source"
    },
    {
      value: "top",
      state: 2,
      text: "<strong>Top</strong> side",
      icon: icons.screenSources,
      cls: "screen-source rotate-90"
    },
    {
      value: "bottom",
      state: 1,
      text: "<strong>Bottom</strong> side",
      icon: icons.screenSources,
      cls: "screen-source rotate-90"
    }
  ];

  const menu = getContextMenu(
    [
      "Select Hint type",
      "-",
      ...hintOptions.map(opt =>
        typeof opt === "string"
          ? opt
          : {
              text: opt.text,
              cls: opt.cls,
              icon: opt.icon,
              active: opt.value === null ? !currentHint : currentHint === opt.value,
              data: { state: opt.state },
              handler: () => {
                if (opt.value === null) {
                  setParam("hint");
                } else {
                  setParams({ hint: opt.value });
                }
                allowUnload = true;
                window.location.reload();
              }
            }
      )
    ],
    true
  );
  showByCursor(menu, e);
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
    if (e.ctrlKey) return;
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

type AutoTestSetState = {
  domain: string;
  type: string;
  expire: number;
  groups: { [level: string]: number[] };
  generatedAt: string;
  validUntilISO: string;
};

async function promptExpireMinutes(): Promise<number> {
  const defaultHints = [
    { value: "5", text: "5 min" },
    { value: "10", text: "10 min" },
    { value: "30", text: "30 min" },
    { value: "1440", text: "1 day" },
    { value: "2880", text: "2 days" },
    { value: "43200", text: "30 days" }
  ]
    .map(hint => `<a href="#" data-value="${hint.value}">${hint.text}</a>`)
    .join(", ");

  setTimeout(() => {
    getEl("#custom-prompt-container")?.addEventListener("click", function (e) {
      const target = e.target as HTMLElement;
      if (target.matches("#custom-prompt-container a")) {
        e.preventDefault();
        const value = target.dataset.value;
        if (value) {
          getEl<HTMLInputElement>("#custom-prompt-input").value = value;
        }
      }
    });
  }, 100);

  const enterMinutes =
    (await simplePrompt(
      `<strong>Expire after (minutes):</strong>
      <div style="padding: 3px">${defaultHints}</div>`,
      "5",
      "",
      { outsideClickClose: false }
    )) || "5";

  return parseInt(enterMinutes.trim()) || 5;
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

      const expire = await promptExpireMinutes();

      // TODO store selected values (ids) in local storage
      //   and allow "pasting/filling" them from prompt if user has different value in clipboard
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
      text: "Select by ID's",
      disabled: false,
      cls: ["primary", "hide-on-print"]
    });
    loadIdsBtn.addEventListener("click", selectByIdsPrompt);
    getEl("#footer-actions").appendChild(loadIdsBtn);

    questionsEl.addEventListener("click", e => {
      const target: any = e.target;
      if (target.matches("article .select")) {
        const article = target.closest("article");
        article.classList.toggle("selected");
        const length = getSelectedIds().length;
        copyIdsBtn.disabled = length === 0;
        copyIdsBtn.innerHTML = `Copy ID's (${length})`;
        // update title with selected count
        document.title = generator.defaultTitle.replace("-&nbsp;", "") + (length > 0 ? ` - ${length} selected` : "");
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

  // Auto-complete: triggered by "Generate Complete Test Set" from trainer mode
  const autoSetJson = localStorage.getItem("quiz-auto-generate-test-set");
  if (autoSetJson && groupsLink && JSON.stringify(groupsLink) !== "{}") {
    localStorage.removeItem("quiz-auto-generate-test-set");
    const autoState = JSON.parse(autoSetJson) as AutoTestSetState;
    await runGenerateTestSet(autoState, generator, type, day);
  }
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
    const [firstUrl] = ([] as string[]).concat(generator.answersUrl as string[]);
    const response = await fetch(firstUrl, { cache: "reload" });
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

async function selectByIdsPrompt() {
  const groupsString = (await simplePrompt("Enter question groups", `{"3": [1, 2]}`)) || "{}";
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
  const copyIdsBtn = getEl<HTMLButtonElement>("#copy-ids");
  if (copyIdsBtn) {
    copyIdsBtn.disabled = length === 0;
    copyIdsBtn.innerHTML = `Copy ID's (${length})`;
  }
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

function buildInstructionsHtml(params: {
  type: string;
  day: string;
  keyLetter: string;
  expire: number;
  domain: string;
  groups: { [level: string]: number[] };
  generatedAt: string;
  validUntilISO: string;
  testLink: string;
}): string {
  const { type, day, keyLetter, expire, domain, groups, generatedAt, validUntilISO, testLink } = params;
  const groupsJson = JSON.stringify(groups);
  const generatedAtStr = new Date(generatedAt).toLocaleString();
  const validUntilStr = new Date(validUntilISO).toLocaleString();
  const blankTitle = `${type}-test-${day}-${keyLetter}`;
  const answersTitle = `${type}-test-${day}-${keyLetter}-answers`;
  const csvFileName = `${type}-test-${day}-${keyLetter}-answers-zipgrade`;
  const instructionsFileName = `${type}-test-${day}-${keyLetter}-instructions`;

  // Strip allowUnload from the test link (it's an internal trainer param)
  const cleanTestLink = (() => {
    try {
      const u = new URL(testLink);
      u.searchParams.delete("allowUnload");
      return u.toString();
    } catch {
      return testLink;
    }
  })();

  const favicon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect x='4' y='2' width='24' height='28' rx='3' fill='%231a5276'/><rect x='8' y='8' width='16' height='2' rx='1' fill='white' opacity='.6'/><rect x='8' y='13' width='16' height='2' rx='1' fill='white' opacity='.6'/><rect x='8' y='18' width='10' height='2' rx='1' fill='white' opacity='.6'/><circle cx='23' cy='23' r='7' fill='%23e8a020'/><circle cx='23' cy='19' r='1.3' fill='white'/><rect x='21.7' y='21.5' width='2.6' height='4.5' rx='1.3' fill='white'/></svg>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Instructions — ${blankTitle}</title>
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <style>
    body{font-family:Arial,sans-serif;max-width:860px;margin:40px auto;padding:0 24px;color:#333;background:#f5f6fa}
    h1{color:#1a5276;border-bottom:3px solid #1a5276;padding-bottom:10px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between}
    h2{color:#1a5276;margin:0 0 14px;display:flex;align-items:center;justify-content:space-between}
    h3{color:#2c3e50;margin:16px 0 8px}
    .section{background:#fff;border-radius:8px;padding:20px 24px;margin-bottom:20px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
    table{border-collapse:collapse;width:100%}
    td{padding:7px 12px;border-bottom:1px solid #e8e8e8}
    td:first-child{font-weight:bold;color:#555;width:160px;white-space:nowrap}
    pre{background:#f4f4f4;border:1px solid #ddd;border-radius:4px;padding:14px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;font-size:13px;margin:8px 0 0}
    code{font-family:'Courier New',monospace}
    a{color:#1a5276;word-break:break-all}
    ol,ul{padding-left:22px;line-height:1.9;margin:8px 0}
    .badge{display:inline-block;background:#1a5276;color:#fff;border-radius:4px;padding:2px 12px;font-size:15px;font-weight:bold;vertical-align:middle}
    .note{background:#fff3cd;border-left:4px solid #f0ad4e;padding:10px 16px;border-radius:0 4px 4px 0;margin:0 0 12px}
    .fn{font-family:'Courier New',monospace;background:#eef;padding:1px 7px;border-radius:3px;font-size:13px}
    .copy-btn{cursor:pointer;background:#1a5276;color:#fff;border:none;border-radius:4px;padding:4px 12px;font-size:13px;margin-left:10px;vertical-align:middle}
    .copy-btn:hover{background:#2471a3}
    .copy-btn.copied{background:#28a745}
  </style>
</head>
<body>
  <h1><span>&#x1F4CB; Test Instructions</span><span class="badge">${keyLetter}</span></h1>

  <div class="section">
    <h2>&#x1F4C5; General information</h2>
    <table>
      <tr><td>Generated</td><td>${generatedAtStr}</td></tr>
      <tr><td>Valid Until</td><td>${validUntilStr} (${expire} min)</td></tr>
      <tr><td>Domain</td><td>${domain}</td></tr>
      <tr><td>Type</td><td>${type}</td></tr>
      <tr><td>Key Letter</td><td><strong>${keyLetter}</strong></td></tr>
    </table>
  </div>

  <div class="section">
    <h2>&#x1F517; Test Link <button class="copy-btn" data-copy="${cleanTestLink}">Copy</button></h2>
    <pre><code><a href="${cleanTestLink}" target="_blank">${cleanTestLink}</a></code></pre>
  </div>

  <div class="section">
    <h2>&#x1F4DD; Selected Questions <button class="copy-btn" data-copy="${groupsJson.replace(/"/g, "&quot;")}">Copy</button></h2>
    <div class="note">
      To restore this question set: go to <strong>Prepare Test</strong> mode &rarr; click the
      <strong>Select by ID's</strong> button at the bottom of the page &rarr; paste the JSON below.
    </div>
    <pre><code>${groupsJson}</code></pre>
  </div>

  <div class="section">
    <h2>&#x1F4C1; Generated Files</h2>
    <ol>
      <li><span class="fn">${blankTitle}.pdf</span> &mdash; Blank test (print and give to students)</li>
      <li><span class="fn">${answersTitle}.pdf</span> &mdash; Answer key (use for grading)</li>
      <li><span class="fn">${csvFileName}.csv</span> &mdash; ZipGrade answer key</li>
      <li><span class="fn">${instructionsFileName}.html</span> &mdash; This file</li>
    </ol>
  </div>

  <div class="section">
    <h2>&#x2705; Grading Instructions</h2>
    <h3>Manual Grading</h3>
    <ol>
      <li>Print the answer key: <span class="fn">${answersTitle}.pdf</span></li>
      <li>Compare student answers with the highlighted correct answers</li>
    </ol>
    <h3>ZipGrade Grading</h3>
    <ol>
      <li>Upload <span class="fn">${csvFileName}.csv</span> to <a href="https://www.zipgrade.com" target="_blank">zipgrade.com</a> or the ZipGrade app</li>
      <li>Scan student answer sheets</li>
    </ol>
  </div>

<script>
  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
</script>
</body>
</html>`;
}

type TestSetFileNames = {
  keyLetter: string;
  blankTitle: string;
  answersTitle: string;
  csvFileName: string;
  instructionsFileName: string;
};

function buildTestSetConfirmHtml(params: TestSetFileNames & { printHint: string }): string {
  const { keyLetter, blankTitle, answersTitle, csvFileName, instructionsFileName, printHint } = params;
  return `<strong>&#x1F4E6; Generate Complete Test Set &mdash; Key: ${keyLetter}</strong>
    <div style="margin-top:10px">Steps that <strong>will happen automatically:</strong></div>
    <ul style="margin:8px 0;padding-left:0;list-style:none;line-height:2">
      <li><span style="margin-right:6px">⬜</span><code>${blankTitle}.pdf</code> &mdash; Print Blank Test (dialog 1)</li>
      <li><span style="margin-right:6px">⬜</span><code>${answersTitle}.pdf</code> &mdash; Print Answer Key (dialog 2)</li>
      <li><span style="margin-right:6px">⬜</span><code>${csvFileName}.csv</code> &mdash; Download ZipGrade CSV</li>
      <li><span style="margin-right:6px">⬜</span><code>${instructionsFileName}.html</code> &mdash; Download Instructions</li>
    </ul>
    <div style="background:#fff3cd;border-left:3px solid #f0ad4e;padding:7px 12px;border-radius:0 4px 4px 0;margin-top:6px">
      &#x26A0;&#xFE0F; Two print dialogs will open.<br>
      ${printHint}.<br>
      Uncheck <strong>Print headers and footers</strong>.
    </div>`;
}

function buildTestSetCompleteHtml(): string {
  return `<div style="margin-top:12px">&#x1F4DD; <strong>Grading:</strong></div>
    <ul style="margin:8px 0;padding-left:22px;line-height:1.9">
      <li>&#x1F4C4; Manual: Use the answer key PDF to grade student papers</li>
      <li>&#x1F4F1; ZipGrade: Upload CSV to <a href="https://www.zipgrade.com" target="_blank">zipgrade.com</a> and scan student sheets</li>
    </ul>
    <div style="margin-top:10px;background:#d4edda;border-left:3px solid #28a745;padding:7px 12px;border-radius:0 4px 4px 0">
      &#x1F3E0; You will be redirected to the main page.
    </div>`;
}

function buildTestSetProgressHtml(params: TestSetFileNames): string {
  const { keyLetter, blankTitle, answersTitle, csvFileName, instructionsFileName } = params;
  return `<div id="progress-title"><strong>&#x1F4E6; Generating Test Set &mdash; Key: ${keyLetter}</strong></div>
    <div style="margin-top:10px">&#x1F4E5; <strong>Files saved to your Downloads:</strong></div>
    <ul style="margin:8px 0;padding-left:0;list-style:none;line-height:2">
      <li><span id="progress-step-0" style="margin-right:6px">⬜</span><code>${blankTitle}.pdf</code> &mdash; Blank Test (print dialog 1)</li>
      <li><span id="progress-step-1" style="margin-right:6px">⬜</span><code>${answersTitle}.pdf</code> &mdash; Answer Key (print dialog 2)</li>
      <li><span id="progress-step-2" style="margin-right:6px">⬜</span><code>${csvFileName}.csv</code> &mdash; ZipGrade CSV</li>
      <li><span id="progress-step-3" style="margin-right:6px">⬜</span><code>${instructionsFileName}.html</code> &mdash; Instructions</li>
    </ul>
    <div id="progress-complete" style="display:none">${buildTestSetCompleteHtml()}</div>`;
}

function updateProgressStep(stepIndex: number) {
  const el = getEl(`#progress-step-${stepIndex}`);
  if (el) el.textContent = "✅";
}

function finalizeProgress(keyLetter: string) {
  const titleEl = getEl("#progress-title");
  if (titleEl) titleEl.innerHTML = `<strong>&#x2705; Test Set Complete! (Key: ${keyLetter})</strong>`;
  const completeEl = getEl("#progress-complete");
  if (completeEl) completeEl.style.display = "";
}

export async function runGenerateTestSet(state: AutoTestSetState, generator: QuizGenerator, type: string, day: string) {
  // Store original name so we can restore it after
  const originalName = getStoredUserName();

  // Set name to &nbsp; so the student name field appears blank on the printed test
  setUserName("&nbsp;");
  await applyUserName(type, day, false);
  // Title is now: ${type}-test-${day}  (the "-&nbsp;" suffix is stripped by applyUserName)

  // Prompt for key letter before printing so trainer can generate multiple versions (A, B, C...)
  const keyLetter = (await simplePrompt("Key Letter (A, B, C...)", "A", "", { outsideClickClose: false })) || "A";

  // Append key letter to title: ${type}-test-${day}-A
  document.title = `${type}-test-${day}-${keyLetter}`;
  const blankTitle = document.title;
  const answersTitle = `${type}-test-${day}-${keyLetter}-answers`;
  const csvFileName = `${type}-test-${day}-${keyLetter}-answers-zipgrade`;
  const instructionsFileName = `${type}-test-${day}-${keyLetter}-instructions`;
  const fileNames: TestSetFileNames = { keyLetter, blankTitle, answersTitle, csvFileName, instructionsFileName };

  // Show initial confirmation with all steps and actual filenames
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const printHint = isSafari
    ? `In the print dialog click <strong>PDF &rarr; Save as PDF</strong>`
    : `In the print dialog set <strong>Destination: Save as PDF</strong>`;
  const confirmed = await simpleConfirm(buildTestSetConfirmHtml({ ...fileNames, printHint }), {
    ok: "Start",
    cancel: "Cancel",
    focus: "yes",
    outsideClickClose: false
  });

  if (!confirmed) {
    // Restore on cancel
    setUserName(originalName);
    document.title = `${type}-test-${day}-${originalName}`.replace("-&nbsp;", "");
    getEls<HTMLElement>(".student-name").forEach(el => (el.innerHTML = originalName || "&nbsp;"));
    return;
  }

  // Show progress dialog (non-awaited — hidden on print, auto-updates after each step)
  const progressPromise = simpleAlert(buildTestSetProgressHtml(fileNames), { esc: false, outsideClickClose: false });
  document.getElementById("custom-prompt-container")?.classList.add("hide-on-print");
  // Disable OK until all steps complete
  const progressOkBtn = getEl<HTMLButtonElement>("#custom-prompt-container button[type='submit']");
  if (progressOkBtn) progressOkBtn.disabled = true;

  // 1. Print blank test (window.print() blocks until dialog is closed)
  await printPage();
  updateProgressStep(0);
  await sleep(2000);

  // Submit test — skip auto-print and statistics dialog
  await submitTest(generator, { skipPrint: true, skipStatistics: true });

  // 2. Update title for answer key PDF and print (hide points — they add noise to the PDF)
  document.title = answersTitle;
  const body = getEl("body");
  const hadHidePoints = body.classList.contains("hide-points");
  body.classList.add("hide-points");
  await printPage();
  if (!hadHidePoints) {
    body.classList.remove("hide-points");
  }
  updateProgressStep(1);
  await sleep(2000);

  // 3. Download ZipGrade CSV
  const csvContent = zipGradeCSV.join(`\n${keyLetter},`);
  download(csvContent, `${csvFileName}.csv`, "text/csv");
  updateProgressStep(2);
  await sleep(2000);

  // 4. Download instructions HTML
  const instructionsHtml = buildInstructionsHtml({
    type,
    day,
    keyLetter,
    expire: state.expire,
    domain: state.domain,
    groups: state.groups,
    generatedAt: state.generatedAt,
    validUntilISO: state.validUntilISO,
    testLink: window.location.href
  });
  download(instructionsHtml, `${instructionsFileName}.html`, "text/html");
  updateProgressStep(3);
  await sleep(2000);

  // Finalize progress dialog → complete state
  finalizeProgress(keyLetter);
  // Re-enable OK button — all steps complete
  const okBtn = getEl<HTMLButtonElement>("#custom-prompt-container button[type='submit']");
  if (okBtn) okBtn.disabled = false;

  // Restore name and title
  setUserName(originalName);
  document.title = `${type}-test-${day}-${originalName}`.replace("-&nbsp;", "");
  getEls<HTMLElement>(".student-name").forEach(el => (el.innerHTML = originalName || "&nbsp;"));

  // Await progress dialog (user clicks OK to proceed)
  await progressPromise;

  // Remove test param and return to main page
  allowUnload = true;
  setParam("test");
  window.location.reload();
}
