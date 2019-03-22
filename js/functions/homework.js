const q1 = (employees) => () => {
  function collectFirstName(employees) {
    console.info("employees: ", employees);
    if (!employees) {
      console.info("you did not provide any value");
    }

    var firstNames = employees.map(function (employee) {
      //TODO - return firstName
    })

    //TODO - log firstNames

    //TODO - return firstNames
  }

  collectFirstName(employees);
};

const q2 = (employees) => () => {
  function calculateAverageSalary(employees) {
    var sum = 0;

    employees.forEach(/*your code here*/);

    return /* average */;
  }

  var average = calculateAverageSalary(employees);
  console.log('average', average);
};

const q3 = (employees) => () => {
  function splitEmployees(employees) {
    /* your code here: */
    /* hint: maybe use array filter */
  }

  splitEmployees(employees);
};

const q4 = (employees) => () => {
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
  }

  // no hints this time 😄
};
