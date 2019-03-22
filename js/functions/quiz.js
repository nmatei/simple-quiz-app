const ALL_QUESTIONS = [
  {
    id: 1,
    text: "Care rezultate vor fi afisate in consola?",
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
      { id: 1, text: "Exceptie la runtime" },
      { id: 2, text: "the value is: undefined" },
      { id: 3, text: "you did not provide the value" }
    ]
  },
  {
    id: 2,
    text: "Care rezultate vor fi afisate in consola?",
    q: () => {
      function add(q1, q2, q3, q4) {
        console.info("sum is: " + q1 + (q2 + q3) + q4++);
        console.info("last number is:" + q4);
      }

      add(2, 6, 3, 4);
    },
    answers: [
      { id: 1, text: "sum is: 295" },
      { id: 2, text: "sum is: 294" },
      { id: 3, text: "last number is:5" },
      { id: 4, text: "last number is:6" }
    ]
  },
  {
    id: 3,
    text: "Care este rezultatul codului de mai jos?",
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
    id: 4,
    text: "?",
    q: () => {
      var nr = 4;
      var str = "4";
      if (nr === str) console.info("Equals");
      else console.info("Not Equals");
    }
  },
  {
    id: 5,
    text: "?",
    q: () => {
      // notice a space in the beginning of the string
      var string = " String";
      if ("String" != string.trim()) console.info("case1");
      else console.info("case2");
    }
  },
  {
    id: 6,
    text: "?",
    q: () => {
      try {
        var firstname = "Tibi";

        var person = {
          firstName: "Andrei",
          lastName: "Vasilica",
          call: function() {
            console.log("My name is: " + firstName + lastName);
          }
        };

        person.call();
      } catch (e) {
        console.error(e);
      }
    }
  },
  {
    id: 7,
    text: "?",
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
    }
  },
  {
    id: 8,
    text: "?",
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
    }
  },
  {
    id: 9,
    text: "?",
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
    }
  },
  {
    id: 10,
    text: "?",
    q: () => {
      var numbers = [8, 2, 3, 7, 5, 1];
      numbers[1] = 6;
      numbers.sort();
      numbers.push(4);
      numbers.forEach(function(number) {
        if (number % 2 == 0) {
          console.info(number);
        }
      });
    }
  },
  {
    id: 11,
    text: "?",
    q: () => {
      document.body.innerHTML += [
        '<article id="q11result">',
        '<div id="x">X</div><div name="y">Y</div>',
        "</article>"
      ].join("");

      var e1 = document.getElementById("x");
      e1.innerHTML = "A";
      var e2 = document.getElementsByName("y");
      e2.innerHTML = "B";

      console.info(document.getElementById("q11result").innerText);
    }
  },
  {
    id: 12,
    text: "?",
    // TODO fix format in question after render
    q: () => {
      document.body.innerHTML += [
        '<article class="html">',
        '   <div class="cls1">Adrian</div>',
        '   <p id="any">Bogdan</p>',
        '   <span class="blue">Cristi</span>',
        '   <ul id="all">',
        "       <li>David</li>",
        '       <li class="favorite">Elena</li>',
        "       <li>Florin</li>",
        "   </ul>",
        "</article>",
        "<style>",
        "   #cls1, #any, #all li {",
        "      color: red;",
        "   }",
        "   #all .favorite {",
        "      color: blue;",
        "   }",
        "</style>"
      ].join("\n");
    }
  },
  {
    id: 13,
    text: "?",
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
    }
  },
  {
    id: "collectAnswers",
    text: "collectAnswers",
    q: collectAnswers
  },
  {
    id: "collectAnswers",
    text: "collectAnswers",
    // TODO find why name() is not in new line
    q: `function name(){if("yes" == 'yes'){console.log(x);}}name();`
  }
];
