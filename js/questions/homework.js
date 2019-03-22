$.ajax(API_URL.MOCKS).done(helperData => {
  printQ(
    {
      id: 0,
      text: "Use this collection for any of the following exercises",
      q: "var employees = " + JSON.stringify(helperData, null, 2) + ";"
    },
    ""
  );

  printQ([
    {
      id: 1,
      text: "Create a function that returns only the firstName of each person.",
      q: q1
    },
    {
      id: 2,
      text:
        "Create a function that calculates the average female salary. Log the result in the console.",
      q: q2
    },
    {
      id: 3,
      text:
        "As always, create a function that return 2 arrays, one of male and the other of female employees.",
      q: q3
    },
    {
      id: 4,
      text:
        "Bonus! Convert the employee array into an object. Each key of that object should be the employee lastName.",
      q: q4
    }
  ]);

  applyCustomTheme();
});
