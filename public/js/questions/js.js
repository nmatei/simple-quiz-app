window.ALL_QUESTIONS = [
  {
    id: "1553293253068",
    level: 5,
    text: "What types of values do variables have in javascript?",
    answers: [
      { id: 1, text: "Number" },
      { id: 2, text: "Null" },
      { id: 3, text: "String" },
      { id: 4, text: "Object" },
      { id: 5, text: "Array" },
      { id: 6, text: "Function" }
    ]
  },
  {
    id: "1558970574586",
    level: 5,
    text: "In JavaScript variable type depends on its value?",
    answerType: "radio",
    answers: [
      { id: 1, text: "True" },
      { id: 2, text: "False" }
    ]
  },
  {
    id: "1553293262031",
    level: 5,
    text: "If a variable is declared but no value is assigned to it, what is the value of that variable?",
    q: () => {
      // example
      var x;
      console.log(x);
    },
    answers: [
      { id: 1, text: "null", type: "js" },
      { id: 2, text: "undefined", type: "js" },
      { id: 3, text: `""`, type: "js" },
      { id: 4, text: "0", type: "js" }
    ]
  },
  {
    id: "1553293492162",
    level: 5,
    text: "Will this print 'yes'?",
    // TODO find why name() is not in new line
    q: `function name(){if("yes" == 'yes'){console.log("yes");}}name();`,
    answerType: "radio",
    answers: [
      { id: 1, text: "Yes" },
      { id: 2, text: "No" }
    ]
  },
  {
    id: "1558970753787",
    level: 5,
    text: "Can we use any variable as conditions to an if statement?",
    q: () => {
      // example
      var nr = 10;
      var str = "Any Value";
      if (nr) {
        /*doSomething*/
      }
      if (str) {
        /*doSomething*/
      }
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "True" },
      { id: 2, text: "False" }
    ]
  },
  {
    id: "1553297506471",
    level: 5,
    text: "Can we use numbers as conditions for 'if' statements?",
    q: "/*eg: */\n if (10) { /*doSomething*/ }",
    answerType: "radio",
    answers: [
      { id: 1, text: "True" },
      { id: 2, text: "False" }
    ]
  },
  {
    id: "1553297760651",
    level: 5,
    text: `The ! operator checks whether its operand is "falsy". Which of the following conditions are TRUE?`,
    answers: [
      { id: 1, text: "!false", type: "js" },
      { id: 2, text: "!0", type: "js" },
      { id: 3, text: "!true", type: "js" },
      { id: 4, text: "!!false", type: "js" },
      { id: 5, text: `!""`, type: "js" }
    ]
  },
  {
    id: "1553297760658",
    level: 5,
    text: `The ! operator checks whether its operand is "falsy". Which of the following conditions are TRUE?`,
    answers: [
      { id: 1, text: "!false", type: "js" },
      { id: 2, text: "!0", type: "js" },
      { id: 3, text: "!null", type: "js" },
      { id: 4, text: "!undefined", type: "js" },
      { id: 5, text: `!""`, type: "js" }
    ]
  },
  {
    id: "1558971016645",
    level: 5,
    text: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { id: 1, text: "<script>", type: "html" },
      { id: 2, text: "<scripting>", type: "html" },
      { id: 3, text: "<js/>", type: "html" },
      { id: 4, text: "<javascript>", type: "html" }
    ]
  },
  {
    id: "1553496912724",
    level: 5,
    text: "What is the correct way of creating a button?",
    answers: [
      { id: 1, text: "<batton>Save</batton>", type: "html" },
      { id: 2, text: "<button>Save</button>", type: "html" },
      { id: 3, text: '<input type="button" value="Save"/>', type: "html" },
      { id: 4, text: '<submit type="button">Save</submit>', type: "html" }
    ]
  },
  {
    id: "1553501520620",
    level: 5,
    text: `What is the correct JavaScript syntax to change the text of the HTML element below?`,
    type: "html",
    q: `<p id="demo">This is a demonstration.</p>`,
    answers: [
      {
        id: 1,
        text: `document.getElementById("demo").innerHTML = "Hello World!";`,
        type: "js"
      },
      { id: 2, text: `#demo.innerHTML = "Hello World!";`, type: "js" },
      {
        id: 3,
        text: `document.getElementById("demo").innerText = "Hello World!";`,
        type: "js"
      }
    ]
  },
  {
    id: "1558972282428",
    level: 5,
    text: `What is the correct JavaScript syntax to change the content of the HTML element below?`,
    type: "html",
    q: `<p id="demo">This is a demonstration.</p>`,
    answers: [
      { id: 1, text: `#demo.innerHTML = "Hello World!";`, type: "js" },
      {
        id: 2,
        text: `document.getElementByName("p").innerHTML = "Hello World!";`,
        type: "js"
      },
      {
        id: 3,
        text: `document.getElementById("demo").innerHTML = "Hello World!";`,
        type: "js"
      }
    ]
  },
  {
    id: "1553502185936",
    level: 5,
    text: `Which CSS selector will change the background color of the HTML element below? <p><code>&lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;</code><p>`,
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
    id: "1558972456149",
    level: 5,
    text: `Which CSS selector will change the color of the HTML element below? <p><code>&lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;</code><p>`,
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
    id: "1553502315935",
    level: 5,
    text: `What is the correct syntax to create a function in JavaScript?`,
    answers: [
      { id: 1, text: `function:myFunction() { }`, type: "js" },
      { id: 2, text: `function = myFunction() { return false; }`, type: "js" },
      { id: 3, text: `function myFunction() { }`, type: "js" }
    ]
  },
  {
    id: "1553502545441",
    level: 5,
    text: `Which statements will output "yes" to the console, given the following function? <p><code>function myFunction(){ console.info('yes'); }</code></p>`,
    answers: [
      { id: 1, text: `myFunction()`, type: "js" },
      { id: 2, text: `call function myFunction()`, type: "js" },
      { id: 3, text: `console.log("yes");`, type: "js" },
      { id: 4, text: `myFunction.apply(window)`, type: "js" }
    ]
  },
  {
    id: "1558973160287",
    level: 5,
    text: `Which statements will output "yes" to the console, given the following function? <p><code>function myFunction(){ console.info('yes'); }</code></p>`,
    answers: [
      { id: 1, text: `myFunction()`, type: "js" },
      { id: 2, text: `call function myFunction()`, type: "js" },
      { id: 3, text: `myFunction.call(window)`, type: "js" },
      { id: 4, text: `myFunction.apply(window)`, type: "js" }
    ]
  },
  {
    id: "1553502764235",
    level: 5,
    text: "Which of the following statements are a valid JSON object declared in JavaScript?",
    answers: [
      { id: 1, text: `{name: "Vasilica", "age": "20"}`, type: "js" },
      { id: 2, text: `[{"name": "Vasilica", "age": "20"}]`, type: "js" },
      { id: 3, text: `{"name": "Vasilica", "age": "20"}`, type: "js" }
    ]
  },
  {
    id: "1553503056044",
    level: 5,
    text: "Which of the following statements are a valid JSON object declared in data.json file?",
    answers: [
      { id: 1, text: `{name: "Vasilica", "age": "20"}`, type: "js" },
      { id: 2, text: `[{"name": "Vasilica", "age": "20"}]`, type: "js" },
      { id: 3, text: `{"name": "Vasilica", "age": "20"}`, type: "js" }
    ]
  },

  {
    id: "1553293328629",
    level: 5,
    text: "What does the console print?",
    q: () => {
      function doSomething(value) {
        console.info("the value is: " + value);
        if (!value) {
          console.info("you did not provide the value");
        }
      }

      doSomething();
    },
    answers: [
      { id: 1, text: "Runtime exception" },
      { id: 2, text: "the value is: undefined" },
      { id: 3, text: "the value is: null" },
      { id: 4, text: "the value is: " },
      { id: 5, text: "you did not provide the value" }
    ]
  },

  {
    id: "1553530811248",
    level: 10,
    text: "What does the console print?",
    q: () => {
      function doSomething(value) {
        console.info("type of value is: " + typeof value);
        if (typeof value === undefined) {
          console.info("you did not provide the value");
        }
      }

      doSomething();
    },
    answers: [
      { id: 1, text: "Runtime exception" },
      { id: 2, text: "type of value is: undefined" },
      { id: 3, text: "you did not provide the value" }
    ]
  },
  {
    id: "1553293368389",
    level: 10,
    text: "What does the console print?",
    q: () => {
      function add(q1, q2, q3, q4) {
        console.info("sum is: " + q1 + (q2 + q3) + q4++);
        console.info("last number is:" + q4);
      }

      add(2, 6, 3, 4);
    },
    answers: [
      { id: 1, text: "sum is: 15" },
      { id: 2, text: "sum is: 16" },
      { id: 3, text: "sum is: 294" },
      { id: 4, text: "last number is:4" },
      { id: 5, text: "last number is:5" }
    ]
  },
  {
    id: "1553530574397",
    level: 10,
    text: "What does the console print?",
    q: () => {
      function add(q1, q2, q3, q4) {
        console.info("sum is: " + (q1 + q2) + q3 + q4++);
        console.info("last number is:" + q4);
      }
      add(1, 5, 8, 3);
    },
    answers: [
      { id: 1, text: "sum is: 683" },
      { id: 2, text: "sum is: 684" },
      { id: 3, text: "last number is:4" },
      { id: 4, text: "last number is:3" }
    ]
  },
  {
    id: "1553293379660",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      var nr = 4;
      var str = "4";
      if (nr == str) console.info("Equals");
      else console.info("Not Equals");
    },
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" },
      { id: 3, text: "nu va afisa nimic" }
    ]
  },
  {
    id: "1553530744244",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      var nr = 4;
      var str = "4";
      if (nr === str) console.info("Triple Equals");
      else console.info("Not Equals");
    },
    answers: [
      { id: 1, text: "Triple Equals" },
      { id: 2, text: "Not Equals" },
      { id: 3, text: "nu va afisa nimic" }
    ]
  },
  {
    id: "1558975244658",
    level: 5,
    text: "Which of the following statements are true about JSON object",
    answers: [
      {
        id: 1,
        text: "a valid json object can begin with curly braces (eg. var obj = { }; )"
      },
      {
        id: 2,
        text: "an array can contain json objects (eg. var list = [ { }, { } ]; )"
      },
      {
        id: 3,
        text: `json object can omit double quotes for keys inside js code. Eg following lines are the same: 
              <p><code>var json = {"a": "hello"}</code></p>
              <p><code>var json = {a: "hello"}</code></p>`,
        type: "mixed"
      }
    ]
  },
  {
    id: "1553293388034",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      var nr = 4;
      var str = "4";
      if (nr === str) console.info("Equals");
      else console.info("Not Equals");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" }
    ]
  },
  {
    id: "1553293397312",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      // notice a space in the beginning of the string
      var string = " String";
      if ("String" != string.trim()) console.info("case1");
      else console.info("case2");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "case1" },
      { id: 2, text: "case2" }
    ]
  },
  {
    id: "1553530419763",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      // notice a space in the beginning of the string
      var string = " string";
      if ("String" != string.trim()) console.info("case1");
      else console.info("case2");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "case1" },
      { id: 2, text: "case2" }
    ]
  },
  {
    id: "1606050063943",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      var firstName = "Ionel";
      var lastName = "Popescu";
      var fullName = `${firstName} {lastName}`;
      console.info(fullName);
    },
    answers: [
      { id: 1, text: "${firstName} Popescu" },
      { id: 2, text: "Ionel {lastName}" },
      { id: 3, text: "Ionel Popescu" },
      { id: 4, text: "${firstName} {lastName}" }
    ]
  },
  {
    id: "1606051919120",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      var firstName = "Ionel";
      var lastName = "Popescu";
      var fullName = "{firstName} ${lastName}";
      console.info(fullName);
    },
    answers: [
      { id: 1, text: "${firstName} Popescu" },
      { id: 2, text: "Ionel {lastName}" },
      { id: 3, text: "Ionel Popescu" },
      { id: 4, text: "{firstName} ${lastName}" }
    ]
  },
  {
    id: "1553293409116",
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      try {
        var firstname = "Tibi";

        var person = {
          firstName: "Andrei",
          lastName: "Vasilica",
          call: function () {
            console.log("My name is: " + firstName + lastName);
          }
        };

        person.call();
      } catch (e) {
        console.error(e);
      }
    },
    answers: [
      { id: 1, text: `"My name is: Andrei Vasilica"` },
      { id: 2, text: `Uncaught ReferenceError: firstName is not defined` },
      { id: 3, text: `"My name is: Tibi Vasilica"` },
      { id: 4, text: `Uncaught ReferenceError: lastName is not defined` },
      { id: 5, text: `Runtime exception` }
    ]
  },
  {
    id: "1553531045086",
    text: "What is the output of the following code?",
    level: 10,
    q: () => {
      var model = "320";

      var car = {
        make: "BMW",
        model: "118",
        call: function () {
          console.log("My car is a: " + this.make + " " + model);
        }
      };
      car.call();
    }
  },
  {
    id: "1553293416921",
    level: 6,
    text: "What is the output of the following code?",
    q: () => {
      function getPerson(age) {
        return {
          age: age,
          friends: age * 3
        };
      }

      var age = 5;
      var friends = 25;
      console.info(getPerson(age).friends);
    },
    answers: [
      { id: 1, text: "25" },
      { id: 2, text: "Runtime exception" },
      { id: 3, text: "15" }
    ]
  },
  {
    id: "1553531075837",
    level: 6,
    text: "What is the output of the following code?",
    q: () => {
      function getPerson(age) {
        return {
          age: age,
          friends: age * 2
        };
      }
      var age = 3;
      var friends = 15;
      console.info(getPerson(age)["friends"]);
    },
    answers: [
      { id: 1, text: "3" },
      { id: 2, text: "6" },
      { id: 3, text: "10" },
      { id: 4, text: "15" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: "1553293434722",
    level: 15,
    text: "What is the output of the following code?",
    q: () => {
      class Figura {
        constructor(options) {
          this.nume = options.nume;
          this.laturi = options.laturi;
        }
        info() {
          return this.nume + " - " + this.laturi;
        }
      }
      var p = new Figura({
        nume: "Patrat",
        laturi: 4
      });
      console.info(p.info());
      console.info(p.info() == p.nume + " - " + p.laturi);
      console.info(this.nume + " - " + this.laturi);
    },
    answers: [
      { id: 1, text: "Patrat - 4" },
      { id: 2, text: "undefined - undefined" },
      { id: 3, text: "Cannot read property 'nume' of undefined" },
      { id: 4, text: "Cannot read property 'laturi' of undefined" },
      { id: 5, text: "true" },
      { id: 6, text: "false" }
    ]
  },
  {
    id: "1553531127393",
    level: 15,
    text: "What is the output of the following code?",
    q: () => {
      class Figura {
        constructor(options) {
          this.nume = options.nume;
          this.laturi = options.laturi;
        }
        info() {
          return this.nume + " - " + this.laturi;
        }
      }
      var p = new Figura({
        nume: "Patrat",
        laturi: 4
      });
      console.info(p.info());
      console.info(p.info() == this.nume + " - " + this.laturi);
      console.info(this.nume + " - " + this.laturi);
    },
    answers: [
      { id: 1, text: "Patrat - 4" },
      { id: 2, text: "undefined - undefined" },
      { id: 3, text: "Cannot read property 'nume' of undefined" },
      { id: 4, text: "Cannot read property 'laturi' of undefined" },
      { id: 5, text: "true" },
      { id: 6, text: "false" }
    ]
  },
  {
    id: "1553530916576",
    level: 15,
    text: "What is the output of the following code?",
    q: () => {
      class Dog {
        constructor(name) {
          this.name = name;
        }
        woof() {
          console.log(this.name + " said woof!");
        }
      }
      var Rex = new Dog("Rex");
      var dog = {
        name: "Laika"
      };
      Rex.woof.call(dog);
    }
  },
  {
    id: "1553293442831",
    level: 15,
    text: "What is the output of the following code?",
    q: () => {
      class Person {
        constructor(name) {
          this.firstName = name;
        }
        sayHello() {
          console.log("Hello: " + this.firstName);
        }
      }
      var Tibi = new Person("Tibi");
      var person = {
        firstName: "Ionica"
      };
      Tibi.sayHello.call(person);
    },
    answers: [
      { id: 1, text: "Hello Ionica" },
      { id: 2, text: "Cannot read property 'call' of undefined" },
      { id: 3, text: "Hello Tibi" },
      { id: 4, text: "Runtime exception" }
    ]
  },
  {
    id: "1553293450435",
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      var numbers = [8, 2, 3, 7, 5, 1];
      numbers[1] = 6;
      numbers.sort();
      numbers.push(4);
      numbers.forEach(function (number) {
        if (number % 2 == 0) {
          console.info(number);
        }
      });
    },
    answers: [
      { id: 1, text: "0 0 0 4" },
      { id: 2, text: "1 3 5 7" },
      { id: 3, text: "4 6 8" },
      { id: 4, text: "6 8 4" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: "1553531168262",
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      var numbers = [7, 5, 1, 8, 2, 3];
      numbers[2] = 0;
      numbers.sort();
      numbers.push(2);
      numbers.forEach(function (number) {
        if (number % 2 == 0) {
          console.info(number);
        }
      });
    },
    answers: [
      { id: 1, text: "0 2 2 8" },
      { id: 2, text: "0 2 8 2" },
      { id: 3, text: "2 3 7" },
      { id: 4, text: "1 3 7" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: "1553293458940",
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      document.body.innerHTML += [
        '<article id="q11result">',
        '<div id="x">X</div>',
        '<div name="y">Y</div>',
        "</article>"
      ].join("");
      var e1 = document.getElementById("x");
      e1.innerHTML = "A";
      var e2 = document.getElementsByName("y");
      e2.innerHTML = "B";
      console.info(document.getElementById("q11result").innerText);
    },
    answers: [
      { id: 1, text: "A B" },
      { id: 2, text: "X Y" },
      { id: 3, text: "A Y" },
      { id: 4, text: "X B" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: "1553531217891",
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      document.body.innerHTML += [
        '<article id="q11result">',
        '<div name="x">X</div>',
        '<div id="y">Y</div>',
        "</article>"
      ].join("");
      var e1 = document.getElementsByName("x");
      e1.innerHTML = "A";
      var e2 = document.getElementById("y");
      e2.innerHTML = "B";
      console.info(document.getElementById("q11result").innerText);
    },
    answers: [
      { id: 1, text: "A B" },
      { id: 2, text: "X Y" },
      { id: 3, text: "A Y" },
      { id: 4, text: "X B" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: "1553293466889",
    level: 10,
    text: "Which of the following names will turn red?",
    q: () => {
      document.body.innerHTML += [
        '<article class="html">',
        '  <div class="cls1">Adrian</div>',
        '  <p id="any">Bogdan</p>',
        '  <span class="blue">Cristi</span>',
        '  <ul id="all">',
        "    <li>David</li>",
        '    <li class="favorite">Elena</li>',
        "    <li>Florin</li>",
        "  </ul>",
        "</article>",
        "<style>",
        "  #cls1, #any, #all li {",
        "    color: red;",
        "  }",
        "  #all .favorite {",
        "    color: blue;",
        "  }",
        "</style>"
      ].join("\n");
    },
    answers: [
      { id: 1, text: "Adrian" },
      { id: 2, text: "Bogdan" },
      { id: 3, text: "Cristi" },
      { id: 4, text: "David" },
      { id: 5, text: "Elena" },
      { id: 6, text: "Florin" }
    ]
  },
  {
    id: "1553531259659",
    level: 10,
    text: "Which of the following names will turn red?",
    q: () => {
      document.body.innerHTML += [
        '<article class="html">',
        '  <div class="cls1">Adrian</div>',
        '  <p id="any">Bichir</p>',
        '  <span class="blue favorite">Cristi</span>',
        '  <ul id="all">',
        "    <li>David</li>",
        "    <li>Florin</li>",
        "  </ul>",
        "</article>",
        "<style>",
        "  #cls1, #any, #all li {",
        "    color: red;",
        "  }",
        "  #all .favorite {",
        "    color: blue;",
        "  }",
        "</style>"
      ].join("\n");
    },
    answers: [
      { id: 1, text: "Adrian" },
      { id: 2, text: "Bichir" },
      { id: 3, text: "Cristi" },
      { id: 4, text: "David" },
      { id: 5, text: "Elena" },
      { id: 6, text: "Florin" }
    ]
  },
  {
    id: "1562944954320",
    level: 10,
    type: "html",
    text: "Which of the following names will turn red?",
    q: `
        <article class="html">
          <div class="cls1">Adrian</div>
          <p id="any">Bichir</p>
          <span class="blue favorite">Cristi</span>
          <ul id="all">
            <li>David</li>
            <li>Florin</li>
          </ul>
        </article>
        <style>
          #cls1, #any, #all li {
            color: red;
          }
          #all .favorite {
            color: blue;
          }
        </style>
      `,
    answers: [
      { id: 1, text: "Adrian" },
      { id: 2, text: "Bichir" },
      { id: 3, text: "Cristi" },
      { id: 4, text: "David" },
      { id: 5, text: "Elena" },
      { id: 6, text: "Florin" }
    ]
  },
  {
    id: "1553293478562",
    level: 15,
    text: "What is the output of the following code?",
    q: () => {
      class Ar {
        add(i, j) {
          return i + j;
        }
      }

      class AQuestion extends Ar {
        constructor() {
          super();
          var s = 9;
          console.info(this.add(s, 6));
        }
      }

      new AQuestion();
    },
    answers: [
      {
        id: 1,
        text: "Compile error because on line where method 'add' is seen for the first time"
      },
      {
        id: 2,
        text: "Compile error because on line where method 'add' is called"
      },
      { id: 3, text: "Runtime exception" },
      { id: 4, text: "15" }
    ]
  },
  {
    id: "1553530483089",
    level: 15,
    text: "What is the output of the following code?",
    q: () => {
      class Ar {
        average(i, j) {
          return (i + j) / arguments.length;
        }
      }
      class AQuestion extends Ar {
        constructor() {
          super();
          var s = 9;
          console.info(this.average(s, 6));
        }
      }
      new AQuestion();
    },
    answers: [
      {
        id: 1,
        text: "Compile error because on line where method 'average' is seen for the first time"
      },
      {
        id: 2,
        text: "Compile error because on line where method 'average' is called"
      },
      { id: 3, text: "Runtime exception" },
      { id: 4, text: "7.5" }
    ]
  },
  {
    id: "1564127231883",
    level: 5,
    text: "What is the output of the following code?",
    q: () => {
      for (var i = 0; i < 5; i++) {
        console.info(i);
      }
    },
    answers: [
      { id: 1, text: "1 2 3 4" },
      { id: 2, text: "1 2 3 4 5" },
      { id: 3, text: "0 1 2 3 4" },
      { id: 4, text: "0 1 2 3 4 5" },
      { id: 5, text: "4 4 4 4 4" },
      { id: 6, text: "5 5 5 5 5" }
    ]
  },
  {
    id: "1564127928101",
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      for (var i = 0; i < 5; i++) {
        setTimeout(function () {
          console.info(i);
        }, 100);
      }
    },
    answers: [
      { id: 1, text: "1 2 3 4" },
      { id: 2, text: "1 2 3 4 5" },
      { id: 3, text: "0 1 2 3 4" },
      { id: 4, text: "0 1 2 3 4 5" },
      { id: 5, text: "4 4 4 4 4" },
      { id: 6, text: "5 5 5 5 5" }
    ]
  },
  {
    id: "1564128025513",
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      for (var i = 0; i < 5; i++) {
        setTimeout(() => {
          console.info(i);
        }, 100);
      }
    },
    answers: [
      { id: 1, text: "1 2 3 4" },
      { id: 2, text: "1 2 3 4 5" },
      { id: 3, text: "0 1 2 3 4" },
      { id: 4, text: "0 1 2 3 4 5" },
      { id: 5, text: "4 4 4 4 4" },
      { id: 6, text: "5 5 5 5 5" }
    ]
  },
  {
    id: "1564128069003",
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          console.info(i);
        }, 100);
      }
    },
    answers: [
      { id: 1, text: "1 2 3 4" },
      { id: 2, text: "1 2 3 4 5" },
      { id: 3, text: "0 1 2 3 4" },
      { id: 4, text: "0 1 2 3 4 5" },
      { id: 5, text: "4 4 4 4 4" },
      { id: 6, text: "5 5 5 5 5" }
    ]
  },
  {
    id: "1564128249812",
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      for (var i = 0; i < 5; i++) {
        setTimeout(
          (function (i) {
            console.info(i);
          })(i),
          100
        );
      }
    },
    answers: [
      { id: 1, text: "1 2 3 4" },
      { id: 2, text: "1 2 3 4 5" },
      { id: 3, text: "0 1 2 3 4" },
      { id: 4, text: "0 1 2 3 4 5" },
      { id: 5, text: "4 4 4 4 4" },
      { id: 6, text: "5 5 5 5 5" }
    ]
  }
];
