import { hideEl } from "../common";
import { levelSelector, externalImport, getRandomQuestions, getParam, Quiz, getPreviewQuestions } from "../utilities";

const options = [
  {
    value: 2024,
    text: "Olimpiada Biblică 2024"
  }
];

function hideNotUsedElements() {
  hideEl("#test-result");
}

export const BibleQuiz: QuizGenerator = {
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

  generateQuestions: async level => {
    let option = options.find(option => option.value === level);
    if (!option) {
      console.info("find closest generator");
      option = options[0];
    }
    BibleQuiz.answersUrl = `./data/bible/answers-${option.value}.json`;
    let response = await fetch(`./data/bible/questions-${option.value}.json`);
    const ALL_QUESTIONS: QuizOption[] = await response.json();
    BibleQuiz.ALL_QUESTIONS = ALL_QUESTIONS;
    return getRandomQuestions(BibleQuiz, ALL_QUESTIONS, level, true);
  },
  reset: () => {}
};
