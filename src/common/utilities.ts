import { getEl, getEls, getStoredUserName, setText } from "./common";
import { createMultiSelect, SelectType } from "../components/multiselect";
import { simpleAlert, simpleConfirm } from "./simplePrompt/simplePrompt";

declare var ace: any;

const defaultCodeType = "js";

let submitted = false;

export function isSubmitted() {
  return submitted;
}
export function setSubmitted(value: boolean) {
  submitted = value;
}

// Store zipGradeCSV as a global variable so it can be accessed from getContextMenuActions
export let zipGradeCSV: string[] = [];

export function getParam(name: string) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(name);
}

export function setParam(name: string, value?: number | string) {
  const searchParams = new URLSearchParams(location.search);
  if (typeof value === "undefined") {
    searchParams.delete(name);
  } else {
    searchParams.set(name, value + "");
  }
  const search = searchParams.toString();
  history.pushState(null, "", `?${search}`);
}

export function setParams(params: {} = {}) {
  const searchParams = new URLSearchParams(location.search);
  Object.entries(params).forEach(([key, value]) => {
    // @ts-ignore
    searchParams.set(key, value);
  });
  const search = searchParams.toString();
  history.pushState(null, "", `?${search}`);
}

export function getLevels(generator?: QuizGenerator) {
  const levelValue = getParam("level");
  if (levelValue) {
    return levelValue.split(/\s*-\s*/).map(level => parseInt(level));
  }
  // If no level is selected and generator is provided, use its defaultLevels
  if (generator && generator.defaultLevels && generator.defaultLevels.length) {
    return [...generator.defaultLevels];
  }
  return [];
}

export const externalImport = (sources: string | string[]) => {
  sources = [].concat(sources);

  return Promise.all(
    sources.map(src => {
      return new Promise<void>(resolve => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.async = false; // keep order of scripts
        script.onload = () => {
          resolve();
        };
        document.getElementsByTagName("head")[0].appendChild(script);
      });
    })
  );
};

export function getRandomLetter() {
  const s = "abcdefghijklmnopqrstuvwxyz";
  return s[Math.floor(Math.random() * s.length)];
}

export function getRandomQuestions(
  generator: QuizGenerator,
  allQuestions: QuizOption[],
  levels: number[],
  withAnswers: boolean = true
) {
  let questions = allQuestions.filter(
    q => levels.includes(q.level) && (withAnswers ? (q.answers && q.answers.length) || q.answerType === "number" : true)
  );

  // get random questions from different domains
  //@ts-ignore
  questions.shuffle();

  // filter out multiple questions with same groupId
  const groupIds = new Set();
  questions = questions.filter(q => {
    if (q.groupId && groupIds.has(q.groupId)) {
      return false; // skip if groupId already exists
    }
    if (q.groupId) {
      groupIds.add(q.groupId);
    }
    return true;
  });

  // console.info("questions all", questions);

  // Sort questions based on preview correct answers.
  // correct answers will be moved to end.
  const { values } = getPrevAnswers(generator);

  //console.info("prev answers", values);
  questions.sort((q1, q2) => {
    return (values[`${q1.level}-${q1.id}`] || 0) - (values[`${q2.level}-${q2.id}`] || 0);
  });

  // console.info(
  //   "sort",
  //   questions.map(q => q.id)
  // );

  questions = questions.slice(0, generator.displayLimit);

  // console.info(
  //   "questions after limit",
  //   questions.map(q => q.id)
  // );

  if (!["questions", "q", "both"].includes(generator.shuffle)) {
    // sort by id in case we shuffle not specified for questions
    questions.sort((a, b) => a.id - b.id);
  }

  // always sort by level
  sortByLevel(questions, levels);
  return questions;
}

export function sortByLevel(questions: QuizOption[], levels: number[]) {
  const levelMap = levels.reduce(
    (acc, level, i) => ({
      ...acc,
      [level]: i
    }),
    {} as { [key: number]: number }
  );
  questions.sort((a, b) => {
    if (typeof levelMap[a.level] !== "undefined" && typeof levelMap[b.level] !== "undefined") {
      return levelMap[a.level] - levelMap[b.level];
    }
    return a.level - b.level;
  });
}

