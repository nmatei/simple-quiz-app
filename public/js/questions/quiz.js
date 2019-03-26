// TODO select filterLevel
let filterLevel = 5;

let questions = ALL_QUESTIONS.filter(
  q => q.level <= filterLevel && q.answers && q.answers.length
);

questions.shuffle();

questions = questions.slice(0, 10);

questions.sort((a, b) => a.level - b.level);

printQ(questions);

applyCustomTheme();
