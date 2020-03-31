import { getRandomLetter, levelSelector } from "../utilities";

const options = [
  {
    value: 10,
    text: "Clasa I. Adunare cu trecere peste ordin - &#128288;",
    generator: () => findNumbers("+", 3, "radio")
  },
  {
    value: 11,
    text: "Clasa I. Adunare cu trecere peste ordin - &#9997;",
    generator: () => findNumbers("+", 3, "number")
  },
  {
    value: 15,
    text: "Clasa I. Adunare - afla numarul necunoscut - &#128288;",
    generator: () => findNumbers("+", 0, "radio")
  },
  {
    value: 16,
    text: "Clasa I. Adunare - afla numarul necunoscut - &#9997;",
    generator: () => findNumbers("+", 0, "number")
  },
  {
    value: 20,
    text: "Clasa I. Scaderea cu trecere peste ordin - &#128288;",
    generator: () => findNumbers("-", 3, "radio")
  },
  {
    value: 21,
    text: "Clasa I. Scaderea cu trecere peste ordin - &#9997;",
    generator: () => findNumbers("-", 3, "number")
  },
  {
    value: 25,
    text: "Clasa I. Scaderea - afla numarul necunoscut - &#128288;",
    generator: () => findNumbers("-", 0, "radio")
  },
  {
    value: 26,
    text: "Clasa I. Scaderea - afla numarul necunoscut - &#9997;",
    generator: () => findNumbers("-", 0, "number")
  },
  {
    value: 27,
    text: "Clasa I. Adunare si Scaderea - &#9997;",
    generator: () => findNumbers("", 0, "number")
  }
];

const findNumbers = (
  op: "+" | "-" | "",
  hideNr: number,
  answerType: AnswerType = "radio"
) => {
  const questions = [];

  for (let i = 0; i < 10; i++) {
    const operation = op || (Math.random() < 0.5 ? "+" : "-");
    let a, b, r, tmp;
    if (operation === "+") {
      r = Math.floor(Math.random() * 79) + 20; // range 20-99
      tmp = (r % 10) + 1;
      a = Math.floor(Math.random() * (r - tmp)) + tmp;
      b = r - a;
    } else {
      a = Math.floor(Math.random() * 79) + 20; // range 20-99
      tmp = (a % 10) + 1;
      b = Math.floor(Math.random() * (a - tmp)) + tmp;
      r = a - b;
    }

    const hide = hideNr || 1 + Math.floor(Math.random() * 2);

    let unknown;
    const unknownLetter = getRandomLetter();
    if (hide === 1) {
      unknown = a;
      a = unknownLetter;
    } else if (hide === 2) {
      unknown = b;
      b = unknownLetter;
    } else {
      unknown = r;
      r = "?";
    }

    const answers = generateAnswers(unknown, answerType);

    questions.push({
      id: i,
      level: 10,
      text: `${a} ${operation} ${b} = ${r}`,
      answerType: answerType,
      answerDisplay: "inline-block",
      answers: answers
    });
  }
  return questions;
};

const generateAnswers = (correct: number, answerType: AnswerType) => {
  const answers = [];
  if (answerType === "radio") {
    const totalAnwers = 4;
    // answers should not be negative
    let range = Math.min(Math.floor(Math.random() * totalAnwers), correct);

    for (let j = 0; j < totalAnwers; j++, range--) {
      answers.push({ id: j, text: correct - range, correct: range === 0 });
    }
  } else {
    answers.push({ id: 0, text: "", correct });
  }
  return answers;
};

export const MathQuiz: QuizGenerator = (function() {
  return {
    init: async () => {},
    getLevelSelector: (level: number, onChange?: (e: any) => void) =>
      levelSelector(options, level, onChange),

    afterRender: () => {},

    generateQuestions: (level: number) => {
      let option = options.find(option => option.value === level);
      if (!option) {
        console.warn("TODO find closest generator");
        option = options[0];
      }
      return option.generator();
    }
  };
})();
