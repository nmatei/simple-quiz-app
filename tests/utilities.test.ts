import { cleanupNumbering, cleanupQNumbering, createAnswersSelector, getFileName } from "../src/common/utilities";

describe("createAnswersSelector tests", function () {
  it("3 string answers not shuffled", function () {
    const answers = createAnswersSelector(1, ["Q1", "Q2", "Q3"], "radio", false);
    const results = [
      `<li><label><input class="answer" type="radio" name="1" value="1">Q1</label></li>`,
      `<li><label><input class="answer" type="radio" name="1" value="2">Q2</label></li>`,
      `<li><label><input class="answer" type="radio" name="1" value="3">Q3</label></li>`
    ];
    expect(results.join("")).toBe(answers);
  });

  it("3 string answers shuffled", function () {
    const answers = createAnswersSelector(1, ["Q1", "Q2", "Q3"], "radio", true);
    const results = [
      `<li><label><input class="answer" type="radio" name="1" value="1">Q1</label></li>`,
      `<li><label><input class="answer" type="radio" name="1" value="2">Q2</label></li>`,
      `<li><label><input class="answer" type="radio" name="1" value="3">Q3</label></li>`
    ];
    results.forEach(r => {
      expect(answers.indexOf(r)).toBeGreaterThan(-1);
    });
  });

  const targetSplitter = /\s*\|\s*/;
  const questions = [
    "1. question?     | question?",
    "11. question?    | question?",
    "1 . question?    | question?",
    "11 . question?   | question?",
    "111 . question?  | question?"
  ];
  test.each(questions)("cleanup question numbering %s", match => {
    const [from, expected] = match.split(targetSplitter);
    const text = cleanupQNumbering(from);
    expect(text).toBe(expected);
  });

  const answers = [
    "1) answer    | answer",
    "a) answer    | answer",
    "b) answer    | answer",
    "11) answer   | answer",
    "111) answer  | answer",
    "a ) answer   | answer",
    "b ) answer   | answer",
    "11 ) answer  | answer"
  ];
  test.each(answers)("cleanup answers numbering letters %s", match => {
    const [from, expected] = match.split(targetSplitter);
    const text = cleanupNumbering(from);
    expect(text).toBe(expected);
  });

  const files = [
    "./data/answers-2024.json     | answers-2024.json",
    "./data/questions-2024.json   | questions-2024.json",
    "./answers-2024.json          | answers-2024.json",
    "./questions-2024.json        | questions-2024.json",
    "/answers-2024.json           | answers-2024.json",
    "/questions-2024.json         | questions-2024.json",
    "answers-2024.json            | answers-2024.json",
    "questions-2024.json          | questions-2024.json"
  ];
  test.each(files)("get file name only %s", match => {
    const [path, name] = match.split(targetSplitter);
    const fileName = getFileName(path);
    expect(fileName).toBe(name);
  });
});
