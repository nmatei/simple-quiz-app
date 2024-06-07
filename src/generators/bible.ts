import { levelSelector, externalImport, getRandomQuestions } from "../common/utilities";

const options = [
  {
    value: 1,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Leveticul",
    short: "Leveticul"
  },
  {
    value: 2,
    url: 2024,
    text: "Olimpiada Biblică 2024 - 1 Samuel",
    short: "1 Samuel"
  },
  {
    value: 3,
    url: 2024,
    text: "Olimpiada Biblică 2024 - 2 Samuel",
    short: "2 Samuel"
  },
  {
    value: 4,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Proverbe",
    short: "Proverbe"
  },
  {
    value: 5,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Ezra",
    short: "Ezra"
  },
  {
    value: 6,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Galateni",
    short: "Galateni"
  }
];

export const BibleQuiz: QuizGenerator = {
  domain: "bible",
  defaultTitle: "Bible Quiz",
  shuffle: "answers",
  displayLimit: 10,
  pointsDigits: 0,

  init: async () => {
    const requires = [];
    if (!String.prototype.padStart) {
      requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
    }

    await externalImport(requires);
  },
  getLevelSelector: (level, onChange?: (levels: number[]) => void) => levelSelector(options, level, onChange),

  afterRender: () => {},

  load: async function (levels: number[]) {
    let option = options.find(option => levels.includes(option.value));
    if (!option) {
      option = options[0];
    }

    this.answersUrl = `./data/bible/answers-${option.url}.json`;
    this.questionsUrl = `./data/bible/questions-${option.url}.json`;

    const response = await fetch(this.questionsUrl);
    const ALL_QUESTIONS: QuizOption[] = await response.json();
    this.ALL_QUESTIONS = ALL_QUESTIONS;
    return ALL_QUESTIONS;
  },

  generateQuestions: async function (levels) {
    await this.load(levels);
    return getRandomQuestions(this, this.ALL_QUESTIONS, levels, true);
  },
  reset: () => {}
};
