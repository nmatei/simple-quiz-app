const API_URL = {
  ANSWERS: "js/data/answers.json"
};

/**
 * prettify Code
 * TODO format with https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ext-beautify.js
 * @param {String} code
 */
const prettifyCode = code => {
  //code = code.replace('function q', '');
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
function printQ(options) {
  if (Array.isArray(options)) {
    console.debug("is array");
    options.forEach(function(option) {
      printQ(option);
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

  const answers = createAnswersSelector(qCode.name, options.answers);
  const question = getQuestionTpl(options.text, code, answers);

  $("#questions").append(question);
}

// '<pre><code>' + code + '</code></pre>' +
const getQuestionTpl = (title, code, answers) => {
  return `<article>
    <h2>${title}</h2>
    <div class="code">
        ${code}
    </div>
    <ol type="A">
        ${answers}
    </ol>
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
