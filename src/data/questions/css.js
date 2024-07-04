// Level Names and IDs
//  3: "CSS Selectors"
//  13: "Advanced CSS"

window.LOAD_QUESTIONS(3, [
  {
    
    id: 1,
    level: 3,
    text: "Which CSS selector will change the background color of the HTML element below?",
    type: "css",
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
    level: 3,
    text: "Which CSS selector will change the color of the HTML element below?",
    type: "css",
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
  },
  {
    id: 3,
    level: 13,
    text: "Among these selectors which selector has the highest specificity ranking for selecting the anchor link element?",
    type: "css",
    q: `ul li a
        a
        .example a
        div a`,
    answers: [
      {
        id: 1,
        text: `.example a`,
        type: "css"
      },
      { id: 2, text: `div a`, type: "css" },
      {
        id: 3,
        text: `a`,
        type: "css"
      }, {
        id: 4,
        text: `ul li a`,
        type: "css"
      }
    ]
  },
  {
    id: 4,
    level: 13,
    text: "Using an attribute selector, how would you select an <a> element with a \"title\" attribute?",
    type: "css",
    answers: [
      {
        id: 1,
        text: `a[title] {...}`,
        type: "css"
      },
      { id: 2, 
        text: `a > title {...}`,
        type: "css" },
      {
        id: 3,
        text: `a.title {...}`,
        type: "css"
      }, {
        id: 4,
        text: `a=title {...}`,
        type: "css"
      }
    ]
  }
]);