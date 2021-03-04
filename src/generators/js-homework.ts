import { hideEl, externalImport, levelSelector, getRandomQuestions, applyCustomTheme } from "../utilities";
import { initOptions } from "./js";

let options: any = [];

function hideNotUsedElements() {
  hideEl("#submit-test");
  hideEl("#test-result");
  hideEl("#reset");
  hideEl("#result");
}

export const JsHomework: QuizGenerator = {
  shuffle: false,
  displayLimit: 999,
  init: async () => {
    hideNotUsedElements();
    const requires = [
      "js/questions/constants.js",
      "js/questions/js-homework.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ext-beautify.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/mode-javascript.js"
    ];
    if (!String.prototype.padStart) {
      requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
    }

    await externalImport(requires);
    options = initOptions();
  },
  getLevelSelector: (level, onChange?: (e: any) => void) => levelSelector(options, level, onChange),

  afterRender: () => {
    applyCustomTheme();
  },

  generateQuestions: level => {
    return getRandomQuestions(JsHomework, window.ALL_QUESTIONS, level, false);
  },
  reset: () => {
    hideNotUsedElements();
  }
};
