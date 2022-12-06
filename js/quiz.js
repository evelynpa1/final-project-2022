// function slide(forward) {
//     if (forward)
// }
var currentQuestion = 0;
var currentSelected = 0;
const elements = [];
const responses = [-1,-1,-1,-1,-1,-1];
const points = [-1,-1,-1,-1,-1,-1]
//     0        1         2        3       4         5
// cinammon, keroppi, tuxedosam, kitty, kurmoni, gudetama
const quiz_sheet = {
    0 : {
        "question": "What is your favorite color?",
        "answers": ['White', 'Green', 'Blue', 'Pink', 'Black', 'Yellow'],
        "points": [0,1,2,3,4,5]
    },
    1 : {
        "question": "What is your favorite animal?",
        "answers": ['Cat', 'Dog', 'Frog', 'Penguin', 'Egg', 'Bunny'],
        "points": [3,0,1,2,5,4]
    },
    2 : {
        "question": "What is your favorite food?",
        "answers": ['Rice Balls', 'Ice cream', 'Apple Pie', 'Soy Sauce', 'Pickled Onions', 'Cinammon Rolls'],
        "points": [1,2,3,5,4,0]
    },
    3 : {
        "question": "What is your zodiac sign?",
        "answers": ['Aquarius or Pisces', 'Aries or Taurus', 'Gemini or Cancer', 'Leo or Virgo', 'Libra or Scorpio', 'Sagittarius or Capricorn'],
        "points": [1,0,3,2,4,5]
    },
    4 : {
        "question": "How would your friends describe you?",
        "answers": ['Dramatic', 'Edgy', 'Sleepy', 'Bubbly', 'Clumsy', 'Popular'],
        "points": [5,4,0,1,2,3]
    },
    5 : {
        "question": "What superpower would you want?",
        "answers": ['Pure Power', 'Shapeshifting', 'Gravity Manipulation', 'Ice/Fire Powers', 'Disintegration', 'Frog Power'],
        "points": [3,4,0,2,5,1]
    },
};
function onload() {
    elements.push(document.getElementById('question'), document.getElementById('choice_1'), document.getElementById('choice_2'), document.getElementById('choice_3'), document.getElementById('choice_4'), document.getElementById('choice_5'), document.getElementById('choice_6'), document.getElementById('prev'), document.getElementById('next'));
    disable(elements[8]);
    loadQuestion();
}
function loadQuestion() {
    currentSelected = 0;
    for (let i = 1; i < 7; i++) {
        elements[i].classList.remove('selected');
    }
    disable(elements[8]);
    
    if (responses[currentQuestion] != -1) {
        select(responses[currentQuestion]);
        enable(elements[8]);
    }; 
    enable(elements[7]);
    if (currentQuestion == 0) disable(elements[7]);
    
    elements[0].innerHTML = quiz_sheet[currentQuestion]["question"];
    for (let i = 1; i < 7; i++)
        elements[i].innerHTML = quiz_sheet[currentQuestion]["answers"][i-1];

}
function select(choice) {
    if (currentSelected == choice) {
        elements[choice].classList.remove('selected');
        responses[currentQuestion] = -1;
        points[currentQuestion] = -1;
        currentSelected = 0;
        disable(elements[8]);
        // console.log(responses);
        // console.log(points);
        return;
    }
    enable(elements[8]);
    currentSelected = choice;
    for (let i = 1; i < 7; i++) {
        elements[i].classList.remove('selected');
    }
    elements[choice].classList.add('selected');
    responses[currentQuestion] = choice;
    points[currentQuestion] = quiz_sheet[currentQuestion]["points"][choice-1];
    // console.log(responses);
    // console.log(points);

}
function enable(element) {
    element.setAttribute('tabindex', 0);
    element.classList.remove('disabled');
}
function disable(element) {
    element.removeAttribute('tabindex');
    element.classList.add('disabled');

}
function prev() {
    if (elements[7].classList.contains('disabled')) return;
    currentQuestion--;
    loadQuestion();
}
function next() {
    if (elements[8].classList.contains('disabled')) return;
    if (currentQuestion == 5) {
        endQuiz();
        return;
    }
    currentQuestion++;
    loadQuestion();

}
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        for (let i = 1; i < 7; i++) {
            if (elements[i] == document.activeElement) {
                select(i);
                return;
            }
        }
        if (elements[7] == document.activeElement) {
            prev();
            return;
        }
        if (elements[8] == document.activeElement) {
            next();
            return;
        }
    }
});
function endQuiz() {
    document.getElementById("form_wrapper").classList.add("hidden");
    document.getElementById("result_wrapper").classList.remove("hidden");
    points.sort();
    let curCount = 0;
    let prev = points[0];
    let maxCount = 0;
    let mode = points[0];
    points.forEach(n => {
        if (n == prev) {
            curCount++;
            if (curCount > maxCount) {
                maxCount = curCount;
                mode = n;
            }
        }
        else curCount = 1;
        prev = n;
    });
    let character = ["Cinnamon Roll", "Keroppi", "Tuxedosam", "Hello Kitty", "Kuromi", "Gudetama"];
    let className = ["cina", "kero", "tuxe", "kitty", "kuro", "gude"];

    document.getElementById("result_back").classList.add(className[mode]);
    document.getElementById("result").innerHTML = "You got " + character[mode] + "!";
    // console.log(mode);
}