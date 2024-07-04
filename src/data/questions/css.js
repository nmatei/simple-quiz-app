// Level Names and IDs
//  3: "CSS Selectors"
//  13: "Advanced CSS"

window.LOAD_QUESTIONS(3, [
  {
    
    id: 1,
    level: 3,
    text: "Which CSS selector will change the background color of the HTML element below?",
    type: "css",
    answerType:"radio",
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
    answerType:"radio",
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
    "answerType": "radio",
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
    id: 5,
    level: 3,
    text: "What is the CSS selector for an <a> tag containing the title attribute?",
    type: "css",
    answerType:"radio",
    answers: [
      {
        id: 1,
        text: `a[title]`,
        type: "css"
      },
      { id: 2, 
        text: `a > title`,
        type: "css" },
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
    id: 6,
    level: 13,
    text: "CSS grid and flexbox are now becoming a more popular way to create page layouts. However, floats are still commonly used, especially when working with an older code base, or if you need to support an older browser version. What are two valid techniques used to clear floats?",
    type: "css",
    answerType:"radio",
    answers: [
      {
        id: 1,
        text: `Use the 'clearfix hack' on the floated element and add a float to the parent element.`,
        type: "css"
      },
      { id: 2, 
        text: `Use the overflow property on the floated element or the 'clearfix hack' on either the floated or parent element.`,
        type: "css" },
      {
        id: 3,
        text: `Use the 'clearfix hack' on the floated element or the overflow property on the parent element.`,
        type: "css"
      }, {
        id: 4,
        text: `Use the 'clearfix hack' on the parent element or use the overflow property with a value other than 'visible.'`,
        type: "css"
      }
    ]
  },

{
    id: 7,
    level: 3,
    text: "CSS grid and flexbox are now becoming a more popular way to create page layouts. However, floats are still commonly used, especially when working with an older code base, or if you need to support an older browser version. What are two valid techniques used to clear floats?",
    type: "css",
    answerType:"radio",
    q:`
    1) .nav {
    ...;
    }

    2) nav {
      ...;
    }

    3) #nav {
      ...;
    }
    `,
    answers: [
      {
        id: 1,
        text: `
	  1) An element with an ID of "nav";
  	2) A nav element;
  	3) An element with a class of "nav";
    
    `,
        type: "css"
      },
      { id: 2, 
        text: `
	 They all target the same nav element.
	`,
        type: "css" },
      {
        id: 3,
        text: `
	  1) An element with a class of "nav";
	  2) A nav element;
	  3) An element with an id of "nav";
	`,
        type: "css"
      }, {
        id: 4,
        text: `
	  1) An element with a class of "nav";
	  2) A nav element;
	  3) A div with an id of "nav";
	`,
        type: "css"
      }
    ]
  },
{
    id: 8,
    level: 13,
    text: "When adding transparency styles, what is the difference between using the opacity property versus the background property with a rgba() value?",
    type: "css",
    answerType:"radio",
    answers: [
      {
        id: 1,
        text: `Opacity specifies the level of transparency of the child elements. Background with a rgba() value applies transparency to the background color only.`,
        type: "css"
      },
      { id: 2, 
        text: `Opacity applies transparency to the background color only. Background with an rgba() value specifies the level of transparency of an element, as a whole, including its content.`,
        type: "css" },
      {
        id: 3,
        text: `Opacity specifies the level of transparency of an element, including its content. Background with a rgba() value applies transparency to the background color only.`,
        type: "css"
      }, {
        id: 4,
        text: ` Opacity applies transparency to the parent and child elements. Background with a rgba() value specifies the level of transparency of the parent element only.`,
        type: "css"
      }
    ]
  },

{
    id: 9,
    level: 13,
    text: "What is true of block and inline elements? (Alternative: Which statement about block and inline elements is true?)",
    type: "css",
    answerType:"radio",
    answers: [
      {
        id: 1,
        text: `By default, block elements are the same height and width as the content container between their tags; inline elements span the entire width of its container.`,
        type: "css"
      },
      { id: 2, 
        text: `By default, block elements span the entire width of their container; inline elements are the same height and width as the content contained between their tags.`,
        type: "css" },
      {
        id: 3,
        text: `A <nav> element is an example of an inline element. <header> is an example of a block element.`,
        type: "css"
      }, {
        id: 4,
        text: `A <span> is an example of a block element. <div> is an example of an inline element.`,
        type: "css"
      }
    ]
  },

{
    id: 10,
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
      {
        id: 1,
        text: `The first column will have a width of 50px. The second column will be 50px wide and the third column will be 100px wide.`,
        type: "css"
      },
      { id: 2, 
        text: `The first column will have a width of 50px. The second column will be 150px wide and the third column will be 300px wide.`,
        type: "css" },
      {
        id: 3,
        text: `The first column will have a width of 50px. The second column will be 300px wide and the third column will be 150px wide.`,
        type: "css"
      }, {
        id: 4,
        text: `The first column will have a width of 50px. The second column will be 500px wide and the third column will be 1000px wide.`,
        type: "css"
      }
    ]
  },

]);