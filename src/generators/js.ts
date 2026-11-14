import {
  externalImport,
  levelSelector,
  getRandomQuestions,
  getParam,
  applyCustomTheme,
  applyTranslations
} from "../common/utilities";
import { getLocalization } from "../localization/js";
import { getLanguage } from "../common/common";

let options: BaseLevel[] = [];

export const initOptions = (generator: QuizGenerator): BaseLevel[] => {
  return Object.keys(
    generator.ALL_QUESTIONS.reduce((prev, question) => {
      prev[question.level] = question.level;
      if (!question.level) {
        console.warn("no level", question);
      }
      return prev;
    }, {} as BaseLevel)
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
      "data/questions/react-nextjs.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.45.2/ace.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.45.2/ext-beautify.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.45.2/mode-javascript.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.45.2/mode-html.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.45.2/mode-css.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.45.2/mode-jsx.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ace/1.45.2/mode-tsx.js"
    ];

    const language = getLanguage();
    const imports = await Promise.all([
      externalImport(requires),
      // i18n localization
      getLocalization(language)
    ]);

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
    22: "Object References",
    23: "Promises",
    30: "React",
    31: "Next.js",
    32: "AI in Apps",
    33: "AI Agents"
  },

  getLevelSelector: (level, onChange?: (levels: number[]) => void) => levelSelector(options, level, onChange),

  afterRender: () => {
    applyCustomTheme();
  },

  getOptions: function () {
    return options;
  },

  generateQuestions: async function (levels) {
    // ?answerType=radio (or radio,checkbox) - keep only questions with these answer types
    const answerTypes = (getParam("answerType") || "").split(",").filter(Boolean);
    const allQuestions: QuizOption[] = answerTypes.length
      ? this.ALL_QUESTIONS.filter((q: QuizOption) => answerTypes.includes(q.answerType))
      : this.ALL_QUESTIONS;

    let questions = getRandomQuestions(this, allQuestions, levels, true);

    // TODO add all answers (print all without answers)
    //questions = this.ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
    return questions;
  },

  reset: () => {}
};
