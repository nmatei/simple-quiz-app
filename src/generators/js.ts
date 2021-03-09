declare var ace: any;

import { externalImport, levelSelector, getRandomQuestions, applyCustomTheme } from "../utilities";

let options: any = [];

export const initOptions = (generator: QuizGenerator) => {
  return Object.keys(
    window.ALL_QUESTIONS.reduce((prev, question) => {
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
  shuffle: true,
  displayLimit: 10,
  init: async function () {
    const requires = [
      "js/questions/js.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ext-beautify.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-javascript.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.js"
    ];
    if (!String.prototype.padStart) {
      requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
    }

    await externalImport(requires);
    options = initOptions(this);
  },
  levelNames: {
    5: "Basics",
    6: "JSON Intro",
    10: "Intro",
    11: "Expressions",
    15: "Classes",
    20: "Timeout"
  },
  getLevelSelector: (level, onChange?: (e: any) => void) => levelSelector(options, level, onChange),

  afterRender: () => {
    applyCustomTheme();
  },

  generateQuestions: level => {
    const questions = getRandomQuestions(JsQuiz, window.ALL_QUESTIONS, level, true);

    // TODO add all answers (print all without answers)
    //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
    return questions;
  },
  reset: () => {}
};
