const generateMathQuestions = () => {
  const questions = [];

  for (let i = 0; i < 10; i++) {
    let a = parseInt(Math.random() * 90) + 10;
    let b = parseInt(Math.random() * 10) + 1;
    const invert = Math.random() < 0.5;
    if (invert) {
      let tmp = a;
      a = b;
      b = tmp;
    }

    const s = a + b;
    const totalAnwers = 4;
    let range = parseInt(Math.random() * totalAnwers);
    answers = [];
    for (let j = 0; j < totalAnwers; j++, range--) {
      answers.push({ id: j, text: s - range, correct: range === 0 });
    }

    questions.push({
      id: i,
      level: 10,
      text: `${a} + ${b} = ?`,
      answerType: "radio",
      answerDisplay: "inline-block",
      answers: answers
    });
  }

  window.correctAnswers = questions.reduce((acc, question) => {
    acc[question.id] = [question.answers.find(a => a.correct).id];
    return acc;
  }, {});

  return questions;
};
