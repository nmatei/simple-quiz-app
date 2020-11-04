var employees = [{
  "id": 1,
  "firstName": "Solly",
  "lastName": "Coon",
  "email": "scoon0@miitbeian.gov.cn",
  "gender": "Male",
  "salary": "293.27"
}, {
  "id": 2,
  "firstName": "Myron",
  "lastName": "Clissold",
  "email": "mclissold1@over-blog.com",
  "gender": "Male",
  "salary": "463.44"
}, {
  "id": 3,
  "firstName": "Perla",
  "lastName": "Fauguel",
  "email": "pfauguel2@discovery.com",
  "gender": "Female",
  "salary": "764.17"
}, {
  "id": 4,
  "firstName": "Aundrea",
  "lastName": "Kegan",
  "email": "akegan3@tripod.com",
  "gender": "Female",
  "salary": "574.63"
}, {
  "id": 5,
  "firstName": "Eadith",
  "lastName": "Chene",
  "email": "echene4@prnewswire.com",
  "gender": "Female",
  "salary": "417.37"
}, {
  "id": 6,
  "firstName": "Lorette",
  "lastName": "Tuther",
  "email": "ltuther5@admin.ch",
  "gender": "Female",
  "salary": "377.40"
}, {
  "id": 7,
  "firstName": "Robenia",
  "lastName": "Robins",
  "email": "rrobins6@networkadvertising.org",
  "gender": "Female",
  "salary": "206.26"
}, {
  "id": 8,
  "firstName": "Moe",
  "lastName": "Bottoms",
  "email": "mbottoms7@php.net",
  "gender": "Male",
  "salary": "425.70"
}, {
  "id": 9,
  "firstName": "Talia",
  "lastName": "Cutsforth",
  "email": "tcutsforth8@delicious.com",
  "gender": "Female",
  "salary": "711.72"
}, {
  "id": 10,
  "firstName": "Ives",
  "lastName": "Crennan",
  "email": "icrennan9@microsoft.com",
  "gender": "Male",
  "salary": "668.98"
}];

window.ALL_QUESTIONS = [
  {
    id: "1",
    level: 10,
    text: `Use this collection for any of the following exercises. <br>"employees" variable is available in console already`,
    q: `// press F12 and use "employees" in console
    var employees = ${JSON.stringify(employees)};`
  },
  {
    id: "2",
    level: 10,
    text: "Create a function that returns only the firstName of each person.",
    q: () => {
      function collectFirstName(employees) {
        console.info("employees: ", employees);
        if (!employees) {
          console.info("you did not provide any value");
        }

        var firstNames = employees.map(function(employee) {
          //TODO - return firstName
        });
        //TODO - log firstNames
        //TODO - return firstNames
      }

      collectFirstName(employees);
    }
  },
  {
    id: "3",
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
    id: "4",
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
    id: "5",
    level: 15,
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
  }
];
