import { levelSelector, externalImport, getRandomQuestions, getParam } from "../common/utilities";

const options = [
  // ====== 2025 ======
  {
    value: 1,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Numeri",
    short: "Numeri"
  },
  {
    value: 2,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Luca",
    short: "Luca"
  },
  {
    value: 3,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Estera",
    short: "Estera"
  },
  // ====== 2024 ======
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
  },
  {
    value: 7,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Iuda",
    short: "Iuda"
  }
];

export const BibleQuiz: QuizGenerator = {
  domain: "bible",
  defaultTitle: "Bible Quiz",
  shuffle: "answers",
  displayLimit: 10,
  pointsDigits: 0,
  //header: ``, // TODO

  init: async () => {
    const requires = [];
    if (!String.prototype.padStart) {
      requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
    }

    await externalImport(requires);
  },

  getYear: () => {
    let year = getParam("year") || new Date().getFullYear();
    if (typeof year === "string") {
      year = parseInt(year, 10);
    }
    return year;
  },

  getLevelSelector: function (level, onChange?: (levels: number[]) => void) {
    const year = this.getYear();
    const filteredOptions = options.filter(option => option.url === year);
    return levelSelector(filteredOptions, level, onChange);
  },

  afterRender: () => {},

  load: async function (levels: number[]) {
    const year = this.getYear();
    let option = options.find(option => option.url === year && levels.includes(option.value));
    if (!option) {
      console.warn("no option found, getting first available", year, levels);
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