export function applyTranslations(questions: QuizOption[], i18n: Localization) {
  questions.forEach(question => {
    const translation = (i18n.questions || {})[question.id];
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
    question.answers = (question.answers || []).map((answer, i) => {
      const text = typeof answer === "string" ? answer : answer.text;
      return {
        ...(typeof answer === "string" ? { id: i + 1 } : answer),
        text: i18n.common[text] || text
      };
    });
  });
}

export function applyCustomTheme() {
  const typeMatch = {
    js: "ace/mode/javascript",
    html: "ace/mode/html",
    css: "ace/mode/css"
  };

  const codeEls = getEls("article .code");
  codeEls.forEach(el => {
    const type = el.getAttribute("data-type");
    const readOnly = el.getAttribute("data-readOnly") === "true";
    const allowCopy = el.getAttribute("data-copy") === "true";
    const editor = ace.edit(el);
    const beautify = ace.require("ace/ext/beautify");
    const session = editor.getSession();

    editor.setReadOnly(readOnly);
    if (!allowCopy) {
      session.selection.on("changeSelection", () => {
        session.selection.clearSelection();
      });
    }

    editor.setTheme("ace/theme/monokai");
    // @ts-ignore
    const codeType = typeMatch[type];
    session.setMode(codeType);
    beautify.beautify(session);

    editor.setOptions({
      maxLines: Infinity
    });
  });
}

export function createSelect({ id, name, label, cls, value, options, onChange }: SelectType) {
  const el = document.createElement("div");
  el.classList.add(...[].concat(cls));
  el.innerHTML = `
    <label for="${id}" id="${id}-label">
      <span class="form-label">${label}</span>
      <select name="${name || id}" id="${id}">
        ${options
          .map(e => `<option value="${e.value}" ${e.value === value ? 'selected="selected"' : ""}>${e.text}</option>`)
          .join("")}
      </select>
    </label>
  `;
  getEl<HTMLSelectElement>("select", el).addEventListener("change", onChange);
  return el;
}

export function createToolbar() {
  const tbar = document.createElement("div");
  tbar.classList.add("tbar");
  return tbar;
}

export function createTbFill() {
  const tbfill = document.createElement("div");
  tbfill.classList.add("tfill");
  return tbfill;
}

export const levelSelector = (
  options: {
    value: number | string;
    text: string;
  }[],
  value: number[],
  onChange?: (levels: number[]) => void
) => {
  return createMultiSelect({
    id: "levelSelector",
    label: "Level",
    cls: "inline-input",
    value: value,
    options: options,
    onChange: onChange
  });
};

export function initTime() {
  const date = new Date();
  const day = date.toISOString().substring(0, 10);
  const hour = date.toTimeString().substring(0, 5);
  const testTime = `${day} ${hour}`;
  setText("#test-date", testTime);
  localStorage.setItem("quiz-test-start-time", testTime);
  return day;
}

function animateChange(e: Event) {
  const el = <HTMLInputElement>e.target;
  const article = el.closest("article");
  article.classList.remove("changed");
  getEls("label", article).forEach(label => {
    label.classList.remove("checked");
  });
  setTimeout(() => {
    article.classList.add("changed");
    el.closest("label").classList.add("checked");
  }, 50);
}

function animateChangeAnswer() {
  getEls<HTMLInputElement>("article ol input").forEach(el => {
    if (el.type === "checkbox" || el.type === "radio") {
      el.addEventListener("input", animateChange);
    } else if (el.type === "text" || el.type === "number") {
      el.addEventListener("change", animateChange);
    }
  });
}

