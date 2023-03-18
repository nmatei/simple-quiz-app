import { externalImport, levelSelector, getRandomQuestions, applyCustomTheme } from "../utilities";
import { getLocalization } from "../localization/js";
import { getLanguage } from "../common";

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

function applyTranslations(questions: QuizOption[], i18n: Localization) {
  questions.forEach(question => {
    const translation = i18n.questions[question.id];
    if (translation) {
      //console.log("translation", translation);
      if (typeof translation === "string") {
        question.text = translation;
      } else {
        Object.assign(question, translation);
      }
    } else {
      question.text = i18n.common[question.text] || question.text;
    }
    (question.answers || []).forEach(answer => {
      answer.text = i18n.common[answer.text] || answer.text;
    });
  });
}

export const JsQuiz: QuizGenerator = {
  shuffle: true,
  displayLimit: 10,
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
    applyTranslations(window.ALL_QUESTIONS, imports[1]);
    options = initOptions(this);
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

  generateQuestions: level => {
    const questions = getRandomQuestions(JsQuiz, window.ALL_QUESTIONS, level, true);

    // TODO add all answers (print all without answers)
    //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
    return questions;
  },
  reset: () => {}
};
