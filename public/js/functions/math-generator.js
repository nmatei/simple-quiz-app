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
    let k = parseInt(Math.random() * 4);

    questions.push({
      id: i,
      level: 10,
      text: `${a} + ${b} = ?`,
      answers: [
        { id: 1, text: s - k--, correct: k === -1 },
        { id: 2, text: s - k--, correct: k === -1 },
        { id: 3, text: s - k--, correct: k === -1 },
        { id: 4, text: s - k--, correct: k === -1 }
      ]
    });
  }

  window.correctAnswers = questions.reduce((acc, question) => {
    acc[question.id] = [question.answers.find(a => a.correct).id];
    return acc;
  }, {});

  return questions;
};
