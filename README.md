# JS/HTML/CSS Quiz

A collection if **questions** to help you understand basic web concepts (mostly javascript).

## 🎞 Apps (Domains)

- **[👩‍💻 JS Quiz](https://nmatei.github.io/simple-quiz-app/?domain=js&level=5)** - test your **JS skills**!
- [📗 HTML/CSS/JS **Homework**](https://nmatei.github.io/simple-quiz-app/?domain=js-homework&level=10)
- [🧮 Basic Math Quiz](https://nmatei.github.io/simple-quiz-app/?domain=math&level=22)
- [⛪️ Olimpiada Biblică 2024](https://nmatei.github.io/simple-quiz-app/?domain=bible&level=2024&limit=10)

## 📚 Useful Resources

### ‍💻 My course on Udemy

- [x] [Become a WEB Developer from Scratch, step by step Guide](https://nmatei.github.io/web) - by [Nicolae Matei](https://nmatei.github.io/)

### 📖 Read

- [x] [Useful Examples of map, reduce and filter](https://link.medium.com/XezVbaWgNT)
- [x] [toptal - javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)
- [x] [js-concepts by leonardomso](https://github.com/leonardomso/33-js-concepts#1-call-stack)
- [ ] [javascript-questions by lydiahallie](https://github.com/lydiahallie/javascript-questions/blob/master/README.md)
- [ ] [JS Exercises](https://ydkjs-exercises.com/)
- [x] [Arrays: Some(), Every(), and forEach()](https://levelup.gitconnected.com/javascript-array-some-vs-every-vs-foreach-knowledge-scoops-81dfe43369c6)
- [x] [Simplify your JavaScript – Use .some() and .find()](https://medium.com/poka-techblog/simplify-your-javascript-use-some-and-find-f9fb9826ddfd)
- [x] [ES6 Javascript: The Complete Developer's Guide](https://www.udemy.com/course/javascript-es6-tutorial/#overview)
- [ ] [justjavascript.com](https://justjavascript.com/)

### 🎥 Conferences

- [JSHeroes](https://www.youtube.com/c/JSHeroes)

## 💠 Features

- [ ] Welcome screen (enter or select name) + remember me
- [ ] Remember selected options for each name
- [x] Show 10 random tests => print test results
- [ ] Choose domain
- [x] Choose level
- [ ] After finish Test show info notes
- [ ] Add time limit
- [ ] Store answers in local storage in case of reload
- [ ] Theme switch
- [ ] Allow answers as text & number in combination with radio & checkbox
- [ ] (bug) Reset after change level

## 👨‍🏫 Trainer Notes

### 📃 Generate a test with required questions

- [x] Open [domain=js&limit=10000&shuffle=false&index=id&level=0](https://nmatei.github.io/simple-quiz-app/?domain=js&limit=1000&shuffle=false&index=id&level=0)
- [x] Select specific ids then use `Copy ID's`
- [x] Open [domain=js&type=theoretical&test=1](https://nmatei.github.io/simple-quiz-app/?domain=js&type=theoretical&test=1)
- [x] After page is activated refresh it (it should ask you expire minutes alert)
- [x] Paste the ID's from clipboard into browser prompt
- [x] Copy current link and share it

### 🔠 Extra params

- [x] generate **Theoretical** Test [domain=js&type=theoretical&test=1](https://nmatei.github.io/simple-quiz-app/?domain=js&type=theoretical&test=1)
- [x] generate **Practical** Test [domain=js&type=practical&test=1](https://nmatei.github.io/simple-quiz-app/?domain=js&type=practical&test=1)
- [x] Limit by level [domain=js&limit=1000&shuffle=false](https://nmatei.github.io/simple-quiz-app/?domain=js&limit=100&shuffle=false)
- [x] Limit no level [domain=js&limit=1000&shuffle=false&level=0](https://nmatei.github.io/simple-quiz-app/?domain=js&limit=100&shuffle=false&level=0)

## 📋 Dev Notes

### ▶ Start & Build

```sh
npm i
npm start
```

Production build:

```sh
npm run build
```

### How to add new questions

- [ ] soon: [domain=bible&level=2024&limit=10000&add=true&index=id&correct=1](https://nmatei.github.io/simple-quiz-app/?domain=bible&level=2024&limit=10000&add=true&index=id&correct=1)
- [x] **JS questions** are listed in [src/data/questions/js.js](src/data/questions/js.js)
- [x] correct **answers** are listed in [src/data/answers.json](src/data/answers.json)

### TODOs

- [ ] make sure used provided a valid user name
- [ ] try webworkers to store entire content when you don't have internet
