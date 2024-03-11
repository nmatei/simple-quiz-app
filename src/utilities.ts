import { bin2hex, hex2bin } from "./libs/external-utilities";
import { getEl, setText } from "./common";

declare var ace: any;

const defaultCodeType = "js";

export function getParam(name: string) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(name);
}

export function setParam(name: string, value: any) {
  const searchParams = new URLSearchParams(location.search);
  searchParams.set(name, value);
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

export function getLevel() {
  const levelValue = getParam("level");
  // TODO generator.getDefaultLevel();
  return levelValue ? parseInt(levelValue) : 10;
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
  level: number,
  withAnswers: boolean = true
) {
  let questions = allQuestions.filter(
    q =>
      (level ? q.level === level : true) &&
      (withAnswers ? (q.answers && q.answers.length) || q.answerType === "number" : true)
  );

  if (generator.shuffle) {
    //@ts-ignore
    questions.shuffle();
  }

  questions = questions.sort((a, b) => a.level - b.level).slice(0, generator.displayLimit);

  return questions;
}

export function applyCustomTheme() {
  const typeMatch = {
    js: "ace/mode/javascript",
    html: "ace/mode/html"
  };

  const codeEls = Array.from(document.querySelectorAll("article .code"));
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
    session.setMode(typeMatch[type]);
    beautify.beautify(session);

    editor.setOptions({
      maxLines: Infinity
    });
  });
}

function findIndexesByIds(ids: string[]) {
  return window.ALL_QUESTIONS.map((q, i) => (ids.some(id => id == q.id) ? i : -1)).filter(i => i >= 0);
}

export function getPublicTestLink(ids: string[], expire: number) {
  const shiftKey = getShiftKey(new Date());
  const minutes = Math.floor(new Date().getTime() / 60000);
  const indexes = findIndexesByIds(ids);
  //@ts-ignore
  indexes.shuffle();

  const test = indexes.map(i => i + shiftKey).join("-");
  return bin2hex(`${test}.${minutes}.${expire}`);
}

function getTestParameters(test: string) {
  const strings = (hex2bin(test) || `.1`).split(".");
  //console.warn("strings", strings);
  const generated = parseInt(strings[1]);
  const shiftKey = getShiftKey(new Date(generated * 60000));
  return {
    questions: strings[0].split("-") as string[],
    generated,
    expire: parseInt(strings[2]),
    shiftKey
  };
}

function getShiftKey(date: Date) {
  return date.getMonth() + date.getDate();
}

export function getQuestionIndexes(test?: string) {
  test = test || getParam("test");
  if (!test) return null;

  const minutes = Math.floor(new Date().getTime() / 60000);
  const params = getTestParameters(test);
  //console.warn(params, minutes);

  if (minutes - params.generated > params.expire) {
    console.error("Link Expired", minutes - params.generated);
    alert("This link is Expired!");
    return [0, 1, 2];
  }

  return params.questions.map(n => parseInt(n) - params.shiftKey).sort((a, b) => a - b);
}

export const levelSelector = (options: any[], level: number, onChange?: (e: any) => void) => {
  const element = document.createElement("div");

  element.classList.add("level-selector");
  if (options && options.length) {
    element.innerHTML = `
      <label for="levelSelector">
        Level
      </label>
      <select name="levelSelector" id="levelSelector">
          ${options
            .map(e => `<option value="${e.value}" ${e.value === level ? 'selected="selected"' : ""}>${e.text}</option>`)
            .join("")}
      </select>
    `;

    getEl("select", element).addEventListener("change", onChange);
  }
  return element;
};

