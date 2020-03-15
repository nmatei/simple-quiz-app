# JS/HTML/CSS Quiz

Web Questions to help you understand basic web concepts (mostly javascript).

## Live Preview

- [JS Quiz](https://nmatei.github.io/simple-quiz-app/public/?domain=js)
- [Homework](https://nmatei.github.io/simple-quiz-app/public/homework.html)
- [Basic Math Quiz](https://nmatei.github.io/simple-quiz-app/public/?domain=math)

## Extra Resources

- [toptal - javascript/interview-questions](https://www.toptal.com/javascript/interview-questions)
- [js-concepts by leonardomso](https://github.com/leonardomso/33-js-concepts#1-call-stack)
- [javascript-questions by lydiahallie](https://github.com/lydiahallie/javascript-questions/blob/master/README.md)

## Features

- [x] Show 10 random tests => print test results
- [ ] Choose Test level interval
- [ ] Add questions with free text answers
- [ ] After finish Test show info notes

## Dev Notes

when add new questions follow this rules:

- questions are listed in [public/js/functions/quiz.js](public/js/functions/quiz.js).
- correct answers are listed in [public/data/answers.json](public/data/answers.json).
- use **new Date().getTime()** to add new question id.

### Helpers

- VSCode browser sync plugin

```
**/*.html|**/*.js|**/*.css
```
