/**
 * Trivia Quiz App
 * My simple quiz app using the Open Trivia Database API
 */

// All the DOM elements I need to work with
// Settings section elements
const settingsSection = document.getElementById('settings-section');
const howtoSection = document.getElementById('howto-section');
const startQuizBtn = document.getElementById('start-quiz');
const howToPlayBtn = document.getElementById('how-to-play');
const backToHomeBtn = document.getElementById('back-to-home');
const questionCountSelect = document.getElementById('questionCount');
const difficultySelect = document.getElementById('difficulty');
const categorySelect = document.getElementById('category');

// Quiz section elements
const loadingSection = document.getElementById('loading-section');
const quizSection = document.getElementById('quiz-section');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const currentScoreSpan = document.getElementById('current-score');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const correctAnswerText = document.getElementById('correct-answer-text');
const nextBtn = document.getElementById('next-btn');

// Results section elements
const resultsSection = document.getElementById('results-section');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const scorePercentageSpan = document.getElementById('score-percentage');
const progressBar = document.getElementById('progress-bar');
const congratsMessage = document.getElementById('congrats-message');
const questionsReview = document.getElementById('questions-review');
const restartQuizBtn = document.getElementById('restart-quiz');

// API URLs
const API_BASE_URL = 'https://opentdb.com/api.php';
const CATEGORIES_URL = 'https://opentdb.com/api_category.php';

// Variables to track quiz state
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let currentScore = 0;

// Setup the app when the page loads
function init() {
    // Get the categories for the dropdown
    fetchCategories();
    
    // Setup all the button clicks
    startQuizBtn.addEventListener('click', startQuiz);
    howToPlayBtn.addEventListener('click', showHowToPlay);
    backToHomeBtn.addEventListener('click', showSettings);
    nextBtn.addEventListener('click', handleNextQuestion);
    restartQuizBtn.addEventListener('click', resetQuiz);
}

// Get categories from the API
async function fetchCategories() {
    try {
        // Fetch the categories data
        const response = await fetch(CATEGORIES_URL);
        const data = await response.json();
        
        // Clear the dropdown (except for the default option)
        while (categorySelect.options.length > 1) {
            categorySelect.remove(1);
        }
        
        // Add each category to the dropdown
        data.trivia_categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error getting categories:', error);
        alert('Failed to load categories. Please refresh the page.');
    }
}

// Functions to show/hide different sections
function showSettings() {
    settingsSection.classList.remove('hidden');
    howtoSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
}

function showHowToPlay() {
    settingsSection.classList.add('hidden');
    howtoSection.classList.remove('hidden');
    loadingSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
}

function showLoading() {
    settingsSection.classList.add('hidden');
    howtoSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
}

function showQuiz() {
    settingsSection.classList.add('hidden');
    howtoSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
}

