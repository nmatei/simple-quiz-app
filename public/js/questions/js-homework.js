function getObjAsString(obj) {
  return JSON.stringify(obj).replace(/\"(\w*)\":/gi, "$1:");
}

window.ALL_QUESTIONS = [
  {
    level: 10,
    text: `Use this collection for any of the following exercises. <br>"employees" variable is available in console already`,
    readOnly: true,
    copy: true,
    q: `// press F12 and use "employees" in console
      //
      // you can also import all constants in your project using:
      //
      //   &lt;script src="https://nmatei.github.io/simple-quiz-app/public/js/questions/constants.js"&gt;&lt;/script&gt;
      //
       
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
    text: "Create a function that calculates the average salary then print result in the console. (result: 490.29)",
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
    text: "Create a function that calculates the average female salary. Log the result in the console. (result: 508.59)",
    q: () => {
      function calculateAverageFemSalary(employees) {
        var sum = 0;

        employees.forEach(/*your code here*/);

        return /* average */;
      }

      var average = calculateAverageFemSalary(employees);
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
    readOnly: true,
    copy: true,
    q: `// press F12 and use "inventors" in console
    const inventors = ${getObjAsString(inventors)};`
  },
  {
    level: 10,
    text: `Use this collection for any of the following exercises. <br>"people" constant is available in console already`,
    readOnly: true,
    copy: true,
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
    text: `<a href="https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris">Go to address</a> and create a list of Boulevards in Paris that contain 'de' anywhere in the name`
  },
  {
    level: 15,
    text: `Sum up the instances of each of these`,
    readOnly: true,
    copy: true,
    q: () => {
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
  },
  {
    level: 10,
    text: `Use this collections for any of the following exercises. <br>"friends" or "comments" constant is available in console already`,
    readOnly: true,
    copy: true,
    q: `// press F12 and use "people" or "comments" in console
    const friends = ${getObjAsString(friends)};
    const comments = ${getObjAsString(comments)};`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some" target="_blank">Array.prototype.some()</a><br>
        Is at least one person 19 or older?`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every" target="_blank">Array.prototype.every()</a><br>
        Is everyone 19 or older?`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find" target="_blank">Array.prototype.find()</a><br>
        Find the comment with the ID of 823423.`
  },
  {
    level: 10,
    text: `<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex" target="_blank">Array.prototype.findIndex()</a><br>
        Find the comment with ID 823423 and delete the comment.`
  }
];
