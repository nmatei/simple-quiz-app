# JS/HTML/CSS Quiz

A collection of **questions** to help you understand basic web concepts (mostly javascript).

## 🎞 Apps (Domains)

- [x] **[👩‍💻 JS Quiz](https://nmatei.github.io/simple-quiz-app/?domain=js&level=5-6-10)** - test your **JS skills**!
- [x] [📗 HTML / CSS / JS **Homework**](https://nmatei.github.io/simple-quiz-app/?domain=js-homework&level=10)
- [x] [🧮 Basic Math Quiz](https://nmatei.github.io/simple-quiz-app/?domain=math&level=22)

- [x] [📖 Olimpiada Biblică 2026](https://nmatei.github.io/bible-quiz)
  - [x] [📖 Olimpiada Biblică 2025](https://nmatei.github.io/simple-quiz-app/?domain=bible&year=2025&biserica=Unu-Unu&level=1-2-3-10&limit=10)
  - [x] [📖 Olimpiada Biblică 2024](https://nmatei.github.io/simple-quiz-app/?domain=bible&year=2024&biserica=Unu-Unu&level=2-3-5&limit=10)

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
- [x] After finish Test show Statistics
- [ ] Add time limit
- [ ] Store answers in local storage in case of reload
- [ ] Theme switch
- [ ] Allow answers as text & number in combination with radio & checkbox
- [ ] (bug) Reset after change level

## 👨‍🏫 Trainer Notes

### 📃 Generate a test with required questions

- [ ] (Optional) **Custom header**
  - **right click** / **📝 Show Custom header editor**
  - then **➔ Set Custom header on URL**
- [x] Open test and **right click** / **✅ Select questions by ID's**
- [x] Select specific ID's then press `Copy ID's` (bottom of the list)
- [x] **right click** / **✅ Generate Test Link**
- [x] Paste the ID's from clipboard into browser prompt (CTRL + V)
- [x] Copy current link and share it

### 🔠 Extra params

- [x] **test** = 1 - to generate a theoretical or practical test (uses in prev chapter)
- [x] **type** = used to store the type of test (eg. theoretical or practical)
- [x] **shuffle** = none | all | questions | answers | both | 0 | a | q - to shuffle questions or answers
- [x] **limit** = 10 | 100 | 1000 | 10000 - to limit the number of questions
- [x] **correct** = 1 | true | 0 | false - to show correct answers
- [x] **add** = true | false - to add questions to the list
- [x] **index** = id - to show question id
- [x] **allowUnload** = false | true - to allow or prevent page unload
- [x] **header** = html - to show a custom header (you can use {params} as templates)
  - all parameters from URL can be used inside the header with {param})
  - extra parameters:
    - {user-name}
    - {start-time}
    - {start-date}

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

- [x] [Fork](https://github.com/nmatei/simple-quiz-app/fork) this repo and clone it (your own copy), after that you can add new questions
  - [x] commit / push changes on your own repo
  - [x] create a pull request to merge your changes into this repo
  - [x] if pull request is merged your name will be seen in [Contributors](https://github.com/nmatei/simple-quiz-app/graphs/contributors) view
- [x] Add Bible questions
  - [ ] Open [domain=bible&level=1&limit=10000&add=true&index=id&correct=1](https://nmatei.github.io/simple-quiz-app/?domain=bible&level=1&limit=10000&add=true&index=id&correct=1)
  - [ ] Click on **Pre Process** button to clean the questions
  - [ ] **Mark all correct** answers (click on the radio buttons for each question - in the right side)
  - [ ] Click on **Download new Questions** to save questions and answers
  - [x] save downloaded files in your project ([src/data/bible](src/data/bible))
- [x] Web questions
  - [x] **JS questions** are listed in [src/data/questions/js.js](src/data/questions/js.js)
  - [x] **CSS questions** are listed in [src/data/questions/css.js](src/data/questions/css.js)
  - [x] correct **answers** are listed in [src/data/answers.json](src/data/answers.json)
- [x] commit & push them
  - [x] then create a pull request

### TODOs

- [ ] try webworkers to store entire content when you don't have internet
- [ ] when select questions by ID's, show the question count (top corner - semi-transparent)
- [ ] add compact mode for printing (reduce space/border between questions) - useful for printing on paper
- [ ] hide blur count when print on paper

- [ ] "Generate Test set" with more automatic actions.
  - auto copy/paste the ID's to clipboard after select questions by ID's
  - auto generate the test link with selected ID's and copy it to clipboard
  - set the name to be "&nbsp;" (empty) if user enter only spaces
  - print the questions (save as pdf)
  - submit the test with correct answers to get correct answers
  - hide points to have the same layout as the test
  - then print the results as pdf
  - download the zipgrade.csv file with correct answers and user answers to be used in zipgrade app for grading
  - make sure to set the name back to original after generating the test (store it before change and restore it after) - to avoid confusion for the next user