export const Quiz = (function () {
  let _generator: QuizGenerator;
  const entityToChar = {
    "&amp;": "&",
    "&gt;": ">",
    "&lt;": "<",
    "&quot;": '"',
    "&#39;": "'"
  };
  const charToEntity: { [key: string]: string } = {};
  const charToEntityRegex = (function () {
    const charKeys = [];
    for (let key in entityToChar) {
      //@ts-ignore
      const echar = entityToChar[key];
      charToEntity[echar] = key;
      charKeys.push(echar);
    }
    return new RegExp("(" + charKeys.join("|") + ")", "g");
  })();

  function selectInput(index: number | string) {
    return `<input type="checkbox" value="${index}" class="select">`;
  }

  function getQuestionNr(showId: boolean, question: QuizOption, index: number) {
    return showId ? `${selectInput(question.id)} [${question.level}-${question.id}] ${index}` : `${index}`;
  }

  const htmlEncodeReplaceFn = function (match: any, capture: string) {
    return charToEntity[capture];
  };

  return {
    renderedQuestions: [] as QuizOption[],
    answers: {} as {
      [key: string]: (string | number | boolean)[];
    },

    removeAll: () => {
      const articles = getEls("#questions article");
      articles.forEach(article => {
        article.parentNode.removeChild(article);
      });
    },

    reset: async (questions?: QuizOption[]) => {
      setSubmitted(false);
      Quiz.removeAll();
      if (!questions) {
        questions = await _generator.generateQuestions(getLevels(_generator));
      }
      initTime();
      Quiz.render(questions, _generator);

      getEls(".test-result .q-point").forEach(el => {
        el.dataset.percent = "";
        el.innerHTML = "&nbsp;";
      });
      const submitBtn = getEl<HTMLButtonElement>("#submit-test");
      submitBtn.style.display = "";
      submitBtn.disabled = false;
    },

    render: (questions: QuizOption[], generator: QuizGenerator) => {
      const index = getParam("index");
      const showId = index === "id";
      let currentLevel: number | null = null;
      const options = (generator.getOptions ? generator.getOptions() : []).reduce(
        (acc, option) => {
          acc[option.value] = option.short || option.text;
          return acc;
        },
        {} as { [key: number]: string }
      );

      questions.forEach((question, index) => {
        const article = printQ(generator, question, getQuestionNr(showId, question, index + 1));

        // add group title (level short name) if level has changed
        if (currentLevel !== question.level) {
          const groupName = "📖 " + options[question.level];
          const titleEl = document.createElement("h1");
          titleEl.textContent = groupName;
          if (article.firstChild) {
            article.insertBefore(titleEl, article.firstChild);
          }
          currentLevel = question.level;
        }
      });
      _generator = generator;
      if (_generator) {
        _generator.afterRender();
      }
      Quiz.correctAnswers(questions);

      animateChangeAnswer();
    },

    isNumber: (answerType: AnswerType) => answerType === "number",

    isText: (answerType: AnswerType) => answerType === "text",

    correctAnswers: (questions: QuizOption[]) => {
      Quiz.renderedQuestions = questions;
      questions = questions.filter(q => q.answers);
      // store answers for later use
      // TODO identify correct ts types and remove ts-ignore
      //@ts-ignore
      Quiz.answers = window.correctAnswers = questions.reduce((acc, question) => {
        let correct: string | number;
        if (Quiz.isNumber(question.answerType)) {
          correct = question.answers[0].correct as number;
        } else if (Quiz.isText(question.answerType)) {
          correct = question.answers[0].correct as string | number;
          // TODO custom logic for correct answers (eg. a function to process the answer - ignore spaces and case)
          //console.warn("TODO test flow, correct", correct, question);
        } else {
          const correctAns = question.answers.find(a => a.correct === true);
          if (correctAns) {
            correct = correctAns.id;
          }
        }
        if (typeof correct !== "undefined") {
          acc[question.level] = acc[question.level] || {};
          //@ts-ignore
          acc[question.level][question.id] = correct;
        }
        return acc;
      }, {} as CorrectAnswers);
    },

    htmlEncode: (value: string) => {
      return !value ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
    },

    sanitizeAnswer: (answer: Answer) => {
      let text = Quiz.htmlEncode(answer.text as string);
      switch (answer.type) {
        case "mixed":
          text = answer.text as string;
          break;
        case "js":
          text = `<code>${text}</code>`;
          break;
        case "html":
          text = `<code>${text}</code>`;
          break;
        case "css":
          text = `<code>${text}</code>`;
          break;
        case "code":
          text = `<code>${text}</code>`;
          break;
      }
      return text;
    },

    checkPoints: (answers: any[], correctAnswers: number[]) => {
      //console.log(answers, "vs", correctAnswers);
      if (!correctAnswers) {
        const { level, id } = answers[0];
        console.warn("you must provide correctAnswers", answers, id);
        console.warn("question", getEl(`input[name="${level}-${id}"]`).closest("article"));
        correctAnswers = [];
      }

      return answers.map(answer => {
        let required,
          point,
          correctAnswer: string | number = "";
        if (Quiz.isNumber(answer.type)) {
          required = true;
          const correctAnswer = correctAnswers[0];
          const isCorrect = answer.value === correctAnswer;
          point = isCorrect ? 1 : 0;
        } else if (Quiz.isText(answer.type)) {
          required = true;
          const correct = ((correctAnswers[0] || "") as string).trim().toLowerCase();
          correctAnswer = correctAnswers[0] || ("" as string);
          const isCorrect = (answer.value || "").trim().toLowerCase() === correct;
          point = isCorrect ? 1 : 0;
        } else {
          required = correctAnswers.indexOf(answer.value) >= 0;
          point = answer.checked && required ? 1 : answer.checked ? -1 : 0;
        }
        return {
          ...answer,
          correctAnswer,
          point,
          required
        };
      });
    },

    markResults: (answers: any[], generator: QuizGenerator) => {
      //console.warn("checks", answers);
      const showCorrectAnswers = generator.showCorrectAnswers;
      answers.forEach(answer => {
        const { level, id, required, checked } = answer;
        const article = getEl(`#q-${level}-${id}`);
        let input: HTMLElement;
        const isText = Quiz.isText(answer.type) || Quiz.isNumber(answer.type);
        if (isText) {
          input = getEl(`input[name="${level}-${id}"]`, article);

          const label = getEl(`label[for="${level}-${id}"].missing-word`, article);
          if (label && answer.correctAnswer && (showCorrectAnswers || answer.point)) {
            label.innerText = answer.correctAnswer;
          }
        } else {
          input = getEl(`input[name="${level}-${id}"][value="${answer.value}"]`, article);
        }

        const label = <HTMLElement>input.parentNode;

        // reset current results
        label.classList.remove("correct-answer", "required-answer", "incorrect-answer");

        if (required && checked) {
          if (!isText || answer.point) {
            label.classList.add("correct-answer");
          } else {
            label.classList.add("incorrect-answer");
          }
        } else if (required && !checked) {
          if (showCorrectAnswers) {
            label.classList.add("required-answer");
          }
        } else if (!required && checked) {
          label.classList.add("incorrect-answer");
        }
      });
    }
  };
})();

