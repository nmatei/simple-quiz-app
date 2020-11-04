import { JsQuiz } from "./generators/js";
import { MathQuiz } from "./generators/math";
import { JsHomework } from "./generators/js-homework";
import {
  Quiz,
  hideEl,
  getParam,
  getRandomLetter,
  getQuestionIndexes
} from "./utilities";

window.shuffle = true;

// =============================

function getQuestionsByIdx(indexes: number[]) {
  return indexes.map(i => window.ALL_QUESTIONS[i]);
}

function findIndexesByIds(ids: number[]) {
  return window.ALL_QUESTIONS.map((q, i) =>
    ids.some(id => id === q.id) ? i : -1
  ).filter(i => i >= 0);
}

export function getPublicIds(ids: number[]) {
  const d = new Date();
  const key = d.getMonth() + d.getDate() + d.getHours();
  const indexes = findIndexesByIds(ids);
  //@ts-ignore
  indexes.shuffle();

  const test = indexes
    .map(i => i + key)
    .join("-")
    .replace(/\-/gi, () => getRandomLetter());

  console.info(
    `https://nmatei.github.io/simple-quiz-app/public/?domain=js&test=${test}`
  );

  return test;
}

function initTime() {
  const date = new Date();
  const day = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
  const hour = `${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  document.querySelector("#test-date").innerHTML = `${day} ${hour}`;
  return day;
}

export const startQuiz = async () => {
  let generator: QuizGenerator;
  let questions;
  const indexes = getQuestionIndexes();
  const domain = getParam("domain") || "js";
  let level: any = getParam("level");

  if (level) {
    level = parseInt(level);
  } else {
    level = 10;
  }

  if (domain === "js") {
    generator = JsQuiz;
  } else if (domain === "js-homework") {
    generator = JsHomework;
  } else if (domain === "math") {
    generator = MathQuiz;
  }

  await generator.init();

  const day = initTime();

  if (indexes) {
    window.shuffle = false;

    const studentName = prompt("Enter you full name (firstname & lastname)");
    //const studentName = "Nicolae Matei";

    document.title = `test-${day}-${studentName}`;

    hideEl("#reset");
    document.querySelector("#student-name").innerHTML = studentName;
    questions = getQuestionsByIdx(indexes);
  } else {
    if (domain === "math") {
      hideEl("#test-result");
    }
    questions = generator.generateQuestions(level);
  }

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

  Quiz.render(questions, generator);

  // for Trainer to generate link
  // getPublicIds(["1553293253068"]);
};
