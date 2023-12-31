    //import quiz questions
import { questions } from "./questions.js";

    // declare variables used in the quiz logic
const start = "Start";
const next = "Next";
const numOfQuestions = questions.length;
let questionNumber;
let questionIndex;
let score;

    // selecting html elements used in the quiz logic
const header = document.getElementById("header");
const cdmIntro = document.getElementById("cdm-intro");
const cdmQuizContainer = document.getElementById("cdm-quiz-container");
const body = document.getElementById("body");
const startButton = document.getElementById("start-btn");
const quizQuestion = document.getElementById("cdm-question");
const quizAnswers = document.getElementById("cdm-answers");
const answerButtons = document.getElementsByClassName("btn");
const quizNextButton = document.getElementById("next-btn");
const scoreWindow = document.getElementById("score");

    // set event listeners
quizNextButton.addEventListener("click", () => {
    buttonsControl(next);
});
startButton.addEventListener("click", startQuiz);

    // Quiz container text content reset
function resetQuestionContainer() {
    quizQuestion.innerHTML = "";
    quizAnswers.innerHTML = "";
}

    // Start quiz 
function startQuiz() {
    questionIndex = 0;
    score = 0;
    questionNumber = questionIndex + 1;
    showScore(score);
    quizNextButton.style.display = "none";
    buttonsControl(start);
}

    //START and NEXT button controls
function buttonsControl(type) {
    if (type == start) {
        header.style.display = "none";
        cdmIntro.style.display = "none";
        showQuestion();
        cdmQuizContainer.style.display = "block";
        body.classList.add("body-image");
    } else {
        if (questionIndex < (numOfQuestions)) {
            showQuestion();
        } else {
            showResult();
        }
    }
}
    // function generates questions taken from the questions list
function showQuestion() {
    quizNextButton.style.display = "none";
    resetQuestionContainer();
        // declare a constant with assigned value from the questions array (imported from module)
    const currentQuestion = questions[questionIndex].question;
        // create a template for the html question element
    const questionTemplate = `${questionNumber}. ${currentQuestion}`;
        // update html question element with current question
    quizQuestion.innerHTML = questionTemplate;
    showAnswers();
}

    // gets questions arrays (imported from module) 
function showAnswers() {
    const currentAnswer = questions[questionIndex].answers;
    // create possible answers for the current question
    for (let i = 0; i < currentAnswer.length; i++) {
        let answer = currentAnswer[i].answer;
        let isCorrect = currentAnswer[i].correct;
        const answerTemplate = `
            <button correct="${isCorrect}" class="btn">${answer}</button>
        `;
        quizAnswers.innerHTML += answerTemplate;
    }
    applyEventListener();
}

    // Answer buttons event listeners
function applyEventListener() {
    const answerButtons = document.getElementsByClassName("btn");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener("click", answerBtnControl);
    }
}

    // Provides user selected answer button response
function answerBtnControl(event) {
    const selectedBtn = event.target;
    checkAnswer(selectedBtn);
    disableButton();
    questionIndex += 1;
    questionNumber += 1;
    quizNextButton.style.display = "block";
}

    //disable answer buttons after user selecting the answer
function disableButton() {
        // disable answer buttons 
    const array = Array.prototype.slice.call(answerButtons);
    array.forEach(button => { button.disabled = true; });
    
}
    // Checks selected answer
function checkAnswer(selectedBtn) {
    const isCorrectAnswer = selectedBtn.getAttribute("correct") === "true";

    if (isCorrectAnswer) {
        selectedBtn.classList.add("correct");
        score += 1;
        showScore(score);
    } else {
        selectedBtn.classList.add("incorrect");
        quizAnswers.querySelector("[correct='true']").classList.add("correct");
    }
}

    // Display score function
function showScore(score) {
    scoreWindow.innerHTML = `
        Score: ${score} of ${numOfQuestions}
    `;
}
    // final feedback on the test result
function scoreResult(score, numOfQuestions) {
    let resultFeedback = "";
    const results = Math.round((score / numOfQuestions) * 100);
    if (results >= 90) {
        resultFeedback = "Congratulations on your outstanding achievement! The achieved score is a testament to your dedication and knowledge. Keep up the excellent work!";
    } else if (results >= 70 && results < 90) {
        resultFeedback = "Congratulations on completing the quiz! You're doing great, and your effort is commendable. To improve even further, consider reviewing the material in the near future.";
    } else {
        resultFeedback = "Great job on completing the quiz! It's the first step to excelling yourself. As you scored less than 70%, you should revisit the material as soon as possible to reinforce your regulations understanding. Keep up the good work!";
    }
    return resultFeedback;
}

    // show results function at the end of the Quiz
function showResult() {
        // hide elements that are not required on the feedback window
    quizNextButton.style.display = "none";
    quizQuestion.style.display = "none";

    resetQuestionContainer();
    let addFeedback = scoreResult(score, numOfQuestions);
    quizAnswers.innerHTML = "Quiz completed. You scored " + score + " out of " + numOfQuestions + ".\n" + addFeedback;
}








