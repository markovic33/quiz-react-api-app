import React  from 'react';
import './App.css';
import Question from './Question';
import { useEffect, useState } from 'react';

const API_URL = "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple"

function App() {

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers,  setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() -0.5)
        }))
        setQuestions(questions);
      });
  },[])

  function handleAnswer(answer) {
    if(!showAnswers) {
      if(answer === questions[currentIndex].correct_answer) {
        setScore(score+1);
      }
    }
    setShowAnswers(true);
  }

  function handleNextQuestion() {
    setCurrentIndex(currentIndex+1);
    setShowAnswers(false);
  }

  function restartGame() {
    setScore(0);
    setCurrentIndex(0);
    setShowAnswers(false);
}
  
  return ( questions.length > 0 ?
      (
      <div className="App">
        {currentIndex >= questions.length ?
          (
            <div className='container-page'>
              <h1 className='container-end'>Game Over, Your Score is {score}</h1>
              <button className='restart-btn' onClick={() => restartGame()}>
                Restart Game
              </button>
            </div>
          ) :
          <div>
            <h1 className='container-h1'>Movie Quiz</h1>
            <h3 className='container-h3'>Question {currentIndex} out of 10 </h3>
            <Question 
            showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion}
            handleAnswer={handleAnswer}
            data={questions[currentIndex]}
          />
        </div>
        }
      </div>
      ) :
      <div className='container'>"Loading..."</div>
  );
}

export default App;
