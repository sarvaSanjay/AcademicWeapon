import React, { useState } from 'react';
import '../Quiz.css'; // Import your CSS file


function Quiz(props) {
    // const [questions, setQuestions] = useState([
    //     {
    //         question: 'What is the capital of France?',
    //         optionA: 'Paris',
    //         optionB: 'London',
    //         optionC:  'Berlin',
    //         optionD: 'Madrid',
    //         answer: 'Paris'
    //     },
    //     {
    //         question: 'What is the largest planet in our solar system?',
    //         optionA: 'Jupiter',
    //         optionB: 'Saturn',
    //         optionC:  'Earth',
    //         optionD: 'Mercury',
    //         answer: 'Jupiter'
    //     },
    //     {
    //         question: 'What is the smallest country in the world?',
    //         optionA: 'Monaco',
    //         optionB: 'Vatican City',
    //         optionC:  'San Marino',
    //         optionD: 'UAE',
    //         answer: 'Vatican City'
    //     }
    // ]);
    const [questions, setQuestions] = useState(props.quiz);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (answer) => {
        if (answer === questions[currentQuestion].correctAnswer) {
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
        <div className='bg'>
        <div className="quiz-container">
            {showScore ? (
                <div className="score-container">
                    <h2 className="score-header">Quiz Complete!</h2>
                    <p className="score-text">You scored {score} out of {questions.length}.</p>
                </div>
            ) : (
                <div>
                    <div className="question-number">
                        Question {currentQuestion + 1}/{questions.length}
                    </div>
                    <div className="question-text">{questions[currentQuestion].question}</div>
                    <div className="answer-options">
                        <button onClick={() => handleAnswerOptionClick(questions[currentQuestion].optionA)} className="option-button">
                            {questions[currentQuestion].optionA}
                        </button>
                        <button onClick={() => handleAnswerOptionClick(questions[currentQuestion].optionB)} className="option-button">
                            {questions[currentQuestion].optionB}
                        </button>
                        <button onClick={() => handleAnswerOptionClick(questions[currentQuestion].optionC)} className="option-button">
                            {questions[currentQuestion].optionC}
                        </button>
                        <button onClick={() => handleAnswerOptionClick(questions[currentQuestion].optionD)} className="option-button">
                            {questions[currentQuestion].optionD}
                        </button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Quiz;
