import {
  externalImport,
  levelSelector,
  getRandomQuestions
} from "../utilities";

const applyCustomTheme = () => {
  const typeMatch = {
    js: "ace/mode/javascript",
    html: "ace/mode/html"
  };

  const codeEls = Array.from(document.querySelectorAll("article .code"));
  codeEls.forEach(el => {
    const type = el.getAttribute("data-type");
    const editor = ace.edit(el);
    const beautify = ace.require("ace/ext/beautify");
    const session = editor.getSession();
    editor.setReadOnly(true);

    //console.warn("editor", editor);
    editor.getSession().selection.on("changeSelection", function(e) {
      //console.warn("changeSelection");
      editor.getSession().selection.clearSelection();
    });

    editor.setTheme("ace/theme/monokai");
    session.setMode(typeMatch[type]);
    beautify.beautify(session);

    editor.setOptions({
      maxLines: Infinity
    });
  });
};

let options = [];

const initOptions = () => {
  return Object.keys(
    ALL_QUESTIONS.reduce((prev, question) => {
      prev[question.level] = question.level;
      if (!question.level) {
        console.warn("no level", question);
      }
      return prev;
    }, {})
  ).map(level => ({
    value: level,
    text: level
  }));
};

export const JsQuiz = (function() {
  return {
    init: async () => {
      await externalImport([
        "js/questions/js.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ext-beautify.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/mode-javascript.js"
      ]);
      options = initOptions();
    },
    getLevelSelector: (level, onChange) =>
      levelSelector(options, level, onChange),

    afterRender: () => {
      applyCustomTheme();
    },

    generateQuestions: level => {
      const questions = getRandomQuestions(ALL_QUESTIONS, level);
      //questions = getExamQuestionsByIdx(indexes);

      // TODO add all answers (print all without answers)
      //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
      return questions;
    }
  };
})();
