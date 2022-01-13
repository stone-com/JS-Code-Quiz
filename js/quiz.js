// declare variables for html elements

const startBtn = document.querySelector('#start');
const rulesContainer = document.querySelector('.rules-box');
const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .continue");
const quizContainer = document.querySelector(".quiz-container");
const choiceList = document.querySelector(".choice-list");
const resultContainer = document.querySelector(".result-container");
const questionText = document.querySelector('.question-text')
// const time_line = document.querySelector("header .time_line");
const timeLabel = document.querySelector('.timer-label');
const timeSeconds = document.querySelector('.time-seconds');
const bottomCounter = document.querySelector('.question-total');

let timeLeft = 60;
let score = 0;
let questionCount = 0;
let questionNumber = 1;
let counter; //used for timer
let penalty = false; //used to penalize time for a wrong answer


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
    updateCounter(1);
    startTimer(60);
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
    for (let i=0; i < choice.length; i++) {
        choice[i].setAttribute("onclick", "answerSelected(this)");
    }
}

//function to handle user picking a choice.

function answerSelected(x){
    let correctAnswer = questions[questionCount].answer;
    let userAnswer = x.textContent;

    let allChoices = choiceList.children;

    if(userAnswer == correctAnswer) {
        score++; //add 1 to score if they get the right answer
        x.classList.add('right-answer'); //add right answer class to change color to green
        console.log(score);
    } else {
        x.classList.add('wrong-answer'); // add wrong answer class to change color to red
        console.log('WRONG!!!');
        //set penalty to true for 1 second, timer will catch it and subtract 5 sec (i hope)
        penalty = true;
        setTimeout(function() {
            penalty =  false;
        }, 1000);
        

        //loop through choice list and find right answer, then color it green.

        for(let i=0; i < allChoices.length; i++ ){
            // checking if index matches correct answer
            if(choiceList.children[i].textContent == correctAnswer) {
                //if it matches, set color to green
                choiceList.children[i].classList.add('right-answer');
            };
        };
    };
    //wait 1 second before showing next question
    //give user time to see correct answer
    setTimeout(showNext, 1000);
}


// function to show the next question
function showNext() {
    // checking to see if we are at the end of the array or not
    if (questionCount < questions.length -1 ) {
        questionCount++;
        questionNumber++;
        //calling displayquestions function passing in question count value
        displayQuestions(questionCount);
        updateCounter(questionNumber);
    } else {
       setTimeout(showResults(), 1000);
    }
};

//function to update question counter at bottom of quiz

function updateCounter(i) {
    // create variable with html tags and js values
    let counterValue = '<span><p>Question '+ i +' of </p> <p>'+ questions.length +'</p></span>';
    //display on page
    bottomCounter.innerHTML = counterValue;
}


//function to start timer

function startTimer(time) {
    counter = setInterval(timer, 1000); //calls timer function at 1 second intervals
    function timer() {
        //change timer value in DOM 
        timeSeconds.textContent = time;
        time--; //decriment by 1 every second

        //checking if penalty is true, subtracting 5 seconds if it is.
        if(penalty) {
            time = time - 5;
        }

        if(time< 0) { //if time is less than 0, stop counter
            clearInterval(counter);
            //loop through, find correct answer, set to green color

            let correctAnswer = questions[questionCount].answer;

            for(let i = 0; i < choiceList.children.length; i++) {
                if(choiceList.children[i].textContent == correctAnswer) {
                    choiceList.children[i].classList.add('right-answer');
                };
            };

        };
    };
};

//function to show results at the end

function showResults() {
    quizContainer.classList.remove('active'); //hide quiz container
    resultContainer.classList.add('active');//show results
    // create variable referencing score text div in dom
    const scoreText = document.querySelector('.score-text');

    // check user score, and display different message 
    if (score === 5) {
        let scoreResult = '<span><p>Well done!! You got ' + score + ' out of ' + questions.length + ' correctly! </p> <span>';
        scoreText.innerHTML = scoreResult;
    } else if (score >= 3) {
        let scoreResult = '<span><p>Pretty good! You got ' + score + ' out of ' + questions.length + ' correctly! </p> <span>';
        scoreText.innerHTML = scoreResult;
    } else if (score >= 1) {
        let scoreResult = '<span><p>Not bad, but you could use some practice! You got ' + score + ' out of ' + questions.length + ' correctly! </p> <span>';
        scoreText.innerHTML = scoreResult;
    } else {
        let scoreResult = '<span><p>Not good. You need to study! You got ' + score + ' out of ' + questions.length + ' correctly! </p> <span>';
        scoreText.innerHTML = scoreResult;

    }
}