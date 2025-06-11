import {
  externalImport,
  levelSelector,
  getRandomQuestions,
  applyCustomTheme,
  applyTranslations
} from "../common/utilities";
import { getLocalization } from "../localization/js";
import { getLanguage } from "../common/common";

let options: { value: number | string; text: string }[] = [];

export const initOptions = (generator: QuizGenerator) => {
  return Object.keys(
    generator.ALL_QUESTIONS.reduce((prev, question) => {
      prev[question.level] = question.level;
      if (!question.level) {
        console.warn("no level", question);
      }
      return prev;
    }, {} as { [key: number]: number })
  ).map(level => ({
    value: parseInt(level),
    text: generator.levelNames ? generator.levelNames[level] || level : level
  }));
};

export const JsQuiz: QuizGenerator = {
  domain: "js",
  defaultTitle: "JS Quiz",
  shuffle: "both",
  displayLimit: 10,
  pointsDigits: 2,
  defaultLevels: [5, 6, 10],

  answersUrl: "data/answers.json",

  init: async function () {
    const requires = [
      "data/questions/js.js",
      "data/questions/css.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ext-beautify.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-javascript.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-css.js"
    ];

    const language = getLanguage();
    const imports = await Promise.all([externalImport(requires), getLocalization(language)]);

    this.ALL_QUESTIONS = window.ALL_QUESTIONS;
    applyTranslations(this.ALL_QUESTIONS, imports[1]);
    options = initOptions(this);
  },
  levelNames: {
    3: "CSS Selectors",
    5: "JS Basics",
    6: "JSON Intro",
    10: "Intro",
    11: "Expressions",
    13: "Advanced CSS",
    15: "Classes",
    20: "Timeout",
    21: "Arrays",
    22: "Object References"
  },

  getLevelSelector: (level, onChange?: (levels: number[]) => void) => levelSelector(options, level, onChange),

  afterRender: () => {
    applyCustomTheme();
  },

  generateQuestions: async function (levels) {
    const questions = getRandomQuestions(this, this.ALL_QUESTIONS, levels, true);

    // TODO add all answers (print all without answers)
    //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
    return questions;
  },
  reset: () => {}
};
