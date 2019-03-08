printQ([
  {
    fn: q1,
    id: 1,
    text: "Care rezultate vor fi afisate in consola?",
    answers: [
      { id: 1, text: "Exceptie la runtime" },
      { id: 2, text: "the value is: undefined" },
      { id: 3, text: "you did not provide the value" }
    ]
  },
  {
    fn: q2,
    text: "Care rezultate vor fi afisate in consola?",
    answers: [
      { id: 1, text: "sum is: 295" },
      { id: 2, text: "sum is: 294" },
      { id: 3, text: "last number is:5" },
      { id: 4, text: "last number is:6" }
    ]
  },
  {
    fn: q3,
    text: "Care este rezultatul codului de mai jos?",
    answers: [
      { id: 1, text: "Equals" },
      { id: 2, text: "Not Equals" },
      { id: 3, text: "nu va afisa nimic" }
    ]
  }
]);

setTimeout(submitTest, 500);
