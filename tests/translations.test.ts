import { applyTranslations } from "../src/common/utilities";

const question = (id: number, level: number, text: string): QuizOption => ({
  id,
  level,
  text,
  answerType: "radio",
  answers: [{ id: 1, text: "A" }]
});

describe("applyTranslations", function () {
  const i18n: Localization = {
    common: {},
    questions: {
      "1": "legacy translation for id 1",
      "30-1": { text: "level 30, id 1", hint: "hint 30-1" }
    }
  };

  it("prefers the level-id key over the legacy id key", function () {
    const questions = [question(1, 30, "React question")];
    applyTranslations(questions, i18n);
    expect(questions[0].text).toBe("level 30, id 1");
    expect(questions[0].hint).toBe("hint 30-1");
  });

  it("falls back to the legacy id key when there is no level-id key", function () {
    const questions = [question(1, 5, "JS question")];
    applyTranslations(questions, i18n);
    expect(questions[0].text).toBe("legacy translation for id 1");
  });

  it("keeps the original text when nothing matches", function () {
    const questions = [question(2, 31, "Next.js question")];
    applyTranslations(questions, i18n);
    expect(questions[0].text).toBe("Next.js question");
  });
});
