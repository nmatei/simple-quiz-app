import { simpleAlert } from "./common/simplePrompt/simplePrompt";

window.onerror = function (message, source, lineno, colno, error) {
  simpleAlert(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${JSON.stringify(error)}`
  );
  return false; // Returning false will suppress the default browser error message
};

import { startQuiz } from "./quiz";
import { polyfills } from "./common/polyfills";

polyfills();

import "./css/root.css";
import "./css/style.css";
import "./css/print.css";
import "./css/CustomScrollChrome.css";
import "./components/multiselect/style.css";
import "./common/simplePrompt/simplePrompt.css";

// function start() {
//   window.removeEventListener("focus", start);
//   console.warn("start");
//   // startQuiz();
// }
//
// window.addEventListener("focus", start);

startQuiz();
