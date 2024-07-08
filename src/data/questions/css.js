// Level Names and IDs
//  3: "CSS Selectors"
//  13: "Advanced CSS"

window.LOAD_QUESTIONS(3, [
  {
    
    id: 1,
    level: 3,
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
    level: 3,
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
  },
  {
    id: 3,
    level: 3,
    text: "What is the CSS selector for an <code>&lt;a></code> tag containing the title attribute?",
    answerType:"radio",
    answers: [
      {
        id: 1,
        text: `a[title]`,
         type: "css"
      },
      { id: 2, 
        text: `a > title`,
         type: "css"
      },
      {
        id: 3,
        text: `a=title`,
         type: "css"
      }, {
        id: 4,
        text: `a.title`,
         type: "css"
      }
    ]
  },
  {
    id: 4,
    level: 3,
    text: "What element(s) do the following selectors match?",
    type: "css",
    answerType:"radio",
    q:`
      .nav {
        color: blue;
      }
      `,
    answers: [ 
      "An element with a class of 'nav'",
      "A nav element",
      "An element with an id of 'nav'"
    ]
  },
  {
    id: 5,
    level: 3,
    text: "What element does the following selector match?",
    type: "css",
    answerType:"radio",
    q:`
      #nav {
        color: blue;
      }
      `,
    answers: [ 
      "An element with a class of 'nav'",
      "A nav element",
      "An element with an id of 'nav'"
    ]
  },
  {
    id: 6,
    level: 3,
    text: "What element does the following selector match?",
    type: "css",
    answerType:"radio",
    q:`
      nav {
        color: blue;
      }
      `,
    answers: [ 
      "An element with a class of 'nav'",
      "A nav element",
      "An element with an id of 'nav'"
    ]
  },
  {
    id: 7,
    level: 3,
    text: "In this example, according to cascading and specificity rules, what color will the link be?",
    type: "html",
    answerType:"radio",
    q:`
      <style>
      .example {
        color: yellow;
      }
      ul li a {
        color: blue;
      }
      ul a {
        color: green;
      }
      a {
        color: red;
      }
      </style>  
       <ul>
        <li><a href="#" class="example">link</a></li>
        <li>list item</li>
        <li>list item</li>
      </ul>
      `,
     answers: [ 
      "green",
      "yellow",
      "blue",
      "red"
    ]
  },

  {
    id: 1,
    level: 13,
    text: "Among these selectors which selector has the highest specificity ranking for selecting the anchor link element?",
    type: "css",
    "answerType": "radio",
    answers: [
      {
        id: 1,
        text: `.example a`,
        type: "css"
      },
      { id: 2, text: `div a`, type: "css" 
      },
      {
        id: 3,
        text: `a`,
        type: "css"
      }, 
      {
        id: 4,
        text: `ul li a`,
        type: "css"
      }
    ]
  },
  {
    id: 2,
    level: 13,
    text: "Using an attribute selector, how would you select an <code>&lt;a></code> element with a \"title\" attribute?",
    answerType:"radio",
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
  },
  {
    id: 3,
    level: 13,
    text: "CSS grid and flexbox are now becoming a more popular way to create page layouts. However, floats are still commonly used, especially when working with an older code base, or if you need to support an older browser version. What are two valid techniques used to clear floats?",
    answerType:"radio",
    answers: [
      "Use the 'clearfix hack' on the floated element and add a float to the parent element.",
      "Use the overflow property on the floated element or the 'clearfix hack' on either the floated or parent element.",
      "Use the 'clearfix hack' on the floated element or the overflow property on the parent element.",
      "Use the 'clearfix hack' on the parent element or use the overflow property with a value other than 'visible.'"
    ]
  },
  {
    id: 4,
    level: 13,
    text: "When adding transparency styles, what is the difference between using the opacity property versus the background property with a rgba() value?",
    answerType:"radio",
    answers: [
      "Opacity specifies the level of transparency of the child elements. Background with a rgba() value applies transparency to the background color only.",
      "Opacity applies transparency to the background color only. Background with an rgba() value specifies the level of transparency of an element, as a whole, including its content.",
      "Opacity specifies the level of transparency of an element, including its content. Background with a rgba() value applies transparency to the background color only.",
      " Opacity applies transparency to the parent and child elements. Background with a rgba() value specifies the level of transparency of the parent element only."
      
    ]
  },
  {
    id: 5,
    level: 13,
    text: "What is true of block and inline elements? (Alternative: Which statement about block and inline elements is true?)",
    answerType:"radio",
    answers: [
      "By default, block elements are the same height and width as the content container between their tags; inline elements span the entire width of its container.",
      "By default, block elements span the entire width of their container; inline elements are the same height and width as the content contained between their tags.",
      "A <nav> element is an example of an inline element. <header> is an example of a block element.",
      "A <span> is an example of a block element. <div> is an example of an inline element."
    ]
  },
  {
    id: 6,
    level: 13,
    text: "CSS grid introduced a new length unit, fr, to create flexible grid tracks. Referring to the code sample below, what will the widths of the three columns be?",
    type: "css",
    answerType:"radio",
	  q:`
	    .grid {
  	      display: grid;
  	      width: 500px;
  	      grid-template-columns: 50px 1fr 2fr;
	    }
	    `,
    answers: [
      "The first column will have a width of 50px. The second column will be 50px wide and the third column will be 100px wide.",
      "The first column will have a width of 50px. The second column will be 150px wide and the third column will be 300px wide.",
      "The first column will have a width of 50px. The second column will be 300px wide and the third column will be 150px wide.",
      "The first column will have a width of 50px. The second column will be 500px wide and the third column will be 1000px wide.",
    ]
  },
  {
    id: 7,
    level: 13,
    text: "If the width of the container is 500 pixels, what would the width of the three columns be in this layout?",
    answerType:"radio",
    type: "css",
    q:`
      .grid { display: grid; grid-template-columns: 50px 1fr 2fr; }
      `,
    answers: [ 
      "50px, 150px, 300px",
      "50px, 200px, 300px",
      "50px, 100px, 200px",
      "50px, 50px, 100px"
    ]
  },
  {
    id: 8,
    level: 13,
    text: "What is the use of line-height property?",
    answerType:"radio",
    answers: [ 
      "to control the height of the space between two lines of content",
      "to control the height of the space between heading elements",
      "to control the height of the character size",
      "to control the width of the space between characters"
    ]
  },
  {
    id: 9,
    level: 13,
    text: "Three of these choices are true about class selectors. Which is NOT true?",
    answerType:"radio",
    answers: [ 
      "Multiple classes can be used within the same element.",
      "The same class can be used multiple times per page.",
      "Class selectors begin with a leading period(dot)",
      "Classes can be used multiple times per page but not within the same element."
    ]
  },
  {
    id: 10,
    level: 13,
    text: "What is not true about class selectors?",
    answerType:"radio",
    answers: [ 
      "Only one class value can be assigned to an element.",
      "An element can have multiple class values.",
      "Class selectors begin with a leading period(dot)",
      "More than one element can have the same class value."
        ]
  },
  {
    id: 11,
    level: 13,
    text: "There are many properties that can be used to align elements and create page layouts such as float, position, flexbox, and grid. Of these four properties, which one should be used to align a global navigation bar that stays fixed at the top of the page?",
    answerType:"radio",
    answers: [ 
      "position",
      "flexbox",
      "grid",
      "float"
    ]
  },
]);