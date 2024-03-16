import { createAnswersSelector } from "../src/utilities";

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
});
