import { selectQuestions } from "../../src/common/utilities";

describe("Prepare Admin Test", function () {
  it("select each n questions for admin", function () {
    const each = 3;
    const skip = 0;
    const max = 100;

    selectQuestions(function (article, index, selected) {
      return selected < max && index % each === skip;
    });

    // ===
  });
});
