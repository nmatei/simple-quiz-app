# JS/HTML/CSS Quiz

Web Questions to help you understand basic web concepts (mostly javascript).

## Live Preview

- [JS Quiz](https://nmatei.github.io/simple-quiz-app/public/?domain=js&level=5)
- [Homework](https://nmatei.github.io/simple-quiz-app/public/?domain=js-homework&level=15)
- [Basic Math Quiz](https://nmatei.github.io/simple-quiz-app/public/?domain=math&level=22)

## Useful Resources

- [Useful Examples of map, reduce and filter](https://link.medium.com/XezVbaWgNT)
- [toptal - javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)
- [js-concepts by leonardomso](https://github.com/leonardomso/33-js-concepts#1-call-stack)
- [javascript-questions by lydiahallie](https://github.com/lydiahallie/javascript-questions/blob/master/README.md)
- [JS Exercises](https://ydkjs-exercises.com/)
- [Arrays: Some(), Every(), and forEach()](https://levelup.gitconnected.com/javascript-array-some-vs-every-vs-foreach-knowledge-scoops-81dfe43369c6)
- [Simplify your JavaScript – Use .some() and .find()](https://medium.com/poka-techblog/simplify-your-javascript-use-some-and-find-f9fb9826ddfd)

## Features

- [ ] Welcome screen (enter or select name) + remember me
- [ ] Remember selected options for each name
- [x] Show 10 random tests => print test results
- [ ] Choose domain
- [x] Choose level
- [x] Add questions with free text answers
- [ ] After finish Test show info notes
- [ ] Add time limit
- [ ] Store answers in local storage in case of reload

## Dev Notes

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

- JS questions are listed in [public/js/questions/js.js](public/js/questions/js.js)
- correct answers are listed in [public/data/answers.json](public/data/answers.json)
- use **new Date().getTime()** to add new question id

## Trainer Notes

The test can be opened only within **3 minutes** after was generated

To generate a test with selected questions use one of the following links,
and input question ids (separated by commas)

### Theoretical Test

[domain=js&type=theoretical&test=1](https://nmatei.github.io/simple-quiz-app/public/?domain=js&type=theoretical&test=1)

## Practical Test

[domain=js&type=practical&test=1](https://nmatei.github.io/simple-quiz-app/public/?domain=js&type=practical&test=1)

### Extra params

Extract more questions
[domain=js&limit=100&shuffle=false](https://nmatei.github.io/simple-quiz-app/public/?domain=js&limit=100&shuffle=false)
