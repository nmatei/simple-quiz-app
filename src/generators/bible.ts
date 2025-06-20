import { getEl, getEls } from "../common/common";
import { simpleAlert, simpleConfirm } from "../common/simplePrompt/simplePrompt";
import { levelSelector, getRandomQuestions, getParam } from "../common/utilities";
import "./bible.css";

function getFirst(elements: string[], ignore: string[]) {
  return elements.find(element => !ignore.includes(element));
}

/**
 * Convert verse numbers at the beginning of each line to superscript
 * @param text
 * @returns
 */
function markVerseNumbers(text: string): string {
  return text
    .split("\n")
    .map(line => {
      // Match a number at the beginning of a line
      return line.replace(/^(\d+)(\s*)/, '<sup class="verse-nr">$1</sup>&nbsp;');
    })
    .join("\n");
}

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
    value: 4,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Ezechiel",
    short: "Ezechiel"
  },
  {
    value: 5,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Naum",
    short: "Naum"
  },
  {
    value: 6,
    url: 2025,
    text: "Olimpiada Biblică 2025 - 1 Tesaloniceni",
    short: "1 Tesaloniceni"
  },
  {
    value: 7,
    url: 2025,
    text: "Olimpiada Biblică 2025 - 2 Tesaloniceni",
    short: "2 Tesaloniceni"
  },
  {
    value: 8,
    url: 2025,
    text: "Olimpiada Biblică 2025 - Evrei",
    short: "Evrei"
  },
  {
    value: 10,
    year: 2025,
    text: "Olimpiada Biblică 2025 - Alege Referința",
    short: "Alege Referința",
    generator: async () => {
      const url = "2025-verses";
      const response = await fetch(`./data/bible/questions-${url}.json`);
      const questions: { text: string; ref: string }[] = await response.json();

      const refs = questions.map(q => q.ref);
      // Create a pool of answers to use as false answers
      let pool1 = [...refs];
      let pool2 = [...refs];

      // @ts-ignore
      pool1.shuffle();
      // @ts-ignore
      pool2.shuffle();

      return questions.map((q, i) => {
        const correctAnswer = q.ref;
        const a1 = getFirst(pool1, [correctAnswer]) || getFirst(refs, [correctAnswer]);
        const a2 = getFirst(pool2, [correctAnswer, a1]) || getFirst(refs, [correctAnswer, a1]);
        const falseAnswers = [a1, a2].map((text, index) => ({
          id: index + 1,
          text: text
        }));
        pool1 = pool1.filter(item => item !== a1);
        pool2 = pool2.filter(item => item !== a2);
        return {
          id: i + 1,
          text: markVerseNumbers(q.text),
          level: 10,
          answerType: "radio" as AnswerType,
          answerDisplay: "inline-block" as "inline-block",
          answers: [
            {
              id: 0,
              text: correctAnswer,
              correct: true
            },
            ...falseAnswers
          ]
        };
      });
    }
  },
  {
    value: 11,
    year: 2025,
    text: "Olimpiada Biblică 2025 - Scrie Referința",
    short: "Scrie Referința",
    generator: async () => {
      const url = "2025-verses";
      const response = await fetch(`./data/bible/questions-${url}.json`);
      const questions: { text: string; ref: string }[] = await response.json();

      return questions.map((q, i) => {
        return {
          id: i + 1,
          text: markVerseNumbers(q.text),
          level: 11,
          answerType: "text" as AnswerType,
          answerDisplay: "inline-block" as "inline-block",
          answers: [
            {
              id: 0,
              text: "Referința: ",
              correct: q.ref
            }
          ]
        };
      });
    }
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
  open: https://www.bible.com/bible/191/JHN.3.VDC
  and copy required references
  check obj from console:

  copy(JSON.stringify(refs), null, 2))
*/

