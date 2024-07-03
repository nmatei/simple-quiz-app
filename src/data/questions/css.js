// Level Names and IDs
//  3: "CSS Selectors"
//  13: "Advanced CSS"

window.LOAD_QUESTIONS(3, [
  {
    id: 1,
    text: "Which CSS selector will change the background color of the HTML element below?",
    type: "html",
    q: `<p id="demo">This is a demonstration</p>`,
    answers: [
      {
        id: 1,
        text: `p .demo {background-color: red}`,
        type: "css"
      },
      { id: 2, text: `#demo {background-color: red}`, type: "css" },
      {
        id: 3,
        text: `.demo p {background-color: red}`,
        type: "css"
      }
    ]
  },
  {
    id: 2,
    text: "Which CSS selector will change the color of the HTML element below?",
    type: "html",
    q: `<p id="demo">This is a demonstration</p>`,
    answers: [
      {
        id: 1,
        text: `.demo {color: red}`,
        type: "css"
      },
      { id: 2, text: `#demo {color: red}`, type: "css" },
      {
        id: 3,
        text: `demo {color: red}`,
        type: "css"
      }
    ]
  }
]);