import { selectQuestions } from "../../src/common/utilities";

/**
 * Admin utilities for managing quiz content
 * 
 * This file contains tests and utilities for:
 * 1. Selecting questions for admin purposes
 * 2. Converting PDF answers to JSON format
 * 3. Browser console utilities for testing
 */

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

  /**
   * This test demonstrates how to convert PDF answers to JSON format
   * The generated JSON is already saved in src/data/bible/answers-2026.json
   * 
   * To regenerate the file, run: node tests/generate-2026-answers.js
   */
  it("convert PDF answers to JSON format", function () {
    /**
     * Converts answers from PDF format (e.g., "1-a", "2-b", "3-c") to JSON format
     * @param answersText - Copy/pasted text from PDF containing answers like "1-a\n2-b\n3-c"
     * @param level - The level/book number (1=Rut, 2=1 Împăraţi, etc.)
     * @returns JSON object with question IDs mapped to answer numbers (1=a, 2=b, 3=c)
     */
    function convertAnswersToJSON(answersText: string, level: number) {
      const lines = answersText.trim().split("\n");
      const answers: { [key: string]: number } = {};

      lines.forEach(line => {
        // Match format: "1-a" or " 4-a" or "64-a"
        const match = line.trim().match(/^(\d+)\s*-\s*([abc])/i);
        if (match) {
          const questionId = match[1];
          const answer = match[2].toLowerCase();
          // Convert a=1, b=2, c=3
          const answerValue = answer === "a" ? 1 : answer === "b" ? 2 : 3;
          answers[questionId] = answerValue;
        }
      });

      return { [level]: answers };
    }

    // Example: Just showing the function exists
    const example = convertAnswersToJSON("1-a\n2-b\n3-c", 1);
    expect(example).toEqual({
      "1": {
        "1": 1,
        "2": 2,
        "3": 3
      }
    });
  });
});

/**
 * =====================================================================
 * BROWSER CONSOLE UTILITIES
 * =====================================================================
 * 
 * These functions are available in the browser console when running the quiz app.
 * 
 * ## selectAnswersFromPDF(answersText)
 * 
 * Automatically selects the correct answers in the quiz based on PDF answers.
 * 
 * ### Usage Example:
 * 
 * 1. Open the quiz in your browser
 * 2. Open the browser console (F12)
 * 3. Copy the answers from the PDF (e.g., "1-a\n2-b\n3-c...")
 * 4. Paste them into the console using this format:
 * 
 * ```javascript
 * selectAnswersFromPDF(`1-a
 * 2-b
 * 3-c
 * 4-a
 * 5-c`)
 * ```
 * 
 * The function will:
 * - Find each question on the page
 * - Select the correct radio button based on the answer (a=1, b=2, c=3)
 * - Log progress for each question
 * - Show a summary of selected/not found answers
 * 
 * ### Example Output:
 * ```
 * ✓ Question 1: selected answer A (1)
 * ✓ Question 2: selected answer B (2)
 * ✓ Question 3: selected answer C (3)
 * ✗ Question 4: not found on page
 * 
 * 📊 Summary: Selected 3 answers, 1 not found
 * ```
 * 
 * ### Full Example for Rut:
```javascript
selectAnswersFromPDF(`1-a
 2-a
 3-a
 4-b
 5-a
 6-c
 7-a
 8-a
 9-a
 10-c`)
```
 * 
 * This is especially useful when testing the quiz to quickly fill in answers
 * without manually clicking each radio button.
 * 
 * Note: The function is exported from utilities.ts and attached to the window object.
 * =====================================================================
 */