export function initTime() {
  const date = new Date();
  const day = date.toISOString().substring(0, 10);
  const hour = date.toTimeString().substring(0, 5);
  setText("#test-date", `${day} ${hour}`);
  return day;
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
      const articles = Array.from(document.querySelectorAll("#questions article"));
      articles.forEach(article => {
        article.parentNode.removeChild(article);
      });
    },

    reset: async (questions?: QuizOption[]) => {
      Quiz.removeAll();
      if (!questions) {
        questions = await _generator.generateQuestions(getLevel());
      }
      initTime();
      Quiz.render(questions, _generator);

      setText("#result .q-point", "&nbsp;");
      setText("#test-result .q-point", "&nbsp;");
      const submitBtn = getEl("#submit-test");
      submitBtn.style.display = "";
      //@ts-ignore
      submitBtn.disabled = false;
    },

    render: (questions: QuizOption[], generator: QuizGenerator) => {
      const index = getParam("index");
      const showId = index === "id";
      questions.forEach((question, index) => {
        printQ(generator, question, getQuestionNr(showId, question, index + 1));
      });
      _generator = generator;
      if (_generator) {
        _generator.afterRender();
      }
      Quiz.correctAnswers(questions);
    },

    isText: (answerType: AnswerType) => answerType === "text" || answerType === "number",

    correctAnswers: (questions: QuizOption[]) => {
      Quiz.renderedQuestions = questions;
      window.questions = questions;
      questions = questions.filter(q => q.answers);
      Quiz.answers = window.correctAnswers = questions.reduce((acc, question) => {
        let correct;
        if (Quiz.isText(question.answerType)) {
          correct = question.answers[0].correct;
        } else {
          const correctAns = question.answers.find(a => a.correct === true);
          if (correctAns) {
            correct = correctAns.id;
          }
        }
        if (typeof correct !== "undefined") {
          acc[question.id] = [correct];
        }
        return acc;
      }, {});
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
        console.warn("no correctAnswers for ", answers, answers[0].id);
        console.warn("question", getEl(`input[name="${answers[0].id}"]`).parentNode.parentNode.parentNode);
        correctAnswers = [];
      }

      return answers.map(answer => {
        let required, point;
        if (Quiz.isText(answer.type)) {
          required = true;
          point = answer.value == correctAnswers[0] ? 1 : 0;
        } else {
          required = correctAnswers.indexOf(answer.value) >= 0;
          point = answer.checked && required ? 1 : answer.checked ? -1 : 0;
        }
        return { ...answer, point, required };
      });
    },

    markResults: (answers: any[]) => {
      //console.warn("checks", answers);
      answers.forEach(answer => {
        let input: HTMLElement;
        const isText = Quiz.isText(answer.type);
        if (isText) {
          input = getEl(`input[name="${answer.id}"]`);
        } else {
          input = getEl(`input[name="${answer.id}"][value="${answer.value}"]`);
        }

        const label = <HTMLElement>input.parentNode;

        // reset current results
        label.classList.remove("correct-answer");
        label.classList.remove("required-answer");
        label.classList.remove("incorrect-answer");

        if (answer.required && answer.checked) {
          if (!isText || answer.point) {
            label.classList.add("correct-answer");
          } else {
            label.classList.add("incorrect-answer");
          }
        } else if (answer.required && !answer.checked) {
          label.classList.add("required-answer");
        } else if (!answer.required && answer.checked) {
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

  if (type === "html" && typeof code === "string") {
    code = sanitizeHTMLCode(code);
  } else if (typeof code === "function") {
    code = getCodeFromFunction(code.toString());
  } else if (code) {
    code = sanitizeCode(code);
  }

  const answerType = options.answerType || "checkbox";
  const answers = options.answers ? createAnswersSelector(options.id, options.answers, answerType, generator) : "";
  const id = typeof options.id !== "undefined" ? options.id : qNumber;
  const question = getQuestionTpl(options.text, code, answers, qNumber, id, type, options);

  const container = getEl("#questions");
  container.appendChild(question);
}

const getQuestionTpl = (
  title: string,
  code: string,
  answers: string,
  qNumber: string | number,
  id: string | number,
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
  element.id = `q-${id}`;
  element.innerHTML = `<h2><span class="q-point"></span><span class="q-nr">${qNumber}</span>${title}</h2>
    ${codeBlock}
    ${answerSection}`;
  return element;
};

/**
 *
 * @param {String} id
 * @param {Array} answers
 * @param {AnswerType} answerType
 * @param {QuizGenerator} generator
 */
const createAnswersSelector = (
  id: string | number,
  answers: Answer[],
  answerType: AnswerType,
  generator: QuizGenerator
) => {
  const mappedAnswers = (answers || []).map((answer, i) => {
    return {
      ...(typeof answer === "string" ? { id: i + 1, text: answer } : answer)
    };
  });
  if (generator.shuffle) {
    //@ts-ignore
    mappedAnswers.shuffle();
  }
  return mappedAnswers
    .map(
      answer =>
        `<li><label><input class="answer" type="${answerType}" name="${id}" value="${
          Quiz.isText(answerType) ? "" : answer.id
        }">${Quiz.sanitizeAnswer(answer)}</label></li>`
    )
    .join("");
};

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
        text: text.trim(),
        answers: answers.map((answer, i) => ({
          id: i + 1,
          text: answer.trim()
        }))
      };
      return question;
    });
}

