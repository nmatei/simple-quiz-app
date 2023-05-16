# JS/HTML/CSS Quiz

Web Questions to help you understand basic web concepts (mostly javascript).

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [🎞 Live Preview](#-live-preview)
- [📚 Useful Resources](#-useful-resources)
  - [📚 Courses](#-courses)
  - [🎥 Conferences](#-conferences)
- [💠 Features](#-features)
- [📋 Dev Notes](#-dev-notes)
  - [Start & Build](#start--build)
  - [How to add new questions](#how-to-add-new-questions)
- [📋 Trainer Notes](#-trainer-notes)
  - [Theoretical Test](#theoretical-test)
  - [Practical Test](#practical-test)
  - [Extra params](#extra-params)
  - [TODOs](#todos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 🎞 Live Preview

- [JS Quiz](https://nmatei.github.io/simple-quiz-app/?domain=js&level=5)
- [HTML/CSS/JS Homework](https://nmatei.github.io/simple-quiz-app/?domain=js-homework&level=10)
- [Basic Math Quiz](https://nmatei.github.io/simple-quiz-app/?domain=math&level=22)

## 📚 Useful Resources

- [Useful Examples of map, reduce and filter](https://link.medium.com/XezVbaWgNT)
- [toptal - javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)
- [js-concepts by leonardomso](https://github.com/leonardomso/33-js-concepts#1-call-stack)
- [javascript-questions by lydiahallie](https://github.com/lydiahallie/javascript-questions/blob/master/README.md)
- [JS Exercises](https://ydkjs-exercises.com/)
- [Arrays: Some(), Every(), and forEach()](https://levelup.gitconnected.com/javascript-array-some-vs-every-vs-foreach-knowledge-scoops-81dfe43369c6)
- [Simplify your JavaScript – Use .some() and .find()](https://medium.com/poka-techblog/simplify-your-javascript-use-some-and-find-f9fb9826ddfd)

### 📚 Courses

- Udemy [Stephen Grider - ES6 Javascript: The Complete Developer's Guide](https://www.udemy.com/course/javascript-es6-tutorial/#overview)
- [justjavascript.com](https://justjavascript.com/)

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

## 📋 Dev Notes

### Start & Build

```sh
npm i
npm run start
```

Production build:

```sh
npm run build
```

### How to add new questions

- JS questions are listed in [src/data/questions/js.js](src/data/questions/js.js)
- correct answers are listed in [src/data/answers.json](src/data/answers.json)

## 📋 Trainer Notes

The test can be opened only within **5 minutes** after was generated (configurable)

To generate a test with selected questions use one of the following links:

- Select specific ids then use `Copy ID's` [domain=js&limit=1000&shuffle=false&index=id&level=0](https://nmatei.github.io/simple-quiz-app/?domain=js&limit=1000&shuffle=false&index=id&level=0)

### Theoretical Test

[domain=js&type=theoretical&test=1](https://nmatei.github.io/simple-quiz-app/?domain=js&type=theoretical&test=1)

### Practical Test

[domain=js&type=practical&test=1](https://nmatei.github.io/simple-quiz-app/?domain=js&type=practical&test=1)

### Extra params

Extract more questions

- [x] Limit by level (print more tests) [domain=js&limit=1000&shuffle=false](https://nmatei.github.io/simple-quiz-app/?domain=js&limit=100&shuffle=false)
- [x] Limit no level (print more tests) [domain=js&limit=1000&shuffle=false&level=0](https://nmatei.github.io/simple-quiz-app/?domain=js&limit=100&shuffle=false&level=0)

### TODOs

- [ ] add more html & css questions (+ level)
- [ ] try webworkers to store entire content when you don't have internet
