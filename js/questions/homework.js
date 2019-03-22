$.ajax(API_URL.MOCKS).done(helperData => {
    console.debug({helperData});

    printHelperData([{
        helperData,
        text: "Use this collection for any of the following exercises"
    }]);

    printQ([
        {
            fn: q1(helperData),
            id: 1,
            text: "Create a function that returns only the firstName of each person."
        },
        {
            fn: q2(helperData),
            text: "Create a function that calculates the average female salary. Log the result in the console."
        },
        {
            fn: q3(helperData),
            text: "As always, create a function that return 2 arrays, one of male and the other of female employees."
        },
        {
            fn: q4(helperData),
            text: "Bonus! Convert the employee array into an object. Each key of that object should be the employee lastName."
        }
    ]);

    // setTimeout(submitTest, 500);
    applyCustomTheme();
});