function showResults() {
    settingsSection.classList.add('hidden');
    howtoSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

// Start the quiz
async function startQuiz() {
    // Reset everything
    resetQuizState();
    
    // Show loading spinner
    showLoading();
    
    // Get the settings from the dropdowns
    const amount = questionCountSelect.value;
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;
    
    // Build the API URL with the settings
    let url = `${API_BASE_URL}?amount=${amount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    
    try {
        // Get questions from the API
        const response = await fetch(url);
        const data = await response.json();
        
        // Check if we got questions
        if (data.response_code === 0 && data.results.length > 0) {
            // Save the questions
            questions = data.results;
            
            // Update the UI
            totalQuestionsSpan.textContent = questions.length;
            maxScoreSpan.textContent = questions.length;
            
            // Show the first question
            showQuiz();
            showQuestion();
        } else {
            // Handle API error
            throw new Error('Failed to load questions or no questions available.');
        }
    } catch (error) {
        console.error('Error starting quiz:', error);
        alert('Failed to load questions. Please try again or select different options.');
        showSettings();
    }
}

// Reset the quiz state
function resetQuizState() {
    currentQuestionIndex = 0;
    userAnswers = [];
    currentScore = 0;
    questions = [];
    updateScoreDisplay();
}

// Update the score on screen
function updateScoreDisplay() {
    currentScoreSpan.textContent = currentScore;
}

// Show the current question
function showQuestion() {
    // Reset feedback
    feedbackContainer.classList.add('hidden');
    feedbackText.textContent = '';
    correctAnswerText.textContent = '';
    correctAnswerText.classList.add('hidden');
    
    // Get the current question
    const question = questions[currentQuestionIndex];
    
    // Update question number
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Update question text
    questionText.innerHTML = decodeHTML(question.question);
    
    // Get answers
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    
    // Mix all answers together and shuffle them
    const allAnswers = [...incorrectAnswers, correctAnswer];
    shuffleArray(allAnswers);
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create answer buttons
    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.innerHTML = decodeHTML(answer);
        button.dataset.answer = answer;
        button.addEventListener('click', () => selectAnswer(button, answer, correctAnswer));
        answersContainer.appendChild(button);
    });
    
    // Disable next button until an answer is selected
    nextBtn.disabled = true;
}

// Handle when user selects an answer
function selectAnswer(selectedButton, selectedAnswer, correctAnswer) {
    // Don't allow selecting after already chosen
    if (!nextBtn.disabled) return;
    
    // Get all answer buttons
    const allButtons = answersContainer.querySelectorAll('.answer-option');
    
    // Disable all buttons
    allButtons.forEach(button => {
        button.disabled = true;
        
        // Add correct/incorrect styling
        if (button.dataset.answer === correctAnswer) {
            button.classList.add('correct');
        } else if (button === selectedButton) {
            button.classList.add('selected');
            if (selectedAnswer !== correctAnswer) {
                button.classList.add('incorrect');
            }
        }
    });
    
    // Show feedback
    if (selectedAnswer === correctAnswer) {
        // Correct answer
        feedbackContainer.classList.remove('hidden', 'incorrect');
        feedbackContainer.classList.add('correct');
        feedbackText.textContent = 'Correct! Good job!';
        currentScore++;
        updateScoreDisplay();
    } else {
        // Incorrect answer
        feedbackContainer.classList.remove('hidden', 'correct');
        feedbackContainer.classList.add('incorrect');
        feedbackText.textContent = 'Sorry, that\'s incorrect.';
        correctAnswerText.textContent = `Correct answer: ${decodeHTML(correctAnswer)}`;
        correctAnswerText.classList.remove('hidden');
    }
    
    // Save user answer
    userAnswers[currentQuestionIndex] = {
        question: questions[currentQuestionIndex].question,
        userAnswer: selectedAnswer,
        correctAnswer: correctAnswer,
        isCorrect: selectedAnswer === correctAnswer
    };
    
    // Enable next button
    nextBtn.disabled = false;
}

// Handle next question button click
function handleNextQuestion() {
    currentQuestionIndex++;
    
    // Check if we've reached the end of the quiz
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // If the quiz is complete, show results
        displayResults();
        showResults();
    }
}

// Display quiz results
function displayResults() {
    // Update final score
    finalScoreSpan.textContent = currentScore;
    
    // Calculate percentage
    const percentage = Math.round((currentScore / questions.length) * 100);
    scorePercentageSpan.textContent = `${percentage}%`;
    
    // Update progress bar
    progressBar.style.width = `${percentage}%`;
    
    // Display congratulations message
    if (percentage === 100) {
        congratsMessage.textContent = 'Perfect score! You\'re amazing!';
    } else if (percentage >= 80) {
        congratsMessage.textContent = 'Great job! You know your stuff!';
    } else if (percentage >= 60) {
        congratsMessage.textContent = 'Good work! You did well!';
    } else if (percentage >= 40) {
        congratsMessage.textContent = 'Not bad! Keep learning!';
    } else {
        congratsMessage.textContent = 'Keep practicing, you\'ll get better!';
    }
    
    // Create review of questions and answers
    createReview();
}

// Create review of questions and answers
function createReview() {
    // Clear previous review
    questionsReview.innerHTML = '';
    
    // Create review items for each question
    userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        const question = decodeHTML(answer.question);
        const userAnswer = decodeHTML(answer.userAnswer);
        const correctAnswer = decodeHTML(answer.correctAnswer);
        
        reviewItem.innerHTML = `
            <p>
                <strong>Question ${index + 1}:</strong> ${question}
            </p>
            
            <p>
                Your answer: 
                <span class="${answer.isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                    ${userAnswer}
                </span>
            </p>
            
            ${!answer.isCorrect ? `
                <p>
                    Correct answer: 
                    <span class="correct-answer">
                        ${correctAnswer}
                    </span>
                </p>
            ` : ''}
        `;
        
        questionsReview.appendChild(reviewItem);
    });
}

// Reset and restart the quiz
function resetQuiz() {
    // Go back to settings
    showSettings();
    resetQuizState();
}

// Helper function to decode HTML entities
function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Mix up the answers - simple shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', init);