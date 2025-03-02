window.onerror = function (message, source, lineno, colno, error) {
  alert(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${JSON.stringify(error)}`
  );
  return false; // Returning false will suppress the default browser error message
};

import { startQuiz } from "./quiz";

import "./css/root.css";
import "./css/style.css";
import "./css/print.css";
import "./css/CustomScrollChrome.css";
import "./components/multiselect/style.css";
import "./components/simplePrompts.css";

// function start() {
//   window.removeEventListener("focus", start);
//   console.warn("start");
//   // startQuiz();
// }
//
// window.addEventListener("focus", start);

startQuiz();
