# Trivia Quiz Challenge

A dynamic, responsive web application that allows users to test their knowledge with customizable trivia quizzes. Built with HTML, CSS, and JavaScript.

![Trivia Quiz Challenge screenshot](<Trivia Quiz Challenge.jpg>)

## Live Demo

[Play the Trivia Quiz Challenge](https://arturadamczyk89.github.io/Project3.OnlineQuiz/)

## Features

- **Customizable Quiz Settings**:
  - Select number of questions (5, 10, 15, or 20)
  - Choose difficulty level (Easy, Medium, Hard, or Any)
  - Pick from various trivia categories

- **Interactive Quiz Experience**:
  - Real-time feedback on answers
  - Progress and score tracking
  - Clear navigation through questions

- **Comprehensive Results**:
  - Final score with percentage
  - Progress bar visualization
  - Personalized congratulatory message
  - Detailed review of all questions with correct answers

- **User-Friendly Design**:
  - Responsive layout for all device sizes
  - Intuitive navigation
  - Clear instructions with "How to Play" section
  - Accessible design with good contrast and readability

## Technologies Used

- HTML
- CSS (with flexbox and CSS grid for responsive layouts)
- JavaScript
- [Open Trivia Database API](https://opentdb.com/) for question data


## How It Works

The application fetches trivia questions from the Open Trivia Database API based on user-selected parameters. Questions are presented one at a time with multiple-choice options. After answering all questions, users receive a detailed results page with their score and a review of all questions.

### Key JavaScript Functions:

- `fetchCategories()`: Loads trivia categories from the API
- `startQuiz()`: Initiates the quiz with selected parameters
- `showQuestion()`: Displays the current question with answer options
- `selectAnswer()`: Handles user answer selection and provides feedback
- `displayResults()`: Shows final score and comprehensive review

## Code Structure

- `index.html`: Main HTML structure with all quiz sections
- `style.css`: Complete styling with responsive design
- `script.js`: All JavaScript functionality and API integration

## Testing

### HTML Validation
The HTML code was validated using the [W3C Markup Validation Service](https://validator.w3.org/).
![Test Result](<Testing Screenshots/HTML result.jpg>)
As indicated in the html validator. No errors were found.
### CSS Validation
The CSS code was validated using the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/).
## Results
![Test Result](<Testing Screenshots/CSS RESULT.jpg>)
As indicated in the css validator. No errors were found.
### JavaScript Validation
The JavaScript code was validated using [Minifier javascript validator](https://www.minifier.org/javascript-validator)
## Results
![Test result](<Testing Screenshots/JS Test trailling space.jpg>)
![Test result](<Testing Screenshots/JS test Char length and Undefined.jpg>)
The test results showed these types of error messages: 
  1. trailing spaces
  2. indicated long code over 80 character long
  3. undefined error (possibly an undefined variable)
## Resolution
  1. Trailing spaces have been deleted where they were indicated and in fact found
  2. Where possible without breaking the code->Lines have been split. Not everywhere it was possible due to method chaining.
  3. I've had a look at the indicated line which showed this bit of code:
![undefined error](<Testing Screenshots/undef potential error.jpg>)
  This is the template literal for displaying the correct answer - should the person doing the quiz select an incorrect answer.
The issue potentially might have been highlighted due to using the negation syntax at the beginning. 
  So I've attempted to make the code more clearly understandable and error free by rewriting it in a way that would make it function
in the same way but without potentially causing/triggering an error.
![undefined error fix](<Testing Screenshots/undef error rewritten code.jpg>)
  In both cases when running the aplication the functionality remained the same. Which I am proving by doing manual testing showed below:
![manual test to confirm error](<Testing Screenshots/Manual CODE Test.jpg>)
## Conslusions
After doing the fixes in the places indicated I've managed to decease significantly the amount of potential issues highlighted in the initial test:

 ![testresult after fixes](<Testing Screenshots/AFTER FIXES.jpg>)

 I've attempted apply fixes while still preserving the original functionality of the program. As shown
 in the manual test of the application the code in fact was working for the programmed bit of logic pertaining to the potential error. Hence concluding
 that the warining message was unjustified.
### Lighthouse
The website has been tested for performance, accessibility, best practice and SEO.
![Devtools Lighthouse Score](<Lighthouse Score.jpg>)
## Possible Future Enhancements

- Timer functionality for each question
- Option to save high scores
- Custom themes and styling options
- Social media sharing of results

## Credits and Acknowledgements

- [Open Trivia Database](https://opentdb.com/) for providing the free trivia API
- [W3C Validators](https://validator.w3.org/) for code validation tools

##Contact
artur.adamczyk89@gmail.com


---

Created by Artur Adamczyk | 2025
