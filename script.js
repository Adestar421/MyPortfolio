//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartbutton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "which planet is known as red planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "jupiter", correct: false },
            { text: "Uranus", correct: false },
        ],
    },
    {
        question: "What is 5*6?",
        answers: [
            { text: "25", correct: false },
            { text: "30", correct: true },
            { text: "35", correct: false },
            { text: "40", correct: false },
        ],
    },
    {
        question: "How many sides does a triangle have?",
        answers: [
            { text: "3", correct: true },
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "6", correct: false },
        ],
    },
    {
        question: "Which continent is the largest by land area?",
        answers: [
            { text: "Africa", correct: false },
            { text: "North America", correct: false },
            { text: "Asia", correct: true },
            { text: "Antartica", correct: false }
        ],
    },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartbutton.addEventListener("click", restartQuiz);

function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    //reset state
    answersDisabled = false;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"
    
    questionText.textContent = currentQuestion.question

    // todo: explain this in a second
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text 
        button.classList.add("answer-btn")

        // what is dataset? it's a property of the button element that allows you to store custom data
        button.dataset.correct = answer.correct

        button.addEventListener("click",selectAnswer)

        answersContainer.appendChild(button)
    });
}

function selectAnswer(event) {
    // optimization check
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // todo: explain this in a second
    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage ===100) {
resultMessage.textContent = "Excellent! You got a perfect score!";
} else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Not bad! Keep practicing!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "You can do better! Keep learning!";
    } else {
        resultMessage.textContent = "Keep trying! You'll get there!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}