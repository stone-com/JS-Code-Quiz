// declare variables for html elements

const startBtn = document.querySelector('#start');
const rulesContainer = document.querySelector('.rules-box');
const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .continue");
const quizContainer = document.querySelector(".quiz-container");
const choiceList = document.querySelector(".choice-list");
const resultContainer = document.querySelector(".result_container");
const questionText = document.querySelector('.question-text')
// const time_line = document.querySelector("header .time_line");
const timeLabel = document.querySelector('.timer-label');
const timeSeconds = document.querySelector('.time-seconds');

let timeLeft = 60;
let score = 0;
let counter;
let questionCount = 0;
let questionNumber = 1;

// if start button is clicked, add active class and show rules.
startBtn.addEventListener('click', function() {
    rulesContainer.classList.add('active');
});
// if the exit button on rule page is clicked, remove active class and hide rules.
exitBtn.addEventListener('click', function(){
    rulesContainer.classList.remove('active');
})

//if they click continue, it will hide rules and show game using active class.

continueBtn.addEventListener('click', function() {
    rulesContainer.classList.remove('active');
    quizContainer.classList.add('active');
    //calls functions to display questions and start timer
    displayQuestions(0);
    // questionCounter(1);
    // startTimer(60);
});

//function to get quiz questions from array and display them on html page

function displayQuestions(i) {
    const questionText = document.querySelector('.question-text');

    //make new variables containing new html elements for the questions and choices. getting value from array index.
    let questionNew = '<span>'+ questions[i].title +'</span>';
    let choicesNew = '<div class="choice"><span>'+ questions[i].choices[0] +'</span></div>'
    + '<div class="choice"><span>'+ questions[i].choices[1] +'</span></div>'
    + '<div class="choice"><span>'+ questions[i].choices[2] +'</span></div>'
    + '<div class="choice"><span>'+ questions[i].choices[3] +'</span></div>'

    // change innerHTML of question text and choice list to new variables value

    questionText.innerHTML = questionNew;
    choiceList.innerHTML = choicesNew;

    let choice = choiceList.querySelectorAll('.choice');
    //loop through all choices and set onclick attribute to call answerselected function (i hope this works)
    for (i=0; i < choice.length; i++) {
        choice[i].setAttribute("onclick", "answerSelected(this)");
    }
}

//function to handle user picking a choice.

function answerSelected(x){
    let correctAnswer = questions[questionCount].answer;
    let userAnswer = x.textContent;

    let allChoices = choiceList.children.length;

    if(userAnswer == correctAnswer) {
        score++; //add 1 to score if they get the right answer
        x.classList.add('right-answer'); //add right answer class to change color to green
        console.log('Correct answer. You have gotten ' + score + 'right answers so far.');
    } else {
        x.classList.add('wrong-answer'); // add wrong answer class to change color to red
        console.log('WRONG!!!');

        //loop through choice list and find right answer, then color it green.
    }
}
