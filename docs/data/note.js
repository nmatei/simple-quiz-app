const note = {
  Biologie: [10, 10, 7, 7, 9],
  EducatieFizica: [10, 10, 10, 10, 10],
  EdMzicala: [10, 10, 10, 10, 10, 9],
  Desen: [10, 10, 10, 10, 10, 10],
  Sociala: [10, 10, 10, 10],
  Tehnologica: [8, 10, 10, 10, 10, 10, 8, 4],
  Geografie: [10, 9, 10, 8],
  TIC: [10, 10, 10, 9, 10],
  Istorie: [10, 10, 9, 10, 10, 9, 9],
  ObtionalRomana: [10, 10, 10, 10, 10],
  Engleza: [10, 10, 10, 10, 9, 10, 9, 9, 10],
  Franceza: [9, 10, 10, 9, 10],
  Romana: [9, 10, 9, 9, 10, 9, 10, 9, 7],
  Matematica: [6, 8, 9, 10, 10, 7, 7, 7, 10, 10, 10],
  Religie: [10, 10, 10, 10],
  Purtare: [10]
};

const averages = Object.keys(note).reduce((acc, name) => {
  acc[name] = parseFloat((note[name].reduce((acc, curr) => acc + curr, 0) / note[name].length).toFixed(2));
  return acc;
}, {});
const average = parseFloat(
  Object.values(averages).reduce((acc, curr) => acc + curr, 0) / Object.keys(averages).length
).toFixed(2);

console.log("Media %o", average);
console.log(averages);

const roundAverages = Object.keys(note).reduce((acc, name) => {
  acc[name] = Math.round(note[name].reduce((acc, curr) => acc + curr, 0) / note[name].length);
  return acc;
}, {});
const roundAverage = parseFloat(
  Object.values(roundAverages).reduce((acc, curr) => acc + curr, 0) / Object.keys(roundAverages).length
).toFixed(2);

console.log("Media rotunjită %o", roundAverage);
console.log(roundAverages);
