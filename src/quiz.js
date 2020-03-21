import { JsQuiz } from "./generators/js";
import { MathQuiz } from "./generators/math";
import {
  Quiz,
  getParam,
  getRandomLetter,
  getQuestionIndexes
} from "./utilities";

window.shuffle = true;

// =============================

function getQuestionsByIdx(indexes) {
  return indexes.map(i => ALL_QUESTIONS[i]);
}

function findIndexesByIds(ids) {
  return ALL_QUESTIONS.map((q, i) =>
    ids.some(id => id === q.id) ? i : -1
  ).filter(i => i >= 0);
}

export function getPublicIds(ids) {
  const d = new Date();
  const key = d.getMonth() + d.getDate() + d.getHours();
  const indexes = findIndexesByIds(ids);
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

export const startQuiz = async () => {
  let generator;
  let questions;
  const indexes = getQuestionIndexes();
  const domain = getParam("domain") || "js";
  let level = getParam("level");

  if (level) {
    level = parseInt(level);
  } else {
    level = 10;
  }

  if (domain === "js") {
    generator = JsQuiz;
  } else if (domain === "math") {
    generator = MathQuiz;
  }

  await generator.init();

  if (indexes) {
    shuffle = false;

    const studentName = prompt("Enter you full name (firstname & lastname)");
    //const studentName = "Nicolae Matei";
    const date = new Date();

    const day = `${date.getUTCFullYear()}-${date.getUTCMonth() +
      1}-${date.getUTCDate()}`;
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    document.title = `test-${day}-${studentName}`;

    document.querySelector("#reset").style.display = "none";
    document.querySelector("#student-name").innerHTML = studentName;
    document.querySelector("#test-date").innerHTML = `${day} ${hour}`;
    questions = getQuestionsByIdx(indexes);
  } else {
    if (domain === "math") {
      document.querySelector("#test-result").style.display = "none";
    }
    questions = generator.generateQuestions(level);
  }

  const LevelSelector = generator.getLevelSelector(level, e => {
    // TODO create route function to change domain & level
    const newLevel = parseInt(e.target.value);
    const search = window.location.search.replace(`&level=${level}`, "");
    // TODO make sure to have any search param before..
    history.pushState(null, "", `${search}&level=${newLevel}`);
    level = newLevel;
    questions = generator.generateQuestions(level);
    Quiz.reset(questions);
  });
  const questionsEl = document.querySelector("#questions");
  questionsEl.appendChild(LevelSelector);

  Quiz.render(questions, generator);

  // for Trainer to generate link
  // getPublicIds(["1553293253068"]);
};
