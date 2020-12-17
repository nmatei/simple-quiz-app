const employees = [
  {
    id: 1,
    firstName: "Solly",
    lastName: "Coon",
    email: "scoon0@miitbeian.gov.cn",
    gender: "Male",
    salary: "293.27"
  },
  {
    id: 2,
    firstName: "Myron",
    lastName: "Clissold",
    email: "mclissold1@over-blog.com",
    gender: "Male",
    salary: "463.44"
  },
  {
    id: 3,
    firstName: "Perla",
    lastName: "Fauguel",
    email: "pfauguel2@discovery.com",
    gender: "Female",
    salary: "764.17"
  },
  {
    id: 4,
    firstName: "Aundrea",
    lastName: "Kegan",
    email: "akegan3@tripod.com",
    gender: "Female",
    salary: "574.63"
  },
  {
    id: 5,
    firstName: "Eadith",
    lastName: "Chene",
    email: "echene4@prnewswire.com",
    gender: "Female",
    salary: "417.37"
  },
  {
    id: 6,
    firstName: "Lorette",
    lastName: "Tuther",
    email: "ltuther5@admin.ch",
    gender: "Female",
    salary: "377.40"
  },
  {
    id: 7,
    firstName: "Robenia",
    lastName: "Robins",
    email: "rrobins6@networkadvertising.org",
    gender: "Female",
    salary: "206.26"
  },
  {
    id: 8,
    firstName: "Moe",
    lastName: "Bottoms",
    email: "mbottoms7@php.net",
    gender: "Male",
    salary: "425.70"
  },
  {
    id: 9,
    firstName: "Talia",
    lastName: "Cutsforth",
    email: "tcutsforth8@delicious.com",
    gender: "Female",
    salary: "711.72"
  },
  {
    id: 10,
    firstName: "Ives",
    lastName: "Crennan",
    email: "icrennan9@microsoft.com",
    gender: "Male",
    salary: "668.98"
  }
];

const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
  { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 }
];

const people = [
  "Bernhard, Sandra",
  "Bethea, Erin",
  "Becker, Carl",
  "Bentsen, Lloyd",
  "Beckett, Samuel",
  "Blake, William",
  "Berger, Ric",
  "Beddoes, Mick",
  "Beethoven, Ludwig",
  "Belloc, Hilaire",
  "Begin, Menachem",
  "Bellow, Saul",
  "Benchley, Robert",
  "Blair, Robert",
  "Benenson, Peter",
  "Benjamin, Walter",
  "Berlin, Irving",
  "Benn, Tony",
  "Benson, Leana",
  "Bent, Silas",
  "Berle, Milton",
  "Berry, Halle",
  "Biko, Steve",
  "Beck, Glenn",
  "Bergman, Ingmar",
  "Black, Elk",
  "Berio, Luciano",
  "Berne, Eric",
  "Berra, Yogi",
  "Berry, Wendell",
  "Bevan, Aneurin",
  "Ben-Gurion, David",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bennington, Chester",
  "Bierce, Ambrose",
  "Billings, Josh",
  "Birrell, Augustine",
  "Blair, Tony",
  "Beecher, Henry",
  "Biondo, Frank"
];

function getObjAsString(obj) {
  return JSON.stringify(obj).replace(/\"(\w*)\":/gi, "$1:");
}

window.ALL_QUESTIONS = [
  {
    level: 10,
    text: `Use this collection for any of the following exercises. <br>"employees" variable is available in console already`,
    q: `// press F12 and use "employees" in console
    var employees = ${getObjAsString(employees)};`
  },
  {
    level: 10,
    text: "Create a function that returns only the firstName of each person.",
    q: () => {
      function collectFirstName(employees) {
        console.info("employees: ", employees);
        if (!employees) {
          console.info("you did not provide any value");
        }

        var firstNames = employees.map(function (employee) {
          //TODO - return firstName
        });
        //TODO - log firstNames
        //TODO - return firstNames
      }

      collectFirstName(employees);
    }
  },
  {
    level: 10,
    text: "Create a function that calculates the average female salary. Log the result in the console.",
    q: () => {
      function calculateAverageSalary(employees) {
        var sum = 0;

        employees.forEach(/*your code here*/);

        return /* average */;
      }

      var average = calculateAverageSalary(employees);
      console.log("average", average);
    }
  },
  {
    level: 10,
    text: "As always, create a function that return 2 arrays, one of male and the other of female employees.",
    q: () => {
      function splitEmployees(employees) {
        /* your code here: */
        /* hint: maybe use array filter */
      }

      splitEmployees(employees);
    }
  },
  {
    level: 10,
    text: "Bonus! Convert the employee array into an object. Each key of that object should be the employee lastName.",
    q: () => {
      //the object should look like this:

      var converted = {
        Coon: {
          id: 1,
          firstName: "Solly",
          lastName: "Coon",
          email: "scoon0@miitbeian.gov.cn",
          gender: "Male",
          salary: "293.27"
        },
        Clissold: {
          id: 2,
          firstName: "Myron",
          lastName: "Clissold",
          email: "mclissold1@over-blog.com",
          gender: "Male",
          salary: "463.44"
        }
        //and so on....
      };

      // no hints this time 😄
    }
  },
  {
    level: 10,
    text: `Use this collection for any of the following exercises. <br>"inventors" constant is available in console already`,
    q: `// press F12 and use "inventors" in console
    const inventors = ${getObjAsString(inventors)};`
  },
  {
    level: 10,
    text: `Use this collection for any of the following exercises. <br>"people" constant is available in console already`,
    q: `// press F12 and use "people" in console
    const people = ${getObjAsString(people)};`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">Array.prototype.filter()</a><br>
        Filter the list of inventors for those who were born in the 1500's`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank">Array.prototype.map()</a><br>
        Give us an array of the inventors first and last names`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find" target="_blank">Array.prototype.find()</a><br>
        Find and return the inventor Galileo Galilei`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" target="_blank">Array.prototype.reduce()</a><br>
        How many years did all the inventors live all together?`
  },
  {
    level: 10,
    text: `Sort the inventors by years lived`
  },
  {
    level: 10,
    text: `Create a list of Boulevards in Paris that contain 'de' anywhere in the name`
  },
  {
    level: 10,
    text: `Sum up the instances of each of these`,
    q: function () {
      const data = [
        "car",
        "car",
        "truck",
        "truck",
        "bike",
        "walk",
        "car",
        "van",
        "bike",
        "walk",
        "car",
        "van",
        "car",
        "truck"
      ];
      // car: 5, truck: ...
    }
  }
];
