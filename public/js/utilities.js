const API_URL = {
  ANSWERS: "data/answers.json",
  MOCKS: "data/employees.json"
};

const Quiz = (function() {
  const entityToChar = {
    "&amp;": "&",
    "&gt;": ">",
    "&lt;": "<",
    "&quot;": '"',
    "&#39;": "'"
  };
  const charToEntity = {};
  const charToEntityRegex = (function() {
    const charKeys = [];
    for (key in entityToChar) {
      echar = entityToChar[key];
      charToEntity[echar] = key;
      charKeys.push(echar);
    }
    return new RegExp("(" + charKeys.join("|") + ")", "g");
  })();

  const htmlEncodeReplaceFn = function(match, capture) {
    return charToEntity[capture];
  };

  return {
    htmlEncode: function(value) {
      return !value
        ? value
        : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
    },

    sanitizeAnswer: answer => {
      const type = answer.type;
      let text = Quiz.htmlEncode(answer.text);
      switch (type) {
        case "js":
          text = `<code>${text}</code>`;
          break;
        case "html":
          text = `<code>${text}</code>`;
          break;
        case "css":
          text = `<code>${text}</code>`;
          break;
      }
      return text;
    }
  };
})();

Array.prototype.shuffle = function() {
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

/**
 * TODO when use map(function(){}) - we get }\n)
 * @param code
 * @returns {*}
 */
const sanitizeCode = code => {
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
const getCodeFromFunction = fnString => {
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
 * @param {JSON/Array} options
 * [{
 *     id: 1,
 *     text: 'question?',
 *     q: string/function
 * }]
 * @param {String} qNumber
 */
function printQ(options, qNumber) {
  if (Array.isArray(options)) {
    options.forEach(function(option, index) {
      printQ(option, index + 1);
    });
    return;
  }
  if (typeof options === "undefined") {
    console.warn("no function");
    return;
  }

  let code = options.q;

  if (typeof code === "function") {
    code = getCodeFromFunction(code.toString());
  } else if (code) {
    code = sanitizeCode(code);
  }

  const answers = options.answers
    ? createAnswersSelector(options.id, options.answers)
    : "";
  const question = getQuestionTpl(options.text, code, answers, qNumber);

  $("#questions").append(question);
}

const getQuestionTpl = (title, code, answers, qNumber) => {
  const answerSection = answers
    ? `<ol type="A">
         ${answers}
       </ol>`
    : "";

  qNumber = qNumber ? qNumber + ". " : "";

  const codeBlock = code ? `<div class="code">${code}</div>` : "";

  return `<article>
    <h2>${qNumber}${title}</h2>
    ${codeBlock}
    ${answerSection}
    </article>`;
};

/**
 *
 * @param {String} id
 * @param {Array} answers
 */
const createAnswersSelector = (id, answers) => {
  answers.shuffle();
  return (
    "<li>" +
    (answers || [])
      .map(
        answer =>
          `<label><input type="checkbox" name="${id}" value="${
            answer.id
          }">${Quiz.sanitizeAnswer(answer)}</label>`
      )
      .join("</li><li>") +
    "</li>"
  );
};

const collectAnswers = () => {
  const inputs = Array.from(document.querySelectorAll("input[type=checkbox]"));
  const answers = inputs.map(input => ({
    id: input.name,
    value: input.value * 1,
    checked: input.checked
  }));

  const groupAnswers = answers.reduce((acc, answer) => {
    acc[answer.id] = acc[answer.id] || [];
    acc[answer.id].push(answer);
    return acc;
  }, {});

  return groupAnswers;
};

// TODO mark valid/invalid
const calculatePoints = (answers, correctAnswers) => {
  console.log(answers, "vs", correctAnswers);
  if (!correctAnswers) {
    console.warn("no correctAnswers for ", answers);
    correctAnswers = [];
  }
  correctAnswers = [];
  const correctChecks = answers.map(answer => {
    return answer.checked && correctAnswers.indexOf(answer.value) >= 0
      ? 1
      : answer.checked
      ? -1
      : 0;
  });

  const total = correctChecks.reduce((sum, point) => sum + point, 0);

  average = correctAnswers.length;
  if (average === 0) {
    average = 1;
  }
  console.warn("checks:", total, correctChecks, average);
  return (total > 0 ? total : 0) / average;
};

const submitTest = () => {
  console.clear();

  const answers = collectAnswers();
  console.log("answers", answers);

  $.ajax(API_URL.ANSWERS).done(correctAnswers => {
    console.log("correct answers:", correctAnswers);

    let points = 0;

    for (var id in answers) {
      if (answers.hasOwnProperty(id)) {
        let p = calculatePoints(answers[id], correctAnswers[id]);
        points += p;
      }
    }

    points = points.toFixed(2);
    document.querySelector("#result span").innerHTML = points;
  });
};

const applyCustomTheme = () => {
  $("article .code").each(function(i, el) {
    const editor = ace.edit(el);
    const beautify = ace.require("ace/ext/beautify");
    const session = editor.getSession();
    editor.setReadOnly(true);
    editor.setTheme("ace/theme/monokai");
    session.setMode("ace/mode/javascript");
    beautify.beautify(session);

    editor.setOptions({
      maxLines: Infinity
    });
  });
};
