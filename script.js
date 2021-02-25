const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach((answer) => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is the correct way to describe an empty element?',
        answers: [
            {
                text: 'It has no child content and no closing tag.',
                correct: true,
            },
            {
                text: 'It has child content but no closing tag.',
                correct: false,
            },
            { text: 'It display nothing on a website.', correct: false },
            {
                text: 'It has opening and closing tags but no child content.',
                correct: false,
            },
        ],
    },
    {
        question:
            'How will a video look displayed on a fully loaded webpage if the <video> tag is used and the autoplay attribute is not set?',
        answers: [
            {
                text:
                    'It will display the first frame of the video, unless the poster attribute is set.',
                correct: true,
            },
            {
                text:
                    'It will display a random frame from a video, unless the poster attribute is set.',
                correct: false,
            },
            {
                text:
                    'It will display nothing unless the poster attribute is set.',
                correct: false,
            },
            {
                text:
                    'It will display a black window unless the poster attribute is set.',
                correct: false,
            },
        ],
    },
    {
        question: 'What is the semantic meaning of the <hr> tag?',
        answers: [
            {
                text:
                    'It designates a topic shift within a section at the paragraph level.',
                correct: true,
            },
            {
                text:
                    'It designates a separation of sections within an <article>.',
                correct: false,
            },
            {
                text: 'This tag is deprecated and should not be used.',
                correct: false,
            },
            { text: 'It draws a horizontal line.', correct: false },
        ],
    },
    {
        question: 'What is the root element of an HTML document?',
        answers: [
            { text: '<html>', correct: true },
            { text: '<!DOCTYPE html>', correct: false },
            { text: '<root>', correct: false },
            { text: '<body>', correct: false },
        ],
    },
    {
        question: 'What is the best semantic to use Quotes in HTML?',
        answers: [
            { text: '<quote>', correct: true },
            { text: '<q>', correct: false },
            { text: '<blockquote>', correct: false },
            { text: '<notation>', correct: false },
        ],
    },
    {
        question: 'Which statement is false?',
        answers: [
            {
                text: 'Block elements can be nested inside inline elements.',
                correct: true,
            },
            {
                text: 'Inline elements can be nested inside block elements.',
                correct: false,
            },
            {
                text: 'Block elements can be nested inside block elements.',
                correct: false,
            },
            {
                text: 'Inline elements can be nested inside inline elements.',
                correct: false,
            },
        ],
    },
]
