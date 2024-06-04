# JS/HTML/CSS Quiz

A collection if **questions** to help you understand basic web concepts (mostly javascript).

## 🎞 Apps (Domains)

- [x] **[👩‍💻 JS Quiz](https://nmatei.github.io/simple-quiz-app/?domain=js&level=5-6-10)** - test your **JS skills**!
- [x] [📗 HTML / CSS / JS **Homework**](https://nmatei.github.io/simple-quiz-app/?domain=js-homework&level=10)
- [x] [🧮 Basic Math Quiz](https://nmatei.github.io/simple-quiz-app/?domain=math&level=22)
- [x] [📖 Olimpiada Biblică 2024](https://nmatei.github.io/simple-quiz-app/?domain=bible&level=2-3-5&limit=10)

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

- [x] Welcome screen (enter or select name) + remember me
- [ ] Remember selected options for each name
- [x] Show random tests with different levels
- [x] Choose levels
- [ ] Choose domain
- [ ] After finish Test show info notes
- [ ] Add time limit
- [ ] Store answers in local storage in case of reload
- [ ] Theme switch
- [ ] Allow answers as text & number in combination with radio & checkbox
- [ ] (bug) Reset after change level

## 👨‍🏫 Trainer Notes

### 📃 Generate a test with required questions

- [x] Open [domain=js&limit=10000&level=5-6-10&shuffle=none**&index=id**](https://nmatei.github.io/simple-quiz-app/?domain=js&limit=1000&level=5-6-10&shuffle=none&index=id)
- [x] Select specific ids then use `Copy ID's`
- [x] Open [domain=js&type=theoretical**&test=1**](https://nmatei.github.io/simple-quiz-app/?domain=js&type=theoretical&test=1)
- [x] Paste the ID's from clipboard into browser prompt
- [x] Copy current link and share it

### 🔠 Extra params

- [x] generate **Theoretical** Test [domain=js&type=theoretical&test=1](https://nmatei.github.io/simple-quiz-app/?domain=js&type=theoretical&test=1)
- [x] generate **Practical** Test [domain=js&type=practical&test=1](https://nmatei.github.io/simple-quiz-app/?domain=js&type=practical&test=1)
- [x] **shuffle** = none | all | questions | answers | both | 0  | a | q - to shuffle questions or answers
- [x] **limit** = 10 | 100 | 1000 | 10000 - to limit the number of questions
- [x] **correct** = 1 | true | 0 | false - to show correct answers
- [x] **add** = true | false - to add questions to the list
- [x] **index** = id - to show question id

## 📋 Dev Notes

### ▶ Start & Build

```sh
npm i
npm start
```

Production build:

```sh
npm run build
# or
npm run deploy
```

### How to add new questions

- [x] Add Bible questions: [domain=bible&level=1&limit=10000&add=true&index=id&correct=1](https://nmatei.github.io/simple-quiz-app/?domain=bible&level=1&limit=10000&add=true&index=id&correct=1)
- [x] **JS questions** are listed in [src/data/questions/js.js](src/data/questions/js.js)
- [x] correct **answers** are listed in [src/data/answers.json](src/data/answers.json)

### TODOs

- [ ] try webworkers to store entire content when you don't have internet
