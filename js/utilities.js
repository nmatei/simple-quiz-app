const API_URL = {
  ANSWERS: "data/answers.json",
  MOCKS: "data/employees.json"
};

/**
 * prettify Code
 * TODO format with https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ext-beautify.js
 * @param {String} code
 */
const prettifyCode = code => {
  //code = code.replace('function q', '');
  code = code.replace(/\(\) \=\>\s*\{/, "");
  code = code.replace(/function q\d+\(\)\s*\{/, "");
  code = code.substring(0, code.length - 1);
  code = code.replace(/\n\s+\n/g, "\n  \n");
  code = code.replace(/\n\s{2}/g, "\n");
  // TODO html encode to show &lt;
  code = code.replace(/</g, "&lt;");
  //code = code.replace(/\s+/g, ' ');
  //code = code.trim();
  return code;
};

/**
 * TODO print strings directly if pass from BE
 *      {fn: 'if (true) {console.info("Not Equals");}', text: 'simplu'},
 * @param {JSON/Array} options
 */
function printQ(options, qNumber) {
  if (Array.isArray(options)) {
    console.debug("is array");
    options.forEach(function(option, index) {
      printQ(option, index + 1);
    });
    return;
  }
  if (typeof options === "undefined") {
    console.warn("no function");
    return;
  }

  var qCode = options.fn;

  console.warn("========== " + options.q + " ==========");
  var code = qCode.toString();

  try {
    // execute for demo
    qCode();
  } catch (e) {
    console.error(e);
  }

  code = prettifyCode(code);

  if (options.answers) {
    var answers = createAnswersSelector(qCode.name, options.answers);
  }
  const question = getQuestionTpl(options.text, code, answers, qNumber);

  $("#questions").append(question);
}

function printHelperData(options) {
  if (Array.isArray(options)) {
    console.debug("is array");
    options.forEach(function(option) {
      printHelperData(option);
    });
    return;
  }
  if (typeof options === "undefined") {
    console.warn("no function");
    return;
  }

  let code = JSON.stringify(options.helperData, null, 2);
  const question = getHelperTpl(code);

  $("#questions").append(question);
}

// '<pre><code>' + code + '</code></pre>' +
const getQuestionTpl = (title, code, answers, qNumber) => {
  const answerSection = answers ?
      `<ol type="A">
         ${answers}
       </ol>` :
      '';

  return `<article>
    <h2>${qNumber}. ${title}</h2>
    <div class="code">
        ${code}
    </div>
    ${answerSection}
    </article>`;
};

const getHelperTpl = (data) => {
  return `<article>
    <h2>Helper data:</h2>
    <div class="code">
        ${data}
    </div>
    </article>`;
};

/**
 *
 * @param {String} name
 * @param {Array} answers
 */
const createAnswersSelector = (name, answers) =>
  "<li>" +
  (answers || [])
    .map(
      answer =>
        `<label><input type="checkbox" name="${name}" value="${answer.id}">${
          answer.text
        }</label>`
    )
    .join("</li><li>") +
  "</li>";

const collectAnswers = () => {
  // document.forms[0].elements['q1']; // TODO ?? other sol to group?

  const inputs = Array.from(document.querySelectorAll("input[type=checkbox]"));
  const answers = inputs.map(input => ({
    name: input.name,
    value: input.value,
    checked: input.checked
  }));

  return answers;
};

const submitTest = () => {
  console.clear();

  const answers = collectAnswers();
  console.warn("answers", answers);

  $.ajax(API_URL.ANSWERS).done(correctAnswers => {
    console.warn("correct answers:", correctAnswers);

    let points = 0;
  });
};

const applyCustomTheme = () => {
  $("article .code").each(function(i, el) {
    console.debug("article", arguments);
    var editor = ace.edit(el);
    editor.setReadOnly(true);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    //editor.resize();

    editor.setOptions({
      maxLines: Infinity
    });
  })
};
