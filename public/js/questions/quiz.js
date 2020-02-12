// TODO select filterLevel
// TODO generate test with all type of levels (interval) and use level to calculate points
let filterLevel = 100;
let shuffle = true;

// =============================

function getQuestionsByIdx(indexes) {
  return indexes.map(i => ALL_QUESTIONS[i]);
}

function findIndexesByIds(ids) {
  return ALL_QUESTIONS.map((q, i) =>
    ids.some(id => id === q.id) ? i : -1
  ).filter(i => i >= 0);
}

function getPublicIds(ids) {
  const d = new Date();
  const key = d.getMonth() + d.getDate() + d.getHours();
  const indexes = findIndexesByIds(ids);
  indexes.shuffle();

  const test = indexes
    .map(i => i + key)
    .join("-")
    .replace(/\-/gi, () => getRandomLetter());

  console.info(`https://nmatei.github.io/simple-quiz-app/public/?test=${test}`);

  return test;
}

// =============================

let questions;
const indexes = getQuestionIndexes();
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
  const domain = getParam("domain") || "js";
  if (domain === "js") {
    // questions = ALL_QUESTIONS;
    questions = getRandomQuestions(ALL_QUESTIONS);
    //questions = getExamQuestionsByIdx(indexes);

    // TODO add all answers (print all without answers)
    //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
  } else if (domain === "math") {
    shuffle = false;
    questions = generateMathQuestions();
  }
}

printQ(questions);

applyCustomTheme();
