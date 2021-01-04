import { JsQuiz } from "./generators/js";
import { MathQuiz } from "./generators/math";
import { JsHomework } from "./generators/js-homework";
import { Quiz, hideEl, getParam, getRandomLetter, getQuestionIndexes } from "./utilities";

// =============================

function getQuestionsByIdx(indexes: number[]) {
  return indexes.map(i => window.ALL_QUESTIONS[i]);
}

function findIndexesByIds(ids: string[]) {
  return window.ALL_QUESTIONS.map((q, i) => (ids.some(id => id === q.id) ? i : -1)).filter(i => i >= 0);
}

export function getPublicIds(ids: string[]) {
  const d = new Date();
  const key = d.getMonth() + d.getDate() + d.getHours();
  const indexes = findIndexesByIds(ids);
  //@ts-ignore
  indexes.shuffle();

  const test = indexes
    .map(i => i + key)
    .join("-")
    .replace(/\-/gi, () => getRandomLetter());

  return test;
}

function initTime() {
  const date = new Date();
  const day = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
  const hour = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  document.querySelector("#test-date").innerHTML = `${day} ${hour}`;
  return day;
}

function getGenerator(domain: string): QuizGenerator {
  switch (domain) {
    case "js":
      return JsQuiz;
    case "js-homework":
      return JsHomework;
    case "math":
      return MathQuiz;
  }
}

function getLevel(): number {
  let level: any = getParam("level");

  if (level) {
    level = parseInt(level);
  } else {
    level = 10; // TODO generator.getDefaultLevel();
  }
  return level;
}

export const startQuiz = async () => {
  let questions;
  let indexes = getQuestionIndexes();
  const domain = getParam("domain") || "js";
  const generator = getGenerator(domain);
  await generator.init();
  let level = getLevel();

  const day = initTime();

  if (indexes) {
    generator.shuffle = false;
    const type = getParam("type") || "theoretical";

    if (indexes.length === 1) {
      console.info("Generate Test link...");
      const key = `quiz-${domain}-${type}`;
      const defaultTest = localStorage.getItem(key) || "";
      const ids = prompt("Add all questions", defaultTest).split(/\s*,\s*/gi);

      console.debug("ids", ids);
      localStorage.setItem(key, ids.join(", "));

      const test = getPublicIds(ids);
      indexes = getQuestionIndexes(test);
      console.debug("indexes", indexes);
      const url = `?domain=${domain}&type=${type}&test=${test}`;
      window.history.pushState({}, "", url);
    }

    const quizUserName = `quiz-user-name`;
    const defaultName = localStorage.getItem(quizUserName) || "";
    const studentName = prompt("Enter you full name (firstname & lastname)", defaultName) || defaultName;
    localStorage.setItem(quizUserName, studentName);

    document.title = `test-${type}-${day}-${studentName}`;
    document.querySelector("#student-name").innerHTML = studentName;

    hideEl("#reset");
    questions = getQuestionsByIdx(indexes);
    console.warn("questions", questions);
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
      initTime();
    });
    const questionsEl = document.querySelector("#questions");
    questionsEl.appendChild(LevelSelector);
  }

  Quiz.render(questions, generator);
};