export const BibleQuiz: QuizGenerator = {
  domain: "bible",
  defaultTitle: "Bible Quiz",
  shuffle: "answers",
  displayLimit: 10,
  pointsDigits: 0,
  defaultLevels: [10],
  // <div>Grupa <b>{type}</b></div>
  // TODO param?: Faza Județeană
  header: `
    <div style="flex: 1; line-height: 2em;">
      <h2>Olimpiada Biblică</h2>
      <div>Faza pe Comunitate</div>
      <div>Cluj Napoca</div>
      <div><b>{start-time}</b></div>
    </div>
    <div style="line-height: 2em; text-align: right">
      <div>Nume: <h2 class="student-name" title="click to change" style="border-bottom: 1px solid gray; display: inline-block; min-width: 150px; text-align: center">{user-name}</h2></div>
      <div>Biserica: <span style="border-bottom: 1px solid gray; display: inline-block; min-width: 150px; text-align: center; font-size: 1.2em;">{biserica}</span></div>
      <div><h1 class="test-result"><span class="q-point">&nbsp;</span></h1></div>
    </div>
  `,

  allRefs: {} as Record<string, string>,

  init: async function () {
    if (window.location.hostname === "localhost") {
      getEl("body").classList.add("allow-select");
    }
    const test = getParam("test");
    const showRef = (getParam("refs") === "1" || getParam("showrefs") === "true") && !test;

    getEl("body").addEventListener("click", e => {
      if (e.target instanceof HTMLAnchorElement && e.target.closest("a.bible-reference")) {
        e.preventDefault();
        e.stopPropagation();
        if (showRef) {
          this.showRefHint(e.target);
        }
      }
    });
  },

  showRefHint: async function (target: HTMLAnchorElement) {
    const ref = target.getAttribute("title");
    if (ref) {
      let text = (this.allRefs[ref] as string) || "... [ check your Bible ] ...";
      if (text.length > 1000) {
        text = text.substring(0, 1000) + "...";
      }

      text = markVerseNumbers(text);

      //const url = `https://www.bible.com/bible/191/${title.replace(/\s+/g, ".")}.VDC`;
      //window.open(url, "_blank");
      //await simpleAlert(`<b class="reference-title">📖 ${ref}</b><p>${text}</p>`);
      const next = await simpleConfirm(`<b class="reference-title">📖 ${ref}</b><p>${text}</p>`, {
        cancel: "Close",
        ok: "Next",
        focus: "yes"
      });
      if (next) {
        const refs = getEls("a.bible-reference");
        const currentIndex = refs.findIndex(el => el === target);
        let nextIndex = currentIndex + 1;
        if (nextIndex >= refs.length) {
          nextIndex = 0; // wrap around to the first reference
        }
        this.showRefHint(refs[nextIndex]);
      }
    } else {
      await simpleAlert(`<b class="reference-title">📖 404</b><p>Reference not found...</p>`);
    }
  },

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

  afterRender: function () {},

  load: async function (levels: number[]) {
    const year = this.getYear();
    const selectedOptions = options.filter(
      option => (option.url === year || option.year === year) && levels.includes(option.value)
    );
    const urls = [...new Set(selectedOptions.filter(o => !o.generator).map(option => option.url))].filter(Boolean);
    const requests = urls.map(async url => {
      try {
        const response = await fetch(`./data/bible/questions-${url}.json`);
        const questions: QuizOption[] = await response.json();
        return questions;
      } catch (error) {
        console.error(`Failed to load questions for ${url}:`, error);
      }
      return [];
    });

    const generators = selectedOptions.filter(o => o.generator).map(o => o.generator());

    const questions = await Promise.allSettled([...requests, ...generators]).then(results => {
      return results.reduce((acc, result) => {
        if (result.status === "fulfilled") {
          acc.push(...result.value);
        } else {
          console.error("Error loading questions:", result.reason);
        }
        return acc;
      }, [] as QuizOption[]);
    });

    const showRef = getParam("refs") === "1" || getParam("refs") === "true";
    if (showRef) {
      const response = await fetch(`./data/bible/references-${year}.json`);
      const allRefs: { ref: string; text: string }[] = await response.json();
      this.allRefs = allRefs.reduce((acc, item) => {
        acc[item.ref] = item.text;
        return acc;
      }, {} as Record<string, string>);
    }

    // TODO load/store all questions for the year
    this.answersUrl = [`./data/bible/answers-${year}.json`];
    this.questionsUrl = `./data/bible/questions-${year}.json`;
    this.ALL_QUESTIONS = questions;
    return questions;
  },

  generateQuestions: async function (levels) {
    await this.load(levels);
    const questions = getRandomQuestions(this, this.ALL_QUESTIONS, levels, true);
    const year = this.getYear();
    const selectedOptions = options.filter(
      option => (option.url === year || option.year === year) && levels.includes(option.value)
    );
    // add hints tooltips

    const refs: string[] = [];
    const searchChapterNrRegExp = /^\s*\d+\s*[:\s\.]\s*\d+\s*(-\s*\d+)?\s*$/;

    // Process questions to add links to Bible references in parentheses
    questions.forEach(question => {
      question.text = question.text.replace(/\(([^)]+)\)/g, (match, reference) => {
        const ref = reference.trim();
        if (searchChapterNrRegExp.test(ref)) {
          const book = selectedOptions.find(option => option.value === question.level)?.short || "";
          const title = book + " " + ref.replace(".", ":"); // Replace '.' with ':' for chapter:verse format
          refs.push(title);
          return `(<a href="#" class="bible-reference" title="${title}">${reference}</a>)`;
        }
        return match;
      });
    });

    // console.info(questions);
    console.info("references hints", refs);
    return questions;
  },
  reset: () => {}
};
