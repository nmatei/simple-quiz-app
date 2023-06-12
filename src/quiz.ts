import { JsQuiz } from "./generators/js";
import { MathQuiz } from "./generators/math";
import { JsHomework } from "./generators/js-homework";
import { setLanguage, getEl, getUserName, hideEl, setText } from "./common";
import {
  Quiz,
  getParam,
  getLevel,
  getQuestionIndexes,
  getPublicTestLink,
  initTime,
  submitTest,
  setParam,
  setParams
} from "./utilities";
import { simplePrompt } from "./components/simplePrompt";

// =============================

function getQuestionsByIdx(generator: QuizGenerator, indexes: number[]) {
  let questions = indexes.map(i => window.ALL_QUESTIONS[i]);
  if (generator.shuffle) {
    //@ts-ignore
    questions.shuffle();
  }
  return questions;
}

function getGenerator(domain: string): QuizGenerator {
  switch (domain) {
    case "js":
      return JsQuiz;
    case "js-homework":
      return JsHomework;
    case "math":
      return MathQuiz;
    default:
      return JsQuiz;
  }
}

function initGeneratorParams(generator: QuizGenerator) {
  const limit = getParam("limit");
  if (limit) {
    generator.displayLimit = parseInt(limit);
  }
  const shuffle = getParam("shuffle");
  if (shuffle) {
    generator.shuffle = shuffle === "true" || shuffle === "1";
  }
}

function applyUserName(type: string, day: string, ask: boolean) {
  const studentName = getUserName(ask);
  document.title = `${type}-test-${day}-${studentName}`;
  setText("#student-name", studentName);
}

export const startQuiz = async () => {
  let questions;
  let indexes = getQuestionIndexes();
  const domain = getParam("domain") || "js";
  const generator = getGenerator(domain);
  initGeneratorParams(generator);
  await generator.init();
  let level = getLevel();

  const day = initTime();

  const questionsEl = getEl("#questions");

  const type = getParam("type") || "theoretical";
  if (indexes) {
    if (indexes.length === 1) {
      console.info("Generate Test link...");
      const key = `quiz-${domain}-${type}`;
      const defaultTest = localStorage.getItem(key) || "";

      const minutes = await simplePrompt("Expire after (minutes)", "5");
      const enterMinutes = prompt("Expire after (minutes)", "5") || "5";
      const expire = parseInt(enterMinutes.trim()) || 5;
      const ids = prompt("Enter questions IDS (comma separated)", defaultTest).split(/\s*,\s*/gi);
      // const ids = defaultTest.split(/\s*,\s*/gi);

      console.debug("ids", ids);
      localStorage.setItem(key, ids.join(", "));

      const test = getPublicTestLink(ids, expire);
      indexes = getQuestionIndexes(test);
      console.debug("indexes", indexes);
      setParams({ domain, type, test });
    }
    applyUserName(type, day, false);

    hideEl("#reset");
    questions = getQuestionsByIdx(generator, indexes);
    //console.info("questions", questions);
  } else {
    questions = generator.generateQuestions(level);
  }

  if (!indexes) {
    const LevelSelector = generator.getLevelSelector(level, (e: any) => {
      level = parseInt(e.target.value);
      setParam("level", level);
      questions = generator.generateQuestions(level);
      Quiz.reset(questions);
      generator.reset();
    });
    questionsEl.appendChild(LevelSelector);
  }

  Quiz.render(questions, generator);

  // init events
  getEl("#reset").addEventListener("click", () => {
    Quiz.reset();
  });
  getEl("#submit-test").addEventListener("click", () => {
    if (getUserName()) {
      submitTest();
    } else {
      applyUserName(type, day, true);
    }
  });
  getEl("#language-selector").addEventListener("click", e => {
    const target: any = e.target;
    if (target.matches("a")) {
      setLanguage(target.innerText);
    }
  });
  getEl("#student-name").addEventListener("click", () => {
    applyUserName(type, day, true);
  });

  const index = getParam("index");
  const showId = index === "id";
  if (showId) {
    const copyIdsBtn = createButton({ text: "Copy ID's", disabled: true });
    copyIdsBtn.addEventListener("click", () => {
      const ids = getSelectedIds();
      // @ts-ignore
      navigator.clipboard.writeText(ids.join(", "));
    });
    getEl("#footer-actions").appendChild(copyIdsBtn);

    const loadIdsBtn = createButton({ text: "Select ID's", disabled: false });
    loadIdsBtn.addEventListener("click", () => {
      const ids = prompt("Enter questions IDS (comma separated)", "1, 2").split(/\s*,\s*/gi);
      ids.forEach(id => {
        const article = getEl(`#q-${id}`);
        article.classList.add("selected");
        // @ts-ignore
        getEl("input.select", article).checked = true;
      });
      copyIdsBtn.disabled = getSelectedIds().length === 0;
    });
    getEl("#footer-actions").appendChild(loadIdsBtn);

    questionsEl.addEventListener("click", e => {
      const target: any = e.target;
      if (target.matches("article .select")) {
        const article = target.closest("article");
        article.classList.toggle("selected");
        copyIdsBtn.disabled = getSelectedIds().length === 0;
      }
    });
  }
};

function createButton({ text, disabled }: { text: string; disabled: boolean }) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("primary");
  btn.innerHTML = text;
  btn.disabled = disabled;
  return btn;
}

function getSelectedIds() {
  const ids = Array.from(document.querySelectorAll("input[type=checkbox].select:checked")).map(
    // @ts-ignore
    input => input.value
  );
  console.warn("copy", ids);
  return ids;
}
