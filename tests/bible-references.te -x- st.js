// Test for Bible references replacement logic

const testQuestions = [
  {
    id: 1,
    text: "Sample question with reference (12:34)"
  },
  {
    id: 2,
    text: "Question with multiple references (1:2) and (3:4-5)"
  },
  {
    id: 3,
    text: "Question with non-reference parentheses (this should not be a link)"
  },
  {
    id: 4,
    text: "Reference with space ( 6 : 7 )"
  }
];

function processReferences(questions) {
  const searchChapterNrRegExp = /^\s*\d+\s*[:\s]\s*\d+\s*(-\s*\d+)?\s*$/;

  questions.forEach(question => {
    if (question.text) {
      question.text = question.text.replace(/\(([^)]+)\)/g, (match, reference) => {
        if (searchChapterNrRegExp.test(reference.trim())) {
          return `(<a href="#" class="bible-reference">${reference}</a>)`;
        }
        return match;
      });
    }
  });

  return questions;
}

const processedQuestions = processReferences([...testQuestions]);

console.log("Original questions:", JSON.stringify(testQuestions, null, 2));
console.log("Processed questions:", JSON.stringify(processedQuestions, null, 2));
