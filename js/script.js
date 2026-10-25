

// ----- Variables  -----
let questions = [];      // the questions we get from the API
let currentIndex = 0;    // which question we are on 
let userAnswers = [];    // the option number the user picked for each question

const letters = ['A', 'B', 'C', 'D'];

// -----HTML elements -----
const selectionScreen = document.getElementById('selection-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');

const selectionForm = document.getElementById('selection-form');
const startBtn = document.getElementById('start-btn');
const loadingText = document.getElementById('loading-text');
const errorText = document.getElementById('error-text');

const questionCount = document.getElementById('question-count');
const questionMeta = document.getElementById('question-meta');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const selectionStatus = document.getElementById('selection-status');

const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');

const scoreText = document.getElementById('score-text');
const reviewContainer = document.getElementById('review-container');


function decodeText(text) {
    return decodeURIComponent(text);
}

// ----- shuffle questions-----
function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}

// ----- show on screen -----
function showScreen(screen) {
    selectionScreen.classList.remove('active');
    questionScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    screen.classList.add('active');
}

// ----- get questions -----
async function getQuestions(amount, category, difficulty, type) {
    // Build the web address with the user's choices
    let url = 'https://opentdb.com/api.php?amount=' + amount + '&encode=url3986';
    if (category !== '') url += '&category=' + category;
    if (difficulty !== '') url += '&difficulty=' + difficulty;
    if (type !== '') url += '&type=' + type;

    const response = await fetch(url);
    const data = await response.json();

    // response_code 0 means everything worked
    if (data.response_code === 1) {
        throw new Error('Not enough questions for those choices. Try fewer questions or a different category.');
    }
    if (data.response_code === 5) {
        throw new Error('Too many requests. Wait 5 seconds and try again.');
    }
    if (data.response_code !== 0) {
        throw new Error('Something went wrong. Please try again.');
    }

    // Turn the API data into a simpler format that we can use
    return data.results.map(function (item) {
        const correct = decodeText(item.correct_answer);
        let options = [];

        if (item.type === 'boolean') {
            options = ['True', 'False'];
        } else {
            const wrong = item.incorrect_answers.map(decodeText);
            options = shuffle([correct, ...wrong]);
        }

        return {
            question: decodeText(item.question),
            category: decodeText(item.category),
            difficulty: decodeText(item.difficulty),
            options: options,
            correctIndex: options.indexOf(correct)
        };
    });
}

// ----- show current question -----
function showQuestion() {
    const q = questions[currentIndex];

    questionCount.textContent = 'Question ' + (currentIndex + 1) + ' of ' + questions.length;
    questionMeta.textContent = q.category + ' (' + q.difficulty + ')';
    questionText.textContent = q.question;
    selectionStatus.textContent = 'Pick an answer to continue.';
    optionsContainer.innerHTML = '';

    // Make a button for each answer
    q.options.forEach(function (optionText, index) {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = letters[index] + '.  ' + optionText;
        button.addEventListener('click', function () {
            chooseOption(index, button);
        });
        optionsContainer.appendChild(button);
    });

    // Show "Next" normally, but "Submit quiz" on the last question
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    if (currentIndex === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

// ----- user clicks answer -----
function chooseOption(index, button) {
    // Remove the highlight from every option first
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(function (opt) {
        opt.classList.remove('selected');
    });

    // Highlight the one that was clicked
    button.classList.add('selected');
    userAnswers[currentIndex] = index;

    selectionStatus.textContent = 'You chose ' + letters[index] + ': ' + questions[currentIndex].options[index];
    nextBtn.disabled = false;
    submitBtn.disabled = false;
}

// ----- next question -----
function goNext() {
    currentIndex++;
    showQuestion();
}

// -----show results-----
function showResults() {
    // Count how many answers were correct
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].correctIndex) {
            score++;
        }
    }

    const percent = Math.round((score / questions.length) * 100);
    scoreText.textContent = 'You scored ' + score + ' out of ' + questions.length + ' (' + percent + '%)';

    // Build the review list
    reviewContainer.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const isCorrect = userAnswers[i] === q.correctIndex;

        const item = document.createElement('div');
        item.className = 'review-item ' + (isCorrect ? 'correct' : 'incorrect');

        const title = document.createElement('p');
        title.textContent = (i + 1) + '. ' + q.question;

        const yourAnswer = document.createElement('p');
        yourAnswer.textContent = 'Your answer: ' + q.options[userAnswers[i]];

        item.appendChild(title);
        item.appendChild(yourAnswer);

        // Only show the correct answer if the user got it wrong
        if (!isCorrect) {
            const correctAnswer = document.createElement('p');
            correctAnswer.textContent = 'Correct answer: ' + q.options[q.correctIndex];
            item.appendChild(correctAnswer);
        }

        const info = document.createElement('p');
        info.className = 'explanation';
        info.textContent = q.category + ' (' + q.difficulty + ')';
        item.appendChild(info);

        reviewContainer.appendChild(item);
    }

    showScreen(resultsScreen);
}

// ----- start quiz -----
async function startQuiz(event) {
    event.preventDefault(); 

    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;

    loadingText.style.display = 'block';
    errorText.style.display = 'none';
    startBtn.disabled = true;

    try {
        questions = await getQuestions(amount, category, difficulty, type);
        currentIndex = 0;
        userAnswers = [];
        showScreen(questionScreen);
        showQuestion();
    } catch (error) {
        errorText.textContent = error.message;
        errorText.style.display = 'block';
    }

    loadingText.style.display = 'none';
    startBtn.disabled = false;
}

// ----- go back to the start    -----
function restartQuiz() {
    selectionForm.reset();
    errorText.style.display = 'none';
    showScreen(selectionScreen);
}

// ----- connect the buttons to the functions -----
selectionForm.addEventListener('submit', startQuiz);
nextBtn.addEventListener('click', goNext);
submitBtn.addEventListener('click', showResults);
restartBtn.addEventListener('click', restartQuiz);