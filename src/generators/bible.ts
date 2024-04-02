import { hideEl } from "../common/common";
import { levelSelector, externalImport, getRandomQuestions } from "../common/utilities";

const options = [
  {
    value: 0,
    url: 2024,
    text: "- All -"
  },
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
  }
];

function hideNotUsedElements() {
  hideEl("#test-result");
}

export const BibleQuiz: QuizGenerator = {
  domain: "bible",
  defaultTitle: "Bible Quiz",
  shuffle: true,
  displayLimit: 10,

  init: async () => {
    hideNotUsedElements();

    const requires = [];
    if (!String.prototype.padStart) {
      requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
    }

    await externalImport(requires);
  },
  getLevelSelector: (level, onChange?: (e: any) => void) => levelSelector(options, level, onChange),

  afterRender: () => {},

  generateQuestions: async function (level) {
    let option = options.find(option => option.value === level);
    if (!option) {
      console.info("find closest generator");
      option = options[0];
    }

    this.answersUrl = `./data/bible/answers-${option.url}.json`;
    this.questionsUrl = `./data/bible/questions-${option.url}.json`;

    const response = await fetch(this.questionsUrl);
    const ALL_QUESTIONS: QuizOption[] = await response.json();
    this.ALL_QUESTIONS = ALL_QUESTIONS;
    return getRandomQuestions(this, ALL_QUESTIONS, level, true);
  },
  reset: () => {}
};
