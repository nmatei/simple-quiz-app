import { levelSelector, externalImport, getRandomQuestions, getParam } from "../common/utilities";

const options = [
  // ====== 2025 ======
  {
    value: 1,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Numeri",
    short: "Numeri"
  },
  {
    value: 2,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Luca",
    short: "Luca"
  },
  {
    value: 3,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Estera",
    short: "Estera"
  },
  {
    value: 10,
    url: "2025-verses",
    year: 2025,
    text: "Olimpiada Biblică 2025 - Versete de învățat",
    short: "Versete"
  },
  // ====== 2024 ======
  {
    value: 1,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Leveticul",
    short: "Leveticul"
  },
  {
    value: 2,
    url: 2024,
    text: "Olimpiada Biblică 2024 - 1 Samuel",
    short: "1 Samuel"
  },
  {
    value: 3,
    url: 2024,
    text: "Olimpiada Biblică 2024 - 2 Samuel",
    short: "2 Samuel"
  },
  {
    value: 4,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Proverbe",
    short: "Proverbe"
  },
  {
    value: 5,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Ezra",
    short: "Ezra"
  },
  {
    value: 6,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Galateni",
    short: "Galateni"
  },
  {
    value: 7,
    url: 2024,
    text: "Olimpiada Biblică 2024 - Iuda",
    short: "Iuda"
  }
];

/*
  copy(JSON.stringify(refs.map((r, i) => ({
    id: i+1,
    text: r.text,
    level: 10,
    answerType: "radio",
    answerDisplay: "inline-block",
    answers: [
        {
          id: 0,
          text: r.ref,
          correct: true
        }
    ]
  })), null, 2))
*/

export const BibleQuiz: QuizGenerator = {
  domain: "bible",
  defaultTitle: "Bible Quiz",
  shuffle: "answers",
  displayLimit: 10,
  pointsDigits: 0,
  // <div>Grupa <b>{type}</b></div>
  header: `
    <div style="flex: 1; line-height: 2em;">
      <h2>Olimpiada Biblică</h2>
      <div>Faza locală</div>
      <div>Cluj Napoca</div>
      <div><b>{start-time}</b></div>
    </div>
    <div style="line-height: 2em; text-align: right">
      <div>Nume: <h2 class="student-name" title="click to change" style="border-bottom: 1px solid gray; display: inline-block; min-width: 150px; text-align: center">{user-name}</h2></div>
      <div>Biserica: <span style="border-bottom: 1px solid gray; display: inline-block; min-width: 150px; text-align: center; font-size: 1.2em;">{biserica}</span></div>
      <div><h1 class="test-result"><span class="q-point">&nbsp;</span></h1></div>
    </div>
  `,

  init: async () => {},

  getYear: () => {
    let year = getParam("year") || new Date().getFullYear();
    if (typeof year === "string") {
      year = parseInt(year, 10);
    }
    return year;
  },

  getLevelSelector: function (level, onChange?: (levels: number[]) => void) {
    const year = this.getYear();
    const filteredOptions = options.filter(option => option.url === year || option.year === year);
    return levelSelector(filteredOptions, level, onChange);
  },

  afterRender: () => {},

  load: async function (levels: number[]) {
    const year = this.getYear();
    const selectedOptions = options.filter(option => option.url === year || option.year === year);
    const urls = [...new Set(selectedOptions.map(option => option.url))];
    console.log("loading options for", year, urls);

    const ALL_QUESTIONS: QuizOption[] = [];

    await urls.map(url => {
      return fetch(`./data/bible/questions-${url}.json`)
        .then(response => response.json())
        .then(questions => {
          window.ALL_QUESTIONS = window.ALL_QUESTIONS || [];
          window.ALL_QUESTIONS.push(...questions);
        })
        .catch(error => {
          console.error(`Failed to load questions for ${url}:`, error);
        });
    });

    let option = selectedOptions.find(
      option => (option.url === year || option.year === year) && levels.includes(option.value)
    );
    if (!option) {
      console.warn("no option found, getting first available", year, levels);
      option = options[0];
    }

    // TODO load/store all questions for the year
    this.answersUrl = `./data/bible/answers-${year}.json`;
    this.answersUrl = `./data/bible/answers-${year}.json`;

    this.ALL_QUESTIONS = ALL_QUESTIONS;
    return ALL_QUESTIONS;
  },

  generateQuestions: async function (levels) {
    await this.load(levels);
    return getRandomQuestions(this, this.ALL_QUESTIONS, levels, true);
  },
  reset: () => {}
};
