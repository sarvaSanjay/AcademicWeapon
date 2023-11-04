import React, { useState } from 'react';
import '../Quiz.css'; // Import your CSS file

function Quiz() {
    const [questions, setQuestions] = useState([
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            answer: 'Paris'
        },
        {
            question: 'What is the largest planet in our solar system?',
            options: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
            answer: 'Jupiter'
        },
        {
            question: 'What is the smallest country in the world?',
            options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
            answer: 'Vatican City'
        }
    ]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (answer) => {
        if (answer === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="quiz-container">
            {showScore ? (
                <div className="score-container">
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <div>
                    <div className="question-number">
                        Question {currentQuestion + 1}/{questions.length}
                    </div>
                    <div className="question-text">{questions[currentQuestion].question}</div>
                    <div className="answer-options">
                        {questions[currentQuestion].options.map((option) => (
                            <button onClick={() => handleAnswerOptionClick(option)} className="option-button">
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
