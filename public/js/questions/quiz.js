let questions = ALL_QUESTIONS.filter(q => q.level <= 5); //ALL_QUESTIONS.slice(0, 12);

questions.shuffle();

questions = questions.slice(0, 10);

questions.sort((a, b) => a.level - b.level);

printQ(questions);

applyCustomTheme();
