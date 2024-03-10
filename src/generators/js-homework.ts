import { externalImport, levelSelector, getRandomQuestions, applyCustomTheme } from "../utilities";
import { hideEl } from "../common";
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
  init: async function () {
    hideNotUsedElements();
    const requires = [
      "data/questions/constants.js",
      "data/questions/js-homework.js",
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
    5: "HTML & CSS",
    10: "Starter (Arrays)",
    15: "Advanced"
  },
  getLevelSelector: (level, onChange?: (e: any) => void) => levelSelector(options, level, onChange),

  afterRender: () => {
    applyCustomTheme();
  },

  generateQuestions: async level => {
    return getRandomQuestions(JsHomework, window.ALL_QUESTIONS, level, false);
  },
  reset: () => {
    hideNotUsedElements();
  }
};
