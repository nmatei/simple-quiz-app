# JS/HTML/CSS Quiz

Web Questions to help you understand basic web concepts (mostly javascript).

## Live Preview

- [JS Quiz](https://nmatei.github.io/simple-quiz-app/public/?domain=js&level=20)
- [Homework](https://nmatei.github.io/simple-quiz-app/public/homework.html)
- [Basic Math Quiz](https://nmatei.github.io/simple-quiz-app/public/?domain=math&level=27)

## Extra Resources

- [toptal - javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)
- [js-concepts by leonardomso](https://github.com/leonardomso/33-js-concepts#1-call-stack)
- [javascript-questions by lydiahallie](https://github.com/lydiahallie/javascript-questions/blob/master/README.md)

## Features

- [ ] Wellcome screen (enter or select name) + remember me
- [ ] Rembember selected options for each name
- [x] Show 10 random tests => print test results
- [ ] Choose domain
- [x] Choose level
- [x] Add questions with free text answers
- [ ] After finish Test show info notes
- [ ] Add time limit

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

### Add new questions:

- JS questions are listed in [public/js/questions/js.js](public/js/questions/js.js).
- correct answers are listed in [public/data/answers.json](public/data/answers.json).
- use **new Date().getTime()** to add new question id.
