// TODO select filterLevel
let filterLevel = 10;
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

function getExamQuestionsByIdx(indexes) {
  return indexes.map(i => ALL_QUESTIONS[i]);
}

function findIndexesByIds(ids) {
  return ALL_QUESTIONS.map((q, i) =>
    ids.some(id => id === q.id) ? i : -1
  ).filter(i => i >= 0);
}

// =============================

// let questions = ALL_QUESTIONS;
let questions = getRandomQuestions();
//let questions = getExamQuestionsByIdx(indexes);

// TODO add all answers (print all without answers)
// let questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);

printQ(questions);

applyCustomTheme();

// TODO disable copy code
