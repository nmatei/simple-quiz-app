// TODO select filterLevel
// TODO generate test with all type of levels (interval) and use level to calculate points
let filterLevel = 15;
let shuffle = true;

// =============================

function getParam(name) {
  return (location.search.split(name + "=")[1] || "").split("&")[0];
}

function getRandomQuestions() {
  let questions = ALL_QUESTIONS.filter(
    q => q.level <= filterLevel && q.answers && q.answers.length
  );

  if (shuffle) {
    questions.shuffle();
  }
  questions = questions.slice(0, 10);
  questions.sort((a, b) => a.level - b.level);

  return questions;
}

function getQuestionsByIdx(indexes) {
  return indexes.map(i => ALL_QUESTIONS[i]);
}

function findIndexesByIds(ids) {
  return ALL_QUESTIONS.map((q, i) =>
    ids.some(id => id === q.id) ? i : -1
  ).filter(i => i >= 0);
}

function getRandomLetter() {
  //return "e";
  const s = "abcdefghijklmnopqrstuvwxyz";
  return s[Math.floor(Math.random() * s.length)];
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

  console.info(
    `https://nmatei.github.io/simple-quiz-app/public/?test=${test}`
  );

  return test;
}

function getQuestionIndexes() {
  const test = getParam("test");
  if (!test) return null;

  const d = new Date();
  const key = d.getMonth() + d.getDate() + d.getHours();

  return test
    .split(/[a-z]+/)
    .map(n => parseInt(n) - key)
    .sort((a, b) => a - b);
}

// =============================

let questions;
const indexes = getQuestionIndexes();
if (indexes) {
  shuffle = false;
  questions = getQuestionsByIdx(indexes);
} else {
  // questions = ALL_QUESTIONS;
  questions = getRandomQuestions();
  //questions = getExamQuestionsByIdx(indexes);

  // TODO add all answers (print all without answers)
  //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
}

printQ(questions);

applyCustomTheme();

// TODO disable copy code
