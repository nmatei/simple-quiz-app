// TODO select filterLevel
let filterLevel = 6;
const shuffle = true;

let questions = ALL_QUESTIONS.filter(
  q => q.level <= filterLevel && q.answers && q.answers.length
);

// TODO add all answers (print all without answers)
//let questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);

if (shuffle) {
  questions.shuffle();
}

questions = questions.slice(0, 10);

questions.sort((a, b) => a.level - b.level);

printQ(questions);

applyCustomTheme();
