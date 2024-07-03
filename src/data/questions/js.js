window.LOAD_QUESTIONS(5, [
  {
    id: 1,
    text: "What types of values do variables have in JavaScript (concepts, not 'typeof')?",
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
    id: 2,
    text: "In JavaScript variable type depends on its value?",
    answerType: "radio",
    answers: [
      { id: 1, text: "True" },
      { id: 2, text: "False" }
    ]
  },
  {
    id: 3,
    text: "If a variable is declared but no value is assigned to it, what is the value of that variable?",
    q: () => {
      // example
      var x;
      console.log(x);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "null", type: "js" },
      { id: 2, text: "undefined", type: "js" },
      { id: 3, text: `""`, type: "js" },
      { id: 4, text: "0", type: "js" }
    ]
  },
  {
    id: 4,
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
    id: 5,
    text: "Can we use any variable as conditions to an 'if' statement?",
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
    id: 6,
    text: "Can we use numbers as conditions for 'if' statements?",
    q: "/*eg: */\n if (10) { /*doSomething*/ }",
    answerType: "radio",
    answers: [
      { id: 1, text: "True" },
      { id: 2, text: "False" }
    ]
  },
  {
    id: 7,
    text: "The logical not operator '!' inverts the value from right side. Which of the following conditions will return 'true'?",
    answers: [
      { id: 1, text: "!false", type: "js" },
      { id: 2, text: "!0", type: "js" },
      { id: 3, text: "!true", type: "js" },
      { id: 4, text: "!!false", type: "js" },
      { id: 5, text: `!""`, type: "js" }
    ]
  },
  {
    id: 8,
    text: `The logical not operator '!' inverts the value from right side. Which of the following conditions will return 'true'?`,
    answers: [
      { id: 1, text: "!false", type: "js" },
      { id: 2, text: "!0", type: "js" },
      { id: 3, text: "!null", type: "js" },
      { id: 4, text: "!undefined", type: "js" },
      { id: 5, text: `!""`, type: "js" }
    ]
  },
  {
    id: 9,
    text: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { id: 1, text: "<script>", type: "html" },
      { id: 2, text: "<scripting>", type: "html" },
      { id: 3, text: "<js/>", type: "html" },
      { id: 4, text: "<javascript>", type: "html" }
    ]
  },
  {
    id: 10,
    text: "What is the correct way of creating a button?",
    answers: [
      { id: 1, text: "<batton>Save</batton>", type: "html" },
      { id: 2, text: "<button>Save</button>", type: "html" },
      { id: 3, text: '<input type="button" value="Save"/>', type: "html" },
      { id: 4, text: '<submit type="button">Save</submit>', type: "html" },
      { id: 5, text: "<buton>Save</buton>", type: "html" }
    ]
  },
  {
    id: 11,
    text: `What is the correct JavaScript syntax to change the content of the HTML element below?`,
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
    id: 12,
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
    id: 15,
    text: `What is the correct syntax to create a function in JavaScript?`,
    answers: [
      { id: 1, text: `function:myFunction() { }`, type: "js" },
      { id: 2, text: `function = myFunction() { return false; }`, type: "js" },
      { id: 3, text: `function myFunction() { }`, type: "js" }
    ]
  },
  {
    id: 16,
    text: `Which statements will output "yes" to the console, given the following function? <p><code>function myFunction(){ console.info('yes'); }</code></p>`,
    answers: [
      { id: 1, text: `myFunction()`, type: "js" },
      { id: 2, text: `call function myFunction()`, type: "js" },
      { id: 3, text: `console.log("yes");`, type: "js" },
      { id: 4, text: `myFunction.apply(window)`, type: "js" }
    ]
  },
  {
    id: 17,
    text: `Which statements will output "yes" to the console, given the following function? <p><code>function myFunction(){ console.info('yes'); }</code></p>`,
    answers: [
      { id: 1, text: `myFunction()`, type: "js" },
      { id: 2, text: `call function myFunction()`, type: "js" },
      { id: 3, text: `myFunction.call(window)`, type: "js" },
      { id: 4, text: `myFunction.apply(window)`, type: "js" }
    ]
  },
  {
    id: 18,
    text: "Which of the following statements are a valid JSON object declared in JavaScript?",
    answers: [
      { id: 1, text: `{name: "Vasilica", "age": "20"}`, type: "js" },
      { id: 2, text: `[{"name": "Vasilica", "age": "20"}]`, type: "js" },
      { id: 3, text: `{"name": "Vasilica", "age": "20"}`, type: "js" }
    ]
  },
  {
    id: 19,
    text: "Which of the following statements are a valid JSON object declared in data.json file?",
    answers: [
      { id: 1, text: `{name: "Vasilica", "age": "20"}`, type: "js" },
      { id: 2, text: `[{"name": "Vasilica", "age": "20"}]`, type: "js" },
      { id: 3, text: `{"name": "Vasilica", "age": "20"}`, type: "js" }
    ]
  },

  {
    id: 20,
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
    id: 21,
    text: "Select all results that will appear in console",
    q: () => {
      console.info(typeof []);
      console.info(typeof {});
      console.info(typeof document.getElementsByTagName("body")[0]);
    },
    answers: [
      {id: 1, text: "string"},
      {id: 2, text: "object"},
      {id: 3, text: "text"}
    ]
  },
  {
    id: 22,
    text: "Select all results that will appear in console",
    q: () => {
      console.info(typeof []);
      console.info(typeof {});
      console.info(typeof "text");
    },
    answers: [
      {id: 1, text: "string"},
      {id: 2, text: "object"},
      {id: 3, text: "text"}
    ]
  },

  {
    id: 23,
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
    id: 24,
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
    id: 25,
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
    id: 26,
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
    id: 27,
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
    id: 28,
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
              <p><code>var info = {"a": "hello"}</code></p>
              <p><code>var info = {a: "hello"}</code></p>`,
        type: "mixed"
      }
    ]
  },
  {
    id: 29,
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
    id: 30,
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
    id: 31,
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
    id: 32,
    text: "What is the output of the following code?",
    q: () => {
      var firstName = "Ionel";
      var lastName = "Popescu";
      var fullName = `${firstName} {lastName}`;
      console.info(fullName);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "${firstName} Popescu" },
      { id: 2, text: "Ionel {lastName}" },
      { id: 3, text: "Ionel Popescu" },
      { id: 4, text: "${firstName} {lastName}" }
    ]
  },
  {
    id: 33,
    text: "What is the output of the following code?",
    q: () => {
      var firstName = "Ionel";
      var lastName = "Popescu";
      var fullName = "{firstName} ${lastName}";
      console.info(fullName);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "${firstName} Popescu" },
      { id: 2, text: "Ionel {lastName}" },
      { id: 3, text: "Ionel Popescu" },
      { id: 4, text: "{firstName} ${lastName}" }
    ]
  },
  {
    id: 34,
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
    answerType: "radio",
    answers: [
      { id: 1, text: `"My name is: Andrei Vasilica"` },
      { id: 2, text: `Uncaught ReferenceError: firstName is not defined` },
      { id: 3, text: `"My name is: Tibi Vasilica"` },
      { id: 4, text: `Uncaught ReferenceError: lastName is not defined` },
      { id: 5, text: `Runtime exception` }
    ]
  },
  {
    id: 35,
    text: "What is the output of the following code?",
    level: 10,
    q: () => {
      var model = "320";
      var make = "FORD";

      var car = {
        make: "BMW",
        model: "118",
        info: function () {
          console.log("My car is a: " + this.make + " " + model);
        }
      };
      car.info();
    },
    answerType: "radio",
    answers: [
      { id: 1, text: `"My car is a: FORD 320"` },
      { id: 2, text: `"My car is a: FORD 118"` },
      { id: 3, text: `"My car is a: BMW 320"` },
      { id: 4, text: `"My car is a: BMW 118"` },
      { id: 5, text: `Uncaught ReferenceError: this.make is not defined` },
      { id: 6, text: `Uncaught ReferenceError: model is not defined` },
      { id: 7, text: `Runtime exception` }
    ]
  },
  {
    id: 36,
    level: 6,
    text: "What does the console print?",
    q: () => {
      const team = {
        name: "Web Development",
        members: 10
      };
      team.name = "WON";
      team.members++;
      team.Members = 9;
      console.info(team.Name);
      console.info(team.members);
    },
    answers: [
      { id: 1, text: "WON" },
      { id: 2, text: "Web Development" },
      { id: 3, text: "undefined" },
      { id: 4, text: "9"},
      { id: 5, text: "10"},
      { id: 6, text: "11"},
      { id: 7, text: "Runtime exception" }
    ]
  },
  {
    id: 37,
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
    answerType: "radio",
    answers: [
      { id: 1, text: "25" },
      { id: 2, text: "Runtime exception" },
      { id: 3, text: "15" },
      { id: 4, text: "undefined" }
    ]
  },
  {
    id: 38,
    level: 6,
    text: "What is the output of the following code?",
    q: () => {
      function getPerson(age) {
        let friends = 10;
        return {
          age,
          friends: age * 2
        };
      }
      var age = 3;
      var friends = 15;
      console.info(getPerson(age)["friends"]);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "3" },
      { id: 2, text: "6" },
      { id: 3, text: "10" },
      { id: 4, text: "15" },
      { id: 5, text: "Runtime exception" },
      { id: 6, text: "undefined" }
    ]
  },
  {
    id: 39,
    level: 6,
    text: "Which of the following statements are a valid JSON object declared in JavaScript?",
    answers: [
      { id: 1, text: `const p = {"age": "19", calc: function() {return 9}}`, type: "js" },
      { id: 2, text: `var a = [{"age": "20"}]`, type: "js" },
      { id: 3, text: `let s = {age: "20"}`, type: "js" }
    ]
  },
  {
    id: 40,
    level: 6,
    text: "How many times 'yes' will be printed in console?",
    q: () => {
      const obj = {
        text: "yes",
        yes: "text"
      };
      let key = "text";

      console.info(obj.text);
      console.info(obj.yes);
      console.info(obj["text"]);
      console.info(obj["yes"]);
      console.info(obj.key);
      console.info(obj[key]);
    },
    // answerType: "number",
    // answerDisplay: "inline-block"
    // answers: [
    //   { id: 1, text: '', correct: 4 }
    // ]
    answerType: "radio",
    answers: [
      { id: 1, text: "1" },
      { id: 2, text: "2" },
      { id: 3, text: "3" },
      { id: 4, text: "4" },
      { id: 5, text: "5" },
      { id: 6, text: "6" },
      { id: 7, text: "0" }
    ]
  },
  {
    id: 41,
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
    id: 42,
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
    id: 43,
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
    },
    answers: [
      'Rex said woof!',
      'Laika said woof!',
      "Cannot read property 'name' of undefined"
    ]
  },
  {
    id: 44,
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
    id: 45,
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
    answerType: "radio",
    answers: [
      { id: 1, text: "0 0 0 4" },
      { id: 2, text: "1 3 5 7" },
      { id: 3, text: "4 6 8" },
      { id: 4, text: "6 8 4" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: 46,
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      const numbers = [7, 5, 1, 8, 2, 3];
      numbers[2] = 0;
      numbers.sort();
      numbers.push(2);
      numbers.forEach((number) => {
        if (number % 2 === 0) {
          console.info(number);
        }
      });
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "0 2 2 8" },
      { id: 2, text: "0 2 8 2" },
      { id: 3, text: "2 3 7" },
      { id: 4, text: "1 3 7" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: 47,
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
    answerType: "radio",
    answers: [
      { id: 1, text: "A B" },
      { id: 2, text: "X Y" },
      { id: 3, text: "A Y" },
      { id: 4, text: "X B" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: 48,
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      document.body.innerHTML = `<article id="q11result">
        <div name="x">X</div>
        <div id="y">Y</div>
        </article>`;
      let e1 = document.getElementsByName("x");
      e1.innerHTML = "A";
      const e2 = document.getElementById("y");
      e2.innerHTML = "B";
      console.info(document.getElementById("q11result").innerText);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "A B" },
      { id: 2, text: "X Y" },
      { id: 3, text: "A Y" },
      { id: 4, text: "X B" },
      { id: 5, text: "Runtime exception" }
    ]
  },
  {
    id: 49,
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
    id: 50,
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
    id: 51,
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
    id: 52,
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
    id: 53,
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
    id: 54,
    text: "What is the output of the following code?",
    q: () => {
      for (var i = 0; i < 5; i++) {
        console.info(i);
      }
    },
    answerType: "radio",
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
    id: 55,
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      for (var i = 0; i < 5; i++) {
        setTimeout(function () {
          console.info(i);
        }, 100);
      }
    },
    answerType: "radio",
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
    id: 56,
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      for (var i = 0; i < 5; i++) {
        setTimeout(() => {
          console.info(i);
        }, 100);
      }
    },
    answerType: "radio",
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
    id: 57,
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          console.info(i);
        }, 100);
      }
    },
    answerType: "radio",
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
    id: 58,
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
    answerType: "radio",
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
    id: 59,
    level: 10,
    text: "What is the output of the following code?",
    q: () => {
      function calc(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
          sum += i;
        }
        return sum;
      }
      console.info(calc(4));
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "4" },
      { id: 2, text: "9" },
      { id: 3, text: "10" },
      { id: 4, text: "11" },
      {
        id: 5,
        text: "The code will never return and will block browser!"
      }
    ]
  },
  {
    id: 60,
    level: 20,
    text: "What is the output of the following code?",
    q: () => {
      function calc(n) {
        if (n < 1) return 0;
        return n + calc(n-1);
      }
      console.info(calc(5));
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "5" },
      { id: 2, text: "10" },
      { id: 3, text: "15" },
      { id: 4, text: "21" },
      {
        id: 5,
        text: "Compile error because method 'calc' is called inside (recursion)"
      }
    ]
  },
  {
    id: 61,
    level: 11,
    text: "Select all valid expressions that apply to Array.map?",
    answers: [
      {id: 1, text: '[1, 2, 3].map(function(n){ return n * 2 })', type: "js"},
      {id: 2, text: '[1, 2, 3].map(function(n, i){ return n * 2; })', type: "js"},
      {id: 3, text: '[1, 2, 3].map((n) => { return n * 2 })', type: "js"},
      {id: 4, text: '[1, 2, 3].map(n => n * 2)', type: "js"}
    ]
  },
  {
    id: 62,
    level: 11,
    text: "Select all valid expressions that apply to Array.map?",
    answers: [
      {id: 1, text: '[1, 2, 3].map(n, i => n * 2)', type: "js"},
      {id: 2, text: '[1, 2, 3].map(n => (n * 2))', type: "js"},
      {id: 3, text: '[1, 2, 3].map(n => n * 2;)', type: "js"}
    ]
  },
  {
    id: 63,
    level: 11,
    text: "What is the output of the following code?",
    q: () => {
      function calc(n) {
        let sum = 0;
        while(n > 0) {
          sum += n;
          n--;
        }
        return sum;
      }
      console.info(calc(5));
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "5" },
      { id: 2, text: "10" },
      { id: 3, text: "15" },
      { id: 4, text: "21" },
      {
        id: 5,
        text: "The code will never return and will block browser!"
      }
    ]
  },
  {
    id: 64,
    level: 11,
    text: "What is the output of the following code?",
    q: () => {
      function calc(n) {
        let sum = 0;
        while(n > 0) {
          sum += n;
        }
        return sum;
      }
      console.info(calc(5));
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "5" },
      { id: 2, text: "10" },
      { id: 3, text: "15" },
      { id: 4, text: "21" },
      {
        id: 5,
        text: "The code will never return and will block browser!"
      }
    ]
  },
  {
    id: 65,
    level: 21,
    text: "What is the output of the following code?",
    q: () => {
      [1, 2, 3].map(n => (n * 2));
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "[1, 2, 3]" },
      { id: 2, text: "[2, 4, 6]" },
      { id: 3, text: "[undefined, undefined, undefined]" },
      { id: 4, text: "Runtime exception, missing return statement" }
    ]
  },
  {
    id: 66,
    level: 21,
    text: "What is the output of the following code?",
    q: () => {
      [1, 2, 3].map(n => {n * 2});
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "[1, 2, 3]" },
      { id: 2, text: "[2, 4, 6]" },
      { id: 3, text: "[undefined, undefined, undefined]" },
      { id: 4, text: "Runtime exception, missing return statement" }
    ]
  },
  {
    id: 67,
    level: 21,
    text: "What is the output of the following code?",
    q: () => {
      [1, 2, 3].map(n => {return n * 2});
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "[1, 2, 3]" },
      { id: 2, text: "[2, 4, 6]" },
      { id: 3, text: "[undefined, undefined, undefined]" },
      { id: 4, text: "Runtime exception, missing ;" }
    ]
  },

  {
    id: 68,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function fixPoints(points) {
        points[1] = {x: 2, y: 4};
      }
      const points = [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}];
      fixPoints(points);
      console.log(points[1].y);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "1" },
      { id: 2, text: "2" },
      { id: 3, text: "3" },
      { id: 4, text: "4" }
    ]
  },
  {
    id: 69,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function mirrorPoints(points) {
        points = points.map(p => ({x: p.y, y: p.x}));
        points[1] = {x: 2, y: 1};
        return points;
      }
      let points = [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}];
      mirrorPoints(points);
      console.log(points[1].y);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "1" },
      { id: 2, text: "2" },
      { id: 3, text: "3" },
      { id: 4, text: "4" },
      { id: 5, text: "5" },
      { id: 6, text: "6" }
    ]
  },
  {
    id: 70,
    level: 6,
    text: "What is the output of the following code?",
    q: () => {
      const getPerson = age => {
        return {
          age,
          friends: age * 2
        };
      }
      let age = 3;
      let friends = 15;
      console.info(getPerson(age)[friends]);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "3" },
      { id: 2, text: "6" },
      { id: 3, text: "10" },
      { id: 4, text: "15" },
      { id: 5, text: "Runtime exception" },
      { id: 6, text: "undefined" }
    ]
  },
  {
    id: 71,
    text: `Which CSS selector will change the background color of the HTML element below?`,
    type: "html",
    q: `<p id="wellcome">HELLO</p>`,
    answerType: "radio",
    answers: [
      {
        id: 1,
        text: `p .wellcome {background-color: red}`,
        type: "css"
      },
      { id: 2, text: `#wellcome {background-color: red}`, type: "css" },
      {
        id: 3,
        text: `.wellcome p {background-color: red}`,
        type: "css"
      }
    ]
  },
  {
    id: 72,
    text: `What is the correct JavaScript syntax to change the content of the HTML element below?`,
    type: "html",
    q: `<p id="wellcome">Hello</p>`,
    answerType: "radio",
    answers: [
      { id: 1, text: `#wellcome.innerHTML = "Wellcome!";`, type: "js" },
      {
        id: 2,
        text: `document.getElementByName("p").innerHTML = "Wellcome!";`,
        type: "js"
      },
      {
        id: 3,
        text: `document.getElementById("wellcome").innerHTML = "Wellcome!";`,
        type: "js"
      }
    ]
  },
  {
    id: 73,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function mirrorPoints(points) {
        points = points.map(p => ({x: p.y, y: p.x}));
        points[1] = {x: 2, y: 1};
        return points;
      }
      let points = [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}];
      points = mirrorPoints(points);
      console.log(points[1].y);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "1" },
      { id: 2, text: "2" },
      { id: 3, text: "3" },
      { id: 4, text: "4" },
      { id: 5, text: "5" },
      { id: 6, text: "6" }
    ]
  },
  {
    id: 74,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function mirrorPoint(point) {
        const tmp = point.y;
        point.y = point.x;
        point.x = tmp;
        return point;
      }
      let points = [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}];
      mirrorPoint(points[1]);
      console.log(points[1].y);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "1" },
      { id: 2, text: "2" },
      { id: 3, text: "3" },
      { id: 4, text: "4" },
      { id: 5, text: "5" },
      { id: 6, text: "6" }
    ]
  },
  {
    id: 75,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function mirrorPoint(x, y) {
        const tmp = y;
        y = x;
        x = tmp;
        return {x: x, y};
      }
      let points = [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}];
      mirrorPoint(points[1].x, points[1].y);
      console.log(points[1].y);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "1" },
      { id: 2, text: "2" },
      { id: 3, text: "3" },
      { id: 4, text: "4" },
      { id: 5, text: "5" },
      { id: 6, text: "6" }
    ]
  },
  {
    id: 76,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const a1 = [1, 2, 3];
      const a2 = [1, 2, 3];
      if (a1 == a2) console.info("Equals");
      else console.info("Not Equals");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" }
    ]
  },
  {
    id: 77,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const a1 = [1, 2, 3];
      const a2 = [1, 2, 3];
      if (JSON.stringify(a1) == JSON.stringify(a2)) console.info("Equals");
      else console.info("Not Equals");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" }
    ]
  },
  {
    id: 78,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const p1 = {x: 1, y: 2};
      const p2 = {x: 1, y: 2};
      if (p1 == p2) console.info("Equals");
      else console.info("Not Equals");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" }
    ]
  },
  {
    id: 79,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const p1 = {x: 1, y: 2};
      const p2 = {x: 1, y: 2};
      if (JSON.stringify(p1) == JSON.stringify(p2)) console.info("Equals");
      else console.info("Not Equals");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" }
    ]
  },
  {
    id: 80,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const p1 = {x: 1, y: 2};
      const p2 = {x: 1, y: 2};
      if (p1.x === p2.x) console.info("Equals");
      else console.info("Not Equals");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" }
    ]
  },
  {
    id: 81,
    level: 22,
    text: "What is the output of the following code?",
    copy: false,
    q: () => {
      if ([] === []) console.info("Equals");
      else console.info("Not Equals");
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" }
    ]
  },
  {
    id: 82,
    text: "Select all results that will appear in console",
    q: () => {
      function getStr() { return "Me" }
      console.info(typeof getStr);
    },
    answers: [
      {id: 1, text: "string"},
      {id: 2, text: "object"},
      {id: 3, text: "function"},
      {id: 4, text: "Me"}
    ]
  },
  {
    id: 83,
    text: "Select all results that will appear in console",
    q: () => {
      function getStr() { return "Me" }
      console.info(typeof getStr());
    },
    answers: [
      {id: 1, text: "string"},
      {id: 2, text: "object"},
      {id: 3, text: "function"},
      {id: 4, text: "Me"}
    ]
  },
  {
    id: 84,
    text: "Select all results that will appear in console",
    q: () => {
      function getStr() { return "Me" }
      console.info(getStr());
    },
    answers: [
      {id: 1, text: "string"},
      {id: 2, text: "object"},
      {id: 3, text: "function"},
      {id: 4, text: "Me"}
    ]
  },
  {
    id: 85,
    text: "Which of the following expressions are correct?",
    answers: [
      { id: 1, text: "var s = 'text';", type: "js" },
      { id: 2, text: `var s = 'text";`, type: "js" },
      { id: 3, text: `var s = "text';`, type: "js" },
      { id: 4, text: `var s = "text";`, type: "js" },
      { id: 5, text: `var s = '"text';`, type: "js" },
      { id: 6, text: `var s = 'text"';`, type: "js" }
    ]
  },
  {
    id: 86,
    text: "Which of the following expressions are correct?",
    answers: [
      { id: 1, text: "var s = `\"text'`;", type: "js" },
      { id: 2, text: "var s = `\"text\"`;", type: "js" },
      { id: 3, text: 'var s = "text`;', type: "js" },
      { id: 4, text: `var s = "text";`, type: "js" },
      { id: 5, text: 'var s = `text`;', type: "js" },
      { id: 6, text: 'var s = `text";', type: "js" }
    ]
  },
  {
    id: 87,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const reaction = 'Yikes';
      reaction[0] = 'L';
      console.info(reaction);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Yikes" },
      { id: 2, text: "Likes" },
      { id: 3, type: "js", text: "Uncaught TypeError: Assignment to constant variable."}
    ]
  },
  {
    id: 88,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const reaction = 'Yikes';
      reaction = 'Likes';
      console.info(reaction);
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Yikes" },
      { id: 2, text: "Likes" },
      { id: 3, type: "js", text: "Uncaught TypeError: Assignment to constant variable."}
    ]
  },
  {
    id: 89,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const reaction = ['Y','i','k','e','s'];
      reaction[0] = 'L';
      console.info(reaction.join(''));
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "Yikes" },
      { id: 2, text: "Likes" },
      { id: 3, type: "js", text: "Uncaught TypeError: Assignment to constant variable."}
    ]
  },
  {
    id: 90,
    level: 10,
    text: "Select all results that will appear in console",
    q: () => {
      function load(){
        return "ABCDEFGHIJKLMNOP";
      }
      function chained() {
        return load().toLowerCase().substring(2, 4);
      }
      function steps() {
        const text = load();
        const lower = text.toLowerCase();
        const result = lower.substring(2, 4);
        return result;
      }
      const c = chained();
      const s = steps();
      console.info(c);
      console.info(s);
      console.info(c === s);
    },
    answers: [
      { id: 1, text: "undefined" },
      { id: 2, text: "de" },
      { id: 3, text: "cde" },
      { id: 4, text: "cd" },
      { id: 5, text: "false" },
      { id: 6, text: "true" },
      { id: 7, text: "Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')"}
    ]
  },
  {
    id: 91,
    level: 10,
    text: "Select all results that will appear in console",
    q: () => {
      function load(){
        return "ABCDEFGHIJKLMNOP";
      }
      function chained() {
        load().toLowerCase().substring(2, 4);
      }
      function steps() {
        const text = load();
        const lower = text.toLowerCase();
        const result = lower.substring(2, 4);
        return result;
      }
      const c = chained();
      const s = steps();
      console.info(c);
      console.info(s);
      console.info(c === s);
    },
    answers: [
      { id: 1, text: "undefined" },
      { id: 2, text: "de" },
      { id: 3, text: "cde" },
      { id: 4, text: "cd" },
      { id: 5, text: "false" },
      { id: 6, text: "true" },
      { id: 7, text: "Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')"}
    ]
  },
  {
    id: 92,
    level: 10,
    text: "Select all results that will appear in console",
    q: () => {
      function load(){
        "ABCDEFGHIJKLMNOP";
      }
      function chained() {
        load().toLowerCase().substring(2, 4);
      }
      function steps() {
        const text = load();
        const lower = text.toLowerCase();
        const result = lower.substring(2, 4);
        return result;
      }
      const c = chained();
      const s = steps();
      console.info(c);
      console.info(s);
      console.info(c === s);
    },
    answers: [
      { id: 1, text: "undefined" },
      { id: 2, text: "de" },
      { id: 3, text: "cde" },
      { id: 4, text: "cd" },
      { id: 5, text: "false" },
      { id: 6, text: "true" },
      { id: 7, text: "Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')"}
    ]
  },
  {
    id: 93,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const emptyTeam = {
        id: "id",
        name: "Check",
        members: "we"
      };
      function getEmptyTeam() {
        return emptyTeam;
      }
      console.info(getEmptyTeam() === getEmptyTeam())
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "false"},
      { id: 2, text: "true" }
    ]
  },
  {
    id: 94,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function getEmptyTeam() {
        return {
          id: "id",
          name: "Check",
          members: "we"
        };
      }
      console.info(getEmptyTeam() === getEmptyTeam())
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "false"},
      { id: 2, text: "true" }
    ]
  },
  {
    id: 95,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function getEmptyTeam() {
        const emptyTeam = {
          id: "id",
          name: "Check",
          members: "we"
        };
        return emptyTeam;
      }
      console.info(getEmptyTeam() === getEmptyTeam())
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "false"},
      { id: 2, text: "true" }
    ]
  },
  {
    id: 96,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      function getEmptyTeam() {
        const emptyTeam = JSON.stringify({
          id: "id",
          name: "Check",
          members: "we"
        });
        return emptyTeam;
      }
      console.info(getEmptyTeam() === getEmptyTeam())
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "false"},
      { id: 2, text: "true" }
    ]
  },
  {
    id: 97,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const emptyTeam = JSON.stringify({
        id: "id",
        name: "Check",
        members: "we"
      });
      function getEmptyTeam() {
        return JSON.parse(emptyTeam);
      }
      console.info(getEmptyTeam() === getEmptyTeam())
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "false"},
      { id: 2, text: "true" }
    ]
  },
  {
    id: 98,
    level: 22,
    text: "What is the output of the following code?",
    q: () => {
      const emptyTeam = {
        id: "id",
        name: "Check",
        members: "we"
      };
      function getEmptyTeam() {
        return { ...emptyTeam };
      }
      console.info(getEmptyTeam() === getEmptyTeam())
    },
    answerType: "radio",
    answers: [
      { id: 1, text: "false"},
      { id: 2, text: "true" }
    ]
  },
  {
    id: 99,
    level: 22,
    text: "Select all results that will appear in console",
    q: () => {
      function getSevenYearsLater(date) {
        date.setFullYear(date.getFullYear() + 7);

        return date;
      }

      const startDate = new Date("2024-04-09")
      const sevenYearsLater = getSevenYearsLater(startDate)
      console.info("start year: ", startDate.getFullYear())
      console.info("seven years later: ", sevenYearsLater.getFullYear())
    },
    answers: [
      { id: 1, text: "start year: 2024"},
      { id: 2, text: "start year: 2031" },
      { id: 3, text: "seven years later: 2024"},
      { id: 4, text: "seven years later: 2031" }
    ]
  },
  {
    id: 100,
    level: 22,
    text: "Select all results that will appear in console",
    q: () => {
      function getSevenYearsLater(date) {
        const changedDate = new Date();
        changedDate.setFullYear(date.getFullYear() + 7);

        return changedDate;
      }

      const startDate = new Date("2024-04-09")
      const sevenYearsLater = getSevenYearsLater(startDate)
      console.info("start year: ", startDate.getFullYear())
      console.info("seven years later: ", sevenYearsLater.getFullYear())
    },
    answers: [
      { id: 1, text: "start year: 2024"},
      { id: 2, text: "start year: 2031" },
      { id: 3, text: "seven years later: 2024"},
      { id: 4, text: "seven years later: 2031" }
    ]
  }
]);