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

async function loadVerses(url: string): Promise<{ text: string; ref: string }[]> {
  const response = await fetch(`./data/bible/questions-${url}.json`);
  const questions: { text: string; ref: string }[] = await response.json();
  // @ts-ignore
  questions.shuffle();
  return questions;
}

const options: BaseLevel[] = [
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
      const questions = await loadVerses("2025-verses");

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
          groupId: q.ref,
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
      const questions = await loadVerses("2025-verses");

      return questions.map((q, i) => {
        return {
          id: i + 1,
          groupId: q.ref,
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
  {
    value: 12,
    year: 2025,
    text: "Olimpiada Biblică 2025 - Completează Versetul",
    short: "Completează Versetul",
    generator: async () => {
      const questions = await loadVerses("2025-verses");

      function getRandomMissingWord(text: string, labelFor: string): { masked: string; answer: string } {
        // Split by spaces and punctuation , . ? ; :
        const splitRegex = /[\s,\.\?;:]+/;
        const words = text.split(splitRegex).filter(w => w.length > 2 && /[A-Za-zĂÂÎȘȚăâîșț]/.test(w));
        if (!words || words.length === 0) return { masked: text, answer: "" };
        const idx = Math.floor(Math.random() * words.length);
        // Remove punctuation from the answer for matching
        const answer = words[idx].replace(/^[^A-Za-zĂÂÎȘȚăâîșț]+|[^A-Za-zĂÂÎȘȚăâîșț]+$/g, "");
        // Replace only the first occurrence of the word (with punctuation if present)
        const blueUnderscores = `<label for="${labelFor}" class="missing-word">&nbsp;</label>`;
        // Escape special regex characters in the word
        const wordEscaped = words[idx].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const masked = text.replace(new RegExp(wordEscaped), blueUnderscores);
        return { masked, answer };
      }

      return questions.map((q, i) => {
        const { masked, answer } = getRandomMissingWord(q.text, `12-${i + 1}`);
        return {
          id: i + 1,
          groupId: q.ref,
          text: `<b class="reference-title">${q.ref}</b><br>${markVerseNumbers(masked)}`,
          level: 12,
          answerType: "text" as AnswerType,
          answerDisplay: "inline-block" as "inline-block",
          answers: [
            {
              id: 0,
              text: "Frază lipsă: ",
              correct: answer
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

  currentRefs: [] as string[],
  allRefs: {} as Record<string, string>,

  init: async function () {
    if (window.location.hostname === "localhost") {
      getEl("body").classList.add("allow-select");
    }
    const showRef = this.allowRefs();

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

  toolbarRendered: function (toolbar: HTMLDivElement) {
    if (!this.allowRefs()) {
      return; // no references link
    }
    const levelSelectorEl = getEl("#levelSelector", toolbar);
    if (levelSelectorEl) {
      const refLink = document.createElement("a");
      refLink.href = "#";
      refLink.textContent = "📖";
      refLink.title = "📖 Afișează toate Referințele";
      refLink.className = "bible-references-link";
      refLink.onclick = async e => {
        e.preventDefault();
        e.stopPropagation();
        const refs = this.currentRefs.map((ref: string) => {
          const text = markVerseNumbers(this.allRefs[ref]);
          return `<h2 class="reference-title">📖 ${ref}</h2><p>${text}</p>`;
        });
        if (refs.length) {
          await simpleAlert(refs.join(""));
        }
      };
      levelSelectorEl.insertAdjacentElement("afterend", refLink);
    }
  },

  allowRefs: function () {
    const test = getParam("test");
    return (getParam("refs") === "1" || getParam("refs") === "true") && !test;
  },

  showRefHint: async function (target: HTMLAnchorElement) {
    const ref = target.getAttribute("title");
    if (ref) {
      let text = this.allRefs[ref] || "... [ check your Bible ] ...";
      if (text.length > 10000) {
        text = text.substring(0, 10000) + "...";
      }

      text = markVerseNumbers(text);

      //const url = `https://www.bible.com/bible/191/${title.replace(/\s+/g, ".")}.VDC`;
      //window.open(url, "_blank");
      //await simpleAlert(`<b class="reference-title">📖 ${ref}</b><p>${text}</p>`);
      const next = await simpleConfirm(`<h2 class="reference-title">📖 ${ref}</h2><p>${text}</p>`, {
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
      await simpleAlert(`<h2 class="reference-title">📖 404</h2><p>Reference not found...</p>`);
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
    const options = this.getOptions();
    return levelSelector(options, level, onChange);
  },

  afterRender: function () {},

  load: async function (levels: number[]) {
    const year = this.getYear();
    const options = this.getOptions();
    const urls = [...new Set(options.filter(o => !o.generator).map(option => option.url))].filter(Boolean);
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

    const generators = options.filter(o => o.generator).map(o => o.generator());

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

    if (this.allowRefs()) {
      const response = await fetch(`./data/bible/references-${year}.json`);
      const allRefs: { ref: string; text: string }[] = await response.json();
      this.allRefs = allRefs.reduce(
        (acc, item) => {
          acc[item.ref] = item.text;
          return acc;
        },
        {} as Record<string, string>
      );
    }

    // TODO load/store all questions for the year
    this.answersUrl = [`./data/bible/answers-${year}.json`];
    this.questionsUrl = `./data/bible/questions-${year}.json`;
    this.ALL_QUESTIONS = questions;
    return questions;
  },

  getOptions: function () {
    const year = this.getYear();
    return options.filter(option => option.url === year || option.year === year);
  },

  generateQuestions: async function (levels) {
    await this.load(levels);
    const questions = getRandomQuestions(this, this.ALL_QUESTIONS, levels, true);
    const options = this.getOptions();
    // add hints tooltips

    const refs: string[] = [];
    const searchChapterNrRegExp = /^\s*\d+\s*[:\s\.]\s*\d+\s*(-\s*\d+)?\s*$/;

    // Process questions to add links to Bible references in parentheses
    questions.forEach(question => {
      question.text = question.text.replace(/\(([^)]+)\)/g, (match, reference) => {
        const ref = reference.trim();
        if (searchChapterNrRegExp.test(ref)) {
          const book = options.find(option => option.value === question.level)?.short || "";
          const title = book + " " + ref.replace(".", ":"); // Replace '.' with ':' for chapter:verse format
          refs.push(title);
          return `(<a href="#" class="bible-reference" title="${title}">${reference}</a>)`;
        }
        return match;
      });
    });

    this.currentRefs = refs;

    // console.info(questions);
    // console.info(questions.map(q => q.answers?.map(a => a.correct)).flat());
    console.info("references hints", refs);
    return questions;
  },

  reset: () => {}
};
