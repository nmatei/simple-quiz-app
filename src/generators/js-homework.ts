import {
  hideEl,
  externalImport,
  levelSelector,
  getRandomQuestions,
  applyCustomTheme
} from "../utilities";
import { initOptions } from "./js";

let options: any = [];

function hideNotUsedElements() {
  hideEl("#submit-test");
  hideEl("#test-result");
  hideEl("#reset");
  hideEl("#result");
}

export const JsHomework: QuizGenerator = (function () {
  return {
    init: async () => {
      hideNotUsedElements();

      window.shuffle = false;

      const requires = [
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
    getLevelSelector: (level: number, onChange?: (e: any) => void) =>
      levelSelector(options, level, onChange),

    afterRender: () => {
      applyCustomTheme();
    },

    generateQuestions: (level: number) => {
      return getRandomQuestions(window.ALL_QUESTIONS, level, false);
    },
    reset: () => {
      hideNotUsedElements();
    }
  };
})();