//@ts-ignore
Array.prototype.shuffle = function () {
  var i = this.length,
    j,
    temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

// TODO https://github.com/ajaxorg/ace/issues/3403
const sanitizeHTMLCode = (code: string) => {
  // TODO html encode to show &lt;
  code = code.replace(/</g, "&lt;");
  return code;
};

const sanitizeCSSCode = (code: string) => {
  // TODO html encode to show &lt;
  //code = code.replace(/</g, "&lt;");
  return code;
};

/**
 * TODO when use map(function(){}) - we get }\n)
 * @param code
 * @returns {*}
 */
const sanitizeCode = (code: string) => {
  // TODO html encode to show &lt;
  code = code.replace(/</g, "&lt;");
  // TODO find why in simple function is not working
  // eg. q: `function name(){if("yes" == 'yes'){console.log(x);}}name();`
  //code = code.replace(/\}/g, "}\n"); // make sure after } is at least one enter

  //tmp sol:
  code = code.replace(/\}\}/g, "} } ");

  code = code.replace(/\n\s*\n/g, "\n"); // remove multi enters
  return code;
};

/**
 * @param {String} fnString
 */
const getCodeFromFunction = (fnString: string) => {
  let code = fnString.trim();

  // remove "() => {" or "function q1() {" from begining of functions
  // only first (this is why we don't have "/g" in regex
  code = code.replace(/\s*\(\s*\)\s*=>\s*{/, "");
  code = code.replace(/function\s+q\d+\(\)\s*\{/, "");

  // replace last "}" from function
  code = code.substring(0, code.length - 1);

  //code = code.replace(/\s+/g, ' ');
  return sanitizeCode(code);
};

/**
 * @param {QuizGenerator} generator
 * @param {QuizOption} options
 * @param {String} qNumber
 */
function printQ(generator: QuizGenerator, options: QuizOption, qNumber: string) {
  let code = options.q;
  const type = options.type || defaultCodeType;

  if (type === "css" && typeof code === "string") {
    code = sanitizeCSSCode(code);
  } else if (type === "html" && typeof code === "string") {
    code = sanitizeHTMLCode(code);
  } else if (typeof code === "function") {
    code = getCodeFromFunction(code.toString());
  } else if (code) {
    code = sanitizeCode(code);
  }

  const answerType = options.answerType || "checkbox";
  const shuffle =
    typeof options.shuffle === "boolean" ? options.shuffle : ["answers", "a", "both"].includes(generator.shuffle);
  const id = typeof options.id !== "undefined" ? options.id : qNumber;
  const level = options.level;
  const answers = options.answers ? createAnswersSelector(level, options.id, options.answers, answerType, shuffle) : "";
  const question = getQuestionTpl(options.text, code, answers, qNumber, type, options);
  question.id = `q-${level}-${id}`;
  question.dataset.level = level + "";

  const container = getEl("#questions");
  container.appendChild(question);
  return question;
}

const getQuestionTpl = (
  title: string,
  code: string,
  answers: string,
  qNumber: string | number,
  type: string,
  options: QuizOption
) => {
  const answerSection = answers
    ? `<ol type="A" class="${options.answerDisplay || ""}">
         ${answers}
       </ol>`
    : "";

  qNumber = qNumber ? qNumber + ") " : "";

  const copy = typeof options.copy !== "undefined" ? options.copy : false;
  const readOnly = typeof options.readOnly !== "undefined" ? options.readOnly : !copy;
  const codeBlock = code
    ? `<pre class="code" data-type="${type}" data-readOnly="${readOnly}" data-copy="${copy}">${code}</pre>`
    : "";

  const element = document.createElement("article");
  element.innerHTML = `<h2><span class="q-point"></span><span class="q-nr">${qNumber}</span>${title}</h2>
    ${codeBlock}
    ${answerSection}`;
  if (options.disabled) {
    element.classList.add("disabled");
  }
  return element;
};

/**
 *
 * @param {Number} level
 * @param {String} id
 * @param {Array} answers
 * @param {AnswerType} answerType
 * @param {Boolean} shuffle
 */
export const createAnswersSelector = (
  level: number,
  id: string | number,
  answers: (string | Answer)[],
  answerType: AnswerType,
  shuffle: boolean
) => {
  const mappedAnswers = (answers || []).map((answer, i) => {
    return {
      ...(typeof answer === "string" ? { id: i + 1, text: answer } : answer)
    };
  });
  if (shuffle) {
    //@ts-ignore
    mappedAnswers.shuffle();
  }
  return mappedAnswers
    .map(answer => {
      if (Quiz.isText(answerType) || Quiz.isNumber(answerType)) {
        return `<li><label>${Quiz.sanitizeAnswer(
          answer
        )}<input class="answer" type="${answerType}" name="${level}-${id}" id="${level}-${id}" value=""></label></li>`;
      } else {
        return `<li><label><input class="answer" type="${answerType}" name="${level}-${id}" value="${
          answer.id
        }">${Quiz.sanitizeAnswer(answer)}</label></li>`;
      }
    })
    .join("");
};

export function cleanupQNumbering(text: string) {
  return text.replace(/^\s*(\d+)\s*\.\s*/, "").trim();
}

export function cleanupNumbering(text: string) {
  return text.replace(/^\s*(\w+|\d{2,})\s*\)\s*/, "").trim();
}

export function getFileName(path: string) {
  const parts = path.split("/");
  return parts[parts.length - 1];
}

export function getPreviewQuestions(value: string, lastId: number, level: number) {
  return value
    .trim()
    .split(/\n{2,}/)
    .map((q, i) => {
      const [text, ...answers] = q.split(/\n/);
      let question: QuizOption = {
        id: lastId + i + 1,
        level: level,
        answerType: "radio",
        text: cleanupQNumbering(text),
        answers: answers.map((answer, i) => ({
          id: i + 1,
          text: cleanupNumbering(answer)
        }))
      };
      return question;
    });
}

type InputType = {
  id: string;
  level: number;
  value: string | number;
  checked: boolean;
  type: AnswerType;
};
type AnswersType = {
  [key: string]: InputType[];
};

export const collectAnswers = () => {
  const inputs = getEls<HTMLInputElement>("input.answer");
  const answers = inputs.map(input => {
    const [level, id] = input.name.split("-");
    const type = input.type as AnswerType;
    const isText = Quiz.isText(type);
    const isNumber = Quiz.isNumber(type);
    return {
      id: id,
      level: parseInt(level),
      value: isText ? input.value : parseInt(input.value),
      checked: isText || isNumber ? input.value !== "" : input.checked,
      type: type
    } as InputType;
  });

  return answers.reduce((acc, answer) => {
    const key = `${answer.level}-${answer.id}`;
    acc[key] = acc[key] || [];
    acc[key].push(answer);
    return acc;
  }, {} as AnswersType);
};

const calculatePoints = (answers: {}[], correctAnswers: number[], generator: QuizGenerator) => {
  const inputs = Quiz.checkPoints(answers, correctAnswers);

  Quiz.markResults(inputs, generator);

  const total = inputs.reduce((sum: number, answer: any) => sum + answer.point, 0);

  let average = correctAnswers.length;
  if (average === 0) {
    average = 1;
  }
  return (total > 0 ? total : 0) / average;
};

// TODO this function can be removed after few releases
function cleanupOldAnswers(values: { [key: string]: number }) {
  // migration from old answers
  let answersChanges = false; // if required answers changed
  Object.keys(values).forEach(key => {
    // if key does does not contain "- " (e.g. {level}-{id}) then remove it from values
    if (!key.includes("-")) {
      answersChanges = true;
      delete values[key];
    }
  });
  return answersChanges;
}

/*
// TEST = set all answers to 1

const storageKey = `quiz-bible-nicolaematei-answers`;
const level = 1;
const values = JSON.parse(localStorage.getItem(storageKey))
for(var i = 1; i <= 45; i++){
    values[`${level}-${i}`] = values[`${level}-${i}`] || 0;
    values[`${level}-${i}`]++
}
localStorage.setItem(storageKey, JSON.stringify(values));
*/

export function getPrevAnswers(generator: QuizGenerator) {
  const name = getStoredUserName().toLowerCase().replace(/\s+/i, "");
  const storageKey = `quiz-${generator.domain}-${name}-answers`;
  const values: { [key: string]: number } = JSON.parse(localStorage.getItem(storageKey)) || {};

  if (cleanupOldAnswers(values)) {
    // if we had old answers then save them again
    localStorage.setItem(storageKey, JSON.stringify(values));
  }

  return {
    storageKey,
    values
  };
}

async function storeCorrectAnswers(correct: string[], generator: QuizGenerator) {
  const { storageKey, values } = getPrevAnswers(generator);
  const newValues = { ...values };
  correct.forEach(key => {
    newValues[key] = newValues[key] || 0;
    newValues[key]++;
  });
  localStorage.setItem(storageKey, JSON.stringify(newValues));
  return {
    oldValues: values,
    newValues: newValues
  };
}

const showAnswers = async (answers: AnswersType, correctAnswers: CorrectAnswers, generator: QuizGenerator) => {
  const total = Object.keys(answers).length;
  let points = 0;
  const correct: string[] = [];

  //console.info("correctAnswers", correctAnswers);
  zipGradeCSV = ["Key Letter,Question Number,Response/Mapping,Point Value,Tags"];

  Object.entries(answers).forEach(([key, value], i) => {
    const [level, id] = key.split("-");
    const answersValues = (correctAnswers[level] || {})[id];

    const letterIndex = value.findIndex(a => a.value === answersValues);
    const letter = String.fromCharCode(65 + letterIndex); // A, B, C, D, ...'
    zipGradeCSV.push(`${i + 1},${letter},1`);

    const p = calculatePoints(value, [].concat(answersValues), generator);
    const qPoint = Math.round(p * 100) / 100;
    setText(`#q-${key} .q-point`, `${qPoint}`);
    if (qPoint === 1) {
      getEl(`#q-${key}`).classList.add("correct");
      correct.push(key);
    }
    //console.warn("print points", id, p);
    points += p;
  });

  //@ts-ignore
  points = points.toFixed(generator.pointsDigits);
  getEls(".test-result .q-point").forEach(el => {
    el.dataset.percent = ((points * 100) / total).toFixed(1) + "%";
    el.innerHTML = `${points}/${total}`;
  });

  getEl<HTMLButtonElement>("#submit-test").disabled = true;

  setFormReadOnly(true);

  const stats = await storeCorrectAnswers(correct, generator);
  if (generator.getOptions) {
    await showStatistics({
      ...stats,
      options: generator.getOptions(),
      generator: generator,
      points,
      total
    });
  }

  const test = getParam("test");
  if (test) {
    printPage();
  }
};

let countBlur = true;

export function setCountBlur(value: boolean) {
  countBlur = value;
}
export function getCountBlur() {
  return countBlur;
}
export function printPage() {
  setCountBlur(false);
  window.print();
  setTimeout(() => {
    setCountBlur(true);
  }, 5000);
}

const setFormReadOnly = (readOnly: boolean) => {
  const inputs = getEls<HTMLInputElement>("input.answer");
  inputs.forEach(input => {
    if (input.type === "radio" || input.type === "checkbox") {
      input.disabled = readOnly;
    } else {
      input.readOnly = readOnly;
    }
  });
};

export function selectQuestions(filterFn: (art: HTMLElement, index: number, selected: number) => boolean = () => true) {
  const articles = getEls("article");
  let selected = 0;
  articles.forEach((article, index) => {
    if (!article.classList.contains("disabled") && filterFn(article, index, selected)) {
      article.classList.add("selected");
      getEl<HTMLInputElement>("input.select", article).checked = true;
      selected++;
    }
  });
  const copyIdsBtn = getEl<HTMLButtonElement>("#copy-ids");
  copyIdsBtn.disabled = selected === 0;
  copyIdsBtn.innerHTML = `Copy ID's (${selected})`;
  // TODO update title with selected count
}

async function resetStatistics(generator: QuizGenerator) {
  const msg = "Are you sure you want to reset your statistics? This action cannot be undone.";
  const reset = await simpleConfirm(msg, { ok: "Reset", cancel: "Cancel" });
  if (!reset) {
    return;
  }
  const name = getStoredUserName().toLowerCase().replace(/\s+/i, "");
  const storageKey = `quiz-${generator.domain}-${name}-answers`;
  localStorage.removeItem(storageKey);
  console.info("Statistics reset for %o", storageKey);
  await simpleAlert("Statistics have been reset successfully!");
}

export async function showStatistics({
  options,
  generator,
  newValues,
  points = 0,
  total = 0
}: {
  options: BaseLevel[];
  generator: QuizGenerator;
  oldValues?: { [key: string]: number };
  newValues: { [key: string]: number };
  points?: number;
  total?: number;
}): Promise<void> {
  // Create table rows for each level with statistics
  // console.warn("oldValues", oldValues);

  const keys = Object.keys(newValues || {});
  // Get current active levels
  const currentLevels = getLevels(generator);

  // Collect statistics for each level
  const levelStats = options
    .map(option => {
      const levelId = option.value;
      // Get the count of answered questions for this level
      const answers = keys.filter(key => {
        const [level] = key.split("-");
        return parseInt(level, 10) === levelId;
      });
      const min = Math.min(...answers.map(key => newValues[key] || 0));
      const answeredCount = answers.length;
      // Get the total questions for this level
      const totalCount = generator.ALL_QUESTIONS.filter(q => q.level === levelId).length;

      return {
        cls: currentLevels.includes(levelId) ? "active-level" : "",
        level: levelId,
        shortName: option.short || option.text,
        answered: answeredCount,
        total: totalCount,
        percentage: totalCount > 0 ? ((answeredCount * 100) / totalCount).toFixed(1) : "0",
        levelCoveredTimes: answers.length && answeredCount === totalCount ? min : 0 // How many times this level was covered
      };
    })
    .filter(stat => stat.total > 0); // Only show levels with questions

  // Create table HTML
  let tableHtml = `
    <table class="statistics-table">
      <thead>
        <tr>
          <th>Level</th>
          <th>Answers</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
    `;

  // Add rows for each level
  levelStats.forEach(stat => {
    // Create a progress bar with two colors
    const percentage = Math.min(parseFloat(stat.percentage), 100);
    const coveredTimes = stat.levelCoveredTimes;
    const times = coveredTimes ? (coveredTimes > 9 ? "9+" : coveredTimes) : "";
    tableHtml += `
      <tr class="${stat.cls}">
        <td>${stat.shortName}</td>
        <td class="align-r">${stat.answered} / ${stat.total}</td>
        <td>
          <div class="progress-container" data-covered-times="${times}">
            <div class="progress-bar" style="width: ${percentage}%;" data-percent="${percentage}%"></div>
            <span class="progress-text">${percentage}%</span>
          </div>
        </td>
      </tr>
    `;
  });

  if (total > 0) {
    // Add a total row
    tableHtml += `
      <tr class="total-row">
        <td><strong class="reference-title">Resultat</strong></td>
        <td class="align-r"><strong>${points} / ${total}</strong></td>
        <td>
          <div class="progress-container">
            <div class="progress-bar" style="width: ${((points * 100) / total).toFixed(1)}%;" data-percent="${((points * 100) / total).toFixed(1)}%"></div>
            <span class="progress-text">${((points * 100) / total).toFixed(1)}%</span>
          </div>
        </td>
      </tr>
    `;
  }

  tableHtml += `
      </tbody>
    </table>
  `;

  const title = `📊 Statistics - ${getStoredUserName()}`;
  const reset = await simpleConfirm(`<h2 class="reference-title">${title}</h2>` + tableHtml, {
    ok: "Reset",
    cancel: "Close"
  });
  if (reset) {
    await resetStatistics(generator);
  }
}

export const submitTest = async (generator: QuizGenerator) => {
  //console.clear();
  setSubmitted(true);

  const answers = collectAnswers();
  console.info("user answers %o", answers);

  const urls = [].concat(generator.answersUrl).filter(Boolean);

  const requests = urls.map(async url => {
    const response = await fetch(url);
    const correctAnswers: CorrectAnswers = await response.json();
    return correctAnswers;
  });

  let correctAnswers: CorrectAnswers = {};
  if (JSON.stringify(window.correctAnswers) !== "{}") {
    // if we have already loaded answers then use them
    correctAnswers = window.correctAnswers;
  }

  correctAnswers = await Promise.allSettled(requests).then(results => {
    return results.reduce((acc, result) => {
      if (result.status === "fulfilled") {
        acc = {
          ...acc,
          ...result.value
        };
      } else {
        console.error("Error loading questions:", result.reason);
      }
      return acc;
    }, correctAnswers);
  });

  if (generator.remapCorrectAnswers) {
    // if we have a remap function then use it to remap correct answers
    correctAnswers = generator.remapCorrectAnswers(correctAnswers);
  }
  //console.warn("correctAnswers", correctAnswers);

  await showAnswers(answers, correctAnswers, generator);
};

/**
 * Utility function to select radio/checkbox answers in the quiz based on PDF answers
 * Usage in browser console:
 *
 * selectAnswersFromPDF(`1-a
 * 2-b
 * 3-c
 * 4-a`)
 *
 * @param answersText - Copy/pasted text from PDF containing answers like "1-a\n2-b\n3-c"
 */
export function selectAnswersFromPDF(answersText: string) {
  const lines = answersText.trim().split("\n");
  let selectedCount = 0;
  let notFoundCount = 0;

  lines.forEach(line => {
    // Match format: "1-a" or " 4-a" or "64-a"
    const match = line.trim().match(/^(\d+)\s*-\s*([abc])/i);
    if (match) {
      const questionNr = match[1];
      const answer = match[2].toLowerCase();
      // Convert a=1, b=2, c=3
      const answerValue = answer === "a" ? 1 : answer === "b" ? 2 : 3;

      // Find the question article by looking for the question number in the title
      const articles = getEls("article");
      let found = false;

      for (const article of articles) {
        const qNrSpan = getEl(".q-nr", article);
        if (qNrSpan) {
          // Extract question number from text like "[1-2] 2)" or "1)"
          const qText = qNrSpan.textContent || "";
          const qMatch = qText.match(/\]\s*(\d+)\)|\s*(\d+)\)/);
          if (qMatch) {
            const displayedQuestionNr = qMatch[1] || qMatch[2];
            if (displayedQuestionNr === questionNr) {
              // Found the question, now select the answer
              const inputs = getEls<HTMLInputElement>(`input.answer[value="${answerValue}"]`, article);
              if (inputs.length > 0) {
                const input = inputs[0];
                if (input.type === "checkbox") {
                  input.checked = true;
                } else if (input.type === "radio") {
                  input.checked = true;
                }
                selectedCount++;
                found = true;
                console.log(`✓ Question ${questionNr}: selected answer ${answer.toUpperCase()} (${answerValue})`);
              }
              break;
            }
          }
        }
      }

      if (!found) {
        notFoundCount++;
        console.warn(`✗ Question ${questionNr}: not found on page`);
      }
    }
  });

  console.log(`\n📊 Summary: Selected ${selectedCount} answers, ${notFoundCount} not found`);
  return { selectedCount, notFoundCount };
}

// Make it available globally for console use
if (typeof window !== "undefined") {
  (window as any).selectAnswersFromPDF = selectAnswersFromPDF;
}
