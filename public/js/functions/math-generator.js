const MathQuiz = (function() {
  const findNumbers = (op, hideNr) => {
    const questions = [];

    for (let i = 0; i < 10; i++) {
      const operation = op || (Math.random() < 0.5 ? "+" : "-");
      let a, b, r, tmp;
      if (operation === "+") {
        r = parseInt(Math.random() * 79) + 20; // range 20-99
        tmp = (r % 10) + 1;
        a = parseInt(Math.random() * (r - tmp)) + tmp;
        b = r - a;
      } else {
        a = parseInt(Math.random() * 79) + 20; // range 20-99
        tmp = (a % 10) + 1;
        b = parseInt(Math.random() * (a - tmp)) + tmp;
        r = a - b;
      }
      console.debug(`${a} ${operation} ${b} = ${r}`);

      const hide = hideNr || 1 + parseInt(Math.random() * 3);

      let unknown;
      const unknownLetter = getRandomLetter();
      if (hide === 1) {
        unknown = a;
        a = unknownLetter;
      } else if (hide === 2) {
        unknown = b;
        b = unknownLetter;
      } else {
        unknown = r;
        r = unknownLetter;
      }
      const answers = generateAnswers(unknown);

      questions.push({
        id: i,
        level: 10,
        text: `${a} ${operation} ${b} = ${r}`,
        answerType: "radio",
        answerDisplay: "inline-block",
        answers: answers
      });
    }
    return questions;
  };

  const generateAnswers = correct => {
    const totalAnwers = 4;
    // answers should not be negative
    let range = Math.min(parseInt(Math.random() * totalAnwers), correct);
    const answers = [];
    for (let j = 0; j < totalAnwers; j++, range--) {
      answers.push({ id: j, text: correct - range, correct: range === 0 });
    }
    return answers;
  };

  const options = [
    {
      value: 10,
      text: "Clasa I. Adunare cu trecere peste ordin - &#128288;",
      generator: () => findNumbers("+", 3)
    },
    // {
    //   value: 11,
    //   text: "Clasa I. Adunare cu trecere peste ordin - &#9997;",
    //   generator: () => findNumbers("+", 3)
    // },
    {
      value: 15,
      text: "Clasa I. Adunare - afla numarul necunoscut - &#128288;",
      generator: () => findNumbers("+")
    },
    {
      value: 20,
      text: "Clasa I. Scaderea cu trecere peste ordin - &#128288;",
      generator: () => findNumbers("-", 3)
    },
    {
      value: 25,
      text: "Clasa I. Scaderea - afla numarul necunoscut - &#128288;",
      generator: () => findNumbers("-")
    },
    {
      value: 26,
      text: "Clasa I. Adunare si Scaderea - &#128288;",
      generator: () => findNumbers()
    }
  ];

  return {
    getLevelSelector: (level, select) => {
      return `
        <label>
          Nivel
          <select name="levelSelector">
            ${options
              .map(
                e =>
                  `<option value="${e.value}" ${
                    e.value === level ? 'selected="selected"' : ""
                  }>${e.text}</option>`
              )
              .join("")}
          </select>
        </label>
      `;
    },

    generateQuestions: level => {
      let option = options.find(option => option.value === level);
      if (!option) {
        console.warn("TODO find closest generator");
        option = options[0];
      }
      return option.generator();
    }
  };
})();
