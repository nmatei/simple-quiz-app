function q1() {
    function doSomething(value) {
        console.info('the value is: ' + value);
        if (!value) {
            console.info('you did not provide the value');
        }
    }

    doSomething();
}

function q2() {
    function add(q1, q2, q3, q4) {
        console.info('sum is: ' + q1 + (q2 + q3) + q4++);
        console.info('last number is:' + q4);
    }

    add(2, 6, 3, 4);
}

function q3() {
    var nr = 4;
    var str = "4";
    if (nr == str)
        console.info("Equals");
    else
        console.info("Not Equals");
}

function q4() {
    var nr = 4;
    var str = "4";
    if (nr === str)
        console.info("Equals");
    else
        console.info("Not Equals");
}

function q5() {
// notice a space in the beginning of the string
    var string = " String";
    if ("String" != string.trim())
        console.info("case1");
    else
        console.info("case2");
}

function q6() {
    try {
        var firstname = "Tibi";

        var person = {
            firstName: 'Andrei',
            lastName: 'Vasilica',
            call: function () {
                console.log('My name is: ' + firstName + lastName);
            }
        }

        person.call();
    } catch (e) {
        console.error(e);
    }
}

function q7() {
    function getPerson(age) {
        return {
            age: age,
            friends: age * 3
        }
    }

    var age = 5;
    var friends = 25;
    console.info(getPerson(age).friends);
}

function q8() {
    class Figura {
        constructor(options) {
            this.nume = options.nume;
            this.laturi = options.laturi;
        }

        info() {
            return this.nume + ' - ' + this.laturi;
        }
    }

    var p = new Figura({
        nume: 'Patrat',
        laturi: 4
    });
    console.info(p.info());
    console.info(p.info() == this.nume + ' - ' + this.laturi);
    console.info(this.nume + ' - ' + this.laturi);
}

function q9() {
    class Person {
        constructor(name) {
            this.firstName = name;
        }

        sayHello() {
            console.log("Hello: " + this.firstName)
        }
    }

    var Tibi = new Person('Tibi');

    var person = {
        firstName: 'Ionica'
    };

    Tibi.sayHello.call(person);
}

function q10() {
    var numbers = [8, 2, 3, 7, 5, 1];
    numbers[1] = 6;
    numbers.sort();
    numbers.push(4);
    numbers.forEach(function (number) {
        if (number % 2 == 0) {
            console.info(number);
        }
    });
}

function q11() {
    document.body.innerHTML += [
        '<article id="q11result">',
            '<div id="x">X</div><div name="y">Y</div>',
        '</article>'
    ].join('');

    var e1 = document.getElementById('x');
    e1.innerHTML = 'A';
    var e2 = document.getElementsByName('y');
    e2.innerHTML = 'B';

    console.info(document.getElementById('q11result').innerText);
}

function q12() {
    document.body.innerHTML += [
        '<article class="html">',
        '   <div class="cls1">Adrian</div>',
        '   <p id="any">Bichir</p>',
        '   <span class="blue">Cristi</span>',
        '   <ul id="all">',
        '       <li>David</li>',
        '       <li class="favorite">Elena</li>',
        '       <li>Florin</li>',
        '   </ul>',
        '</article>',
        '<style>',
        '   #cls1, #any, #all li {',
        '      color: red;',
        '   }',
        '   #all .favorite {',
        '      color: blue;',
        '   }',
        '</style>'
    ].join("\n");
}

function q13() {
    class Ar {
        add(i, j) {
            return i + j;
        }
    }

    class AQuestion extends Ar {
        constructor() {
            super();
            var s = 9;
            console.info(this.add(s, 6));
        }
    }

    new AQuestion();
}