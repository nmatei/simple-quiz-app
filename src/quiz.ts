import { JsQuiz } from "./generators/js";
import { MathQuiz } from "./generators/math";
import { JsHomework } from "./generators/js-homework";
import { setLanguage, getEl, getUserName, hideEl } from "./common";
import { Quiz, getParam, getLevel, getQuestionIndexes, getPublicTestLink, initTime, submitTest } from "./utilities";

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

export const startQuiz = async () => {
  let questions;
  let indexes = getQuestionIndexes();
  const domain = getParam("domain") || "js";
  const generator = getGenerator(domain);
  initGeneratorParams(generator);
  await generator.init();
  let level = getLevel();

  const day = initTime();

  if (indexes) {
    const type = getParam("type") || "theoretical";

    if (indexes.length === 1) {
      console.info("Generate Test link...");
      const key = `quiz-${domain}-${type}`;
      const defaultTest = localStorage.getItem(key) || "";

      const expire = parseInt(prompt("Expire after (minutes)", "5").trim()) || 5;
      const ids = prompt("Add all questions", defaultTest).split(/\s*,\s*/gi);
      // const ids = defaultTest.split(/\s*,\s*/gi);

      console.debug("ids", ids);
      localStorage.setItem(key, ids.join(", "));

      const test = getPublicTestLink(ids, expire);
      indexes = getQuestionIndexes(test);
      console.debug("indexes", indexes);
      const url = `?domain=${domain}&type=${type}&test=${test}`;
      window.history.pushState({}, "", url);
    }
    const studentName = getUserName();
    document.title = `${type}-test-${day}-${studentName}`;
    document.querySelector("#student-name").innerHTML = studentName;

    hideEl("#reset");
    questions = getQuestionsByIdx(generator, indexes);
    //console.info("questions", questions);
  } else {
    questions = generator.generateQuestions(level);
  }

  if (!indexes) {
    const LevelSelector = generator.getLevelSelector(level, (e: any) => {
      // TODO create route function to change domain & level
      const newLevel = parseInt(e.target.value);
      const search = window.location.search.replace(`&level=${level}`, "");
      // TODO make sure to have any search param before..
      history.pushState(null, "", `${search}&level=${newLevel}`);
      level = newLevel;
      questions = generator.generateQuestions(level);
      Quiz.reset(questions);
      generator.reset();
    });
    const questionsEl = document.querySelector("#questions");
    questionsEl.appendChild(LevelSelector);
  }

  Quiz.render(questions, generator);

  // init events
  getEl("#reset").addEventListener("click", () => {
    Quiz.reset();
  });
  getEl("#submit-test").addEventListener("click", () => {
    submitTest();
  });
  getEl("#language-selector").addEventListener("click", e => {
    const target: any = e.target;
    if (target.matches("a")) {
      setLanguage(target.innerText);
    }
  });
  getEl("#student-name").addEventListener("click", () => {
    getUserName(true);
  });
};
