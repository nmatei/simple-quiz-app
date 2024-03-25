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
    generator.ALL_QUESTIONS.reduce(
      (prev, question) => {
        prev[question.level] = question.level;
        if (!question.level) {
          console.warn("no level", question);
        }
        return prev;
      },
      {} as { [key: number]: number }
    )
  ).map(level => ({
    value: parseInt(level),
    text: generator.levelNames ? generator.levelNames[level] || level : level
  }));
};

export const JsQuiz: QuizGenerator = {
  defaultTitle: "JS Quiz",
  shuffle: true,
  displayLimit: 10,

  answersUrl: "data/answers.json",

  init: async function () {
    const requires = [
      "data/questions/js.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ext-beautify.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-javascript.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.js"
    ];
    if (!String.prototype.padStart) {
      requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
    }

    const language = getLanguage();
    const imports = await Promise.all([externalImport(requires), getLocalization(language)]);

    this.ALL_QUESTIONS = window.ALL_QUESTIONS;
    applyTranslations(this.ALL_QUESTIONS, imports[1]);
    options = initOptions(this);
    options.unshift({
      value: 0,
      text: "- All -"
    });
  },
  levelNames: {
    5: "Basics",
    6: "JSON Intro",
    10: "Intro",
    11: "Expressions",
    15: "Classes",
    20: "Timeout",
    21: "Arrays",
    22: "Object References"
  },
  getLevelSelector: (level, onChange?: (e: any) => void) => levelSelector(options, level, onChange),

  afterRender: () => {
    applyCustomTheme();
  },

  generateQuestions: async function (level) {
    const questions = getRandomQuestions(this, this.ALL_QUESTIONS, level, true);

    // TODO add all answers (print all without answers)
    //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
    return questions;
  },
  reset: () => {}
};
