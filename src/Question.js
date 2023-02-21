import React from "react";

export default function Question({showAnswers, handleNextQuestion, handleAnswer, data: {question, correct_answer, answers}}) {
    return (
        <div className="app">
            
            <div className="container">
                <h2 
                    className="container-text"
                    dangerouslySetInnerHTML={{__html: question}}
                />
                <ul>
                    {answers.map((answer, idx) => {
                        const specialClassName = showAnswers ? (
                            answer === correct_answer ? "green-btn" : "red-btn"
                        ) : "";
                        return (
                            <li 
                            className={specialClassName}
                            onClick={() => handleAnswer(answer)}
                            dangerouslySetInnerHTML={{__html: answer}} />
                        )
                    })}
                </ul>
            </div>
            {showAnswers && (
                <button className="next-btn" onClick={handleNextQuestion}>
                    Next Question
                </button>
            )}
        </div>
    )
}