type InputType = {
  id: string;
  value: string | number;
  checked: boolean;
  type: AnswerType;
};
type AnswersType = {
  [key: string]: InputType[];
};

export const collectAnswers = () => {
  const inputs = Array.from(document.querySelectorAll("input.answer"));
  const answers = inputs.map((input: HTMLInputElement) => {
    const type = input.type as AnswerType;
    const isText = Quiz.isText(type);
    return {
      id: input.name,
      value: isText ? input.value : parseInt(input.value),
      checked: isText ? input.value !== "" : input.checked,
      type: type
    } as InputType;
  });

  const groupAnswers = answers.reduce((acc, answer) => {
    acc[answer.id] = acc[answer.id] || [];
    acc[answer.id].push(answer);
    return acc;
  }, {} as AnswersType);

  return groupAnswers;
};

const calculatePoints = (answers: any[], correctAnswers: number[]) => {
  const inputs = Quiz.checkPoints(answers, correctAnswers);

  Quiz.markResults(inputs);

  const total = inputs.reduce((sum: number, answer: any) => sum + answer.point, 0);

  let average = correctAnswers.length;
  if (average === 0) {
    average = 1;
  }
  return (total > 0 ? total : 0) / average;
};

export type CorrectAnswers = {
  [key: string]: number | number[];
};
const showAnswers = (answers: AnswersType, correctAnswers: CorrectAnswers) => {
  const total = Object.keys(answers).length;
  let points = 0;

  for (let id in answers) {
    if (answers.hasOwnProperty(id)) {
      const p = calculatePoints(answers[id], [].concat(correctAnswers[id]));
      const qPoint = Math.round(p * 100) / 100;
      setText(`#q-${id} .q-point`, `${qPoint}`);
      if (qPoint === 1) {
        getEl(`#q-${id}`).classList.add("correct");
      }
      //console.warn("print points", id, p);
      points += p;
    }
  }

  //@ts-ignore
  points = points.toFixed(2);
  setText("#result .q-point", `${points}/${total}`);
  setText("#test-result .q-point", `${points}/${total}`);

  //@ts-ignore
  getEl("#submit-test").disabled = true;

  setFormReadOnly(true);

  const test = getParam("test");
  if (test) {
    window.print();
  }
};

const setFormReadOnly = (readOnly: boolean) => {
  const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll("input.answer"));
  inputs.forEach(input => {
    if (input.type === "radio" || input.type === "checkbox") {
      input.disabled = readOnly;
    } else {
      input.readOnly = readOnly;
    }
  });
};

export const submitTest = (generator: QuizGenerator) => {
  //console.clear();

  const answers = collectAnswers();

  // TODO combine local answers with API
  if (JSON.stringify(window.correctAnswers) !== "{}") {
    showAnswers(answers, window.correctAnswers);
  } else {
    const url = generator.answersUrl;
    //console.info("URL %o", url);
    fetch(url)
      .then(response => response.json())
      .then(correctAnswers => {
        //console.warn("answers %o vs correct %o", answers, correctAnswers);
        showAnswers(answers, correctAnswers);
      });
  }
};
