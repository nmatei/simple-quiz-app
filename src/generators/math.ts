import { hideEl } from "../common/common";
import { getRandomLetter, levelSelector, getRandomQuestions } from "../common/utilities";

const options = [
  {
    value: 10,
    text: "Clasa I. Adunare cu trecere peste ordin - &#128288;",
    short: "Adunare cu trecere peste ordin - &#128288;",
    generator: () => findNumbers(10, "+", 3, "radio")
  },
  {
    value: 11,
    text: "Clasa I. Adunare cu trecere peste ordin - &#9997;",
    short: "Adunare cu trecere peste ordin - &#9997;",
    generator: () => findNumbers(11, "+", 3, "number")
  },
  {
    value: 12,
    text: "Clasa I. Adunare - afla numarul necunoscut - &#128288;",
    short: "Adunare - afla numarul necunoscut - &#128288;",
    generator: () => findNumbers(12, "+", 0, "radio")
  },
  {
    value: 13,
    text: "Clasa I. Adunare - afla numarul necunoscut - &#9997;",
    short: "Adunare - afla numarul necunoscut - &#9997;",
    generator: () => findNumbers(13, "+", 0, "number")
  },
  {
    value: 14,
    text: "Clasa I. Scaderea cu trecere peste ordin - &#128288;",
    short: "Scaderea cu trecere peste ordin - &#128288;",
    generator: () => findNumbers(14, "-", 3, "radio")
  },
  {
    value: 15,
    text: "Clasa I. Scaderea cu trecere peste ordin - &#9997;",
    short: "Scaderea cu trecere peste ordin - &#9997;",
    generator: () => findNumbers(15, "-", 3, "number")
  },
  {
    value: 16,
    text: "Clasa I. Scaderea - afla numarul necunoscut - &#128288;",
    short: "Scaderea - afla numarul necunoscut - &#128288;",
    generator: () => findNumbers(16, "-", 0, "radio")
  },
  {
    value: 17,
    text: "Clasa I. Scaderea - afla numarul necunoscut - &#9997;",
    short: "Scaderea - afla numarul necunoscut - &#9997;",
    generator: () => findNumbers(17, "-", 0, "number")
  },
  {
    value: 18,
    text: "Clasa I. Adunare si Scaderea (99) - &#9997;",
    short: "Adunare si Scaderea (99) - &#9997;",
    generator: () => findNumbers(18, "", 0, "number")
  },
  {
    value: 22,
    text: "Clasa II. Adunare si Scaderea (999) - &#9997;",
    short: "Adunare si Scaderea (999) - &#9997;",
    generator: () => findNumbers(22, "", 0, "number", 100, 1000)
  },
  {
    value: 24,
    text: "Clasa II. Înmulțirea (1...10) - &#9997;",
    short: "Înmulțirea (1...10) - &#9997;",
    generator: () => findNumbers(25, "*", 3, "number", 2, 10)
  },
  {
    value: 25,
    text: "Clasa II. Îpărțirea (1...10) - &#9997;",
    short: "Îpărțirea (1...10) - &#9997;",
    generator: () => findNumbers(25, "/", 3, "number", 2, 10)
  }
];

function getRandomInt(min: number = 20, max: number = 100): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

const findNumbers = (
  level: number,
  op: "+" | "-" | "*" | "/" | "",
  hideNr: number,
  answerType: AnswerType = "radio",
  min: number = 20,
  max: number = 100
) => {
  const questions: QuizOption[] = [];

  for (let i = 0; i < 10; i++) {
    const operation = op || (Math.random() < 0.5 ? "+" : "-");
    let a, b, r, tmp;
    switch (operation) {
      case "+": {
        r = getRandomInt(min, max);
        tmp = (r % 10) + 1;
        a = getRandomInt(tmp, r);
        b = r - a;
        break;
      }
      case "-": {
        a = getRandomInt(min, max);
        tmp = (a % 10) + 1;
        b = getRandomInt(tmp, a);
        r = a - b;
        break;
      }
      case "*": {
        a = getRandomInt(min, max);
        b = getRandomInt(min, max);
        r = a * b;
        break;
      }
      case "/": {
        b = getRandomInt(min, max);
        r = getRandomInt(min, max);
        a = r * b;
        break;
      }
    }

    const hide = hideNr || 1 + getRandomInt(0, 2);

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
      level: level,
      text: `${a} ${operation} ${b} = ${r}`,
      answerType,
      answerDisplay: "inline-block",
      answers: answers
    });
  }
  return questions;
};

const generateAnswers = (correct: number, answerType: AnswerType) => {
  const answers: Answer[] = [];
  if (answerType === "radio") {
    const totalAnwers = 4;
    // answers should not be negative
    let range = Math.min(getRandomInt(0, totalAnwers), correct);

    for (let j = 0; j < totalAnwers; j++, range--) {
      answers.push({
        id: j,
        text: correct - range,
        correct: range === 0
      });
    }
  } else {
    answers.push({
      id: 0,
      text: "",
      correct
    });
  }
  return answers;
};

function hideNotUsedElements() {
  hideEl("#test-result");
}

export const MathQuiz: QuizGenerator = {
  domain: "math",
  defaultTitle: "Math Quiz",
  shuffle: "both",
  displayLimit: 10,
  pointsDigits: 2,
  defaultLevels: [10],

  init: async () => {
    hideNotUsedElements();
  },

  getLevelSelector: (level, onChange?: (levels: number[]) => void) => levelSelector(options, level, onChange),

  afterRender: () => {},

  load: async function (levels: number[]) {
    const selectedOptions = options.filter(option => levels.includes(option.value));
    const generators = selectedOptions.filter(o => o.generator).map(o => o.generator());

    const questions = await Promise.allSettled([...generators]).then(results => {
      return results.reduce((acc, result) => {
        if (result.status === "fulfilled") {
          acc.push(...result.value);
        } else {
          console.error("Error loading questions:", result.reason);
        }
        return acc;
      }, [] as QuizOption[]);
    });

    this.ALL_QUESTIONS = questions;
    return questions;
  },

  generateQuestions: async function (levels) {
    await this.load(levels);
    return getRandomQuestions(this, this.ALL_QUESTIONS, levels, true);
  },
  reset: () => {}
};
