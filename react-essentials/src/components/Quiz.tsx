import React, { useState } from 'react'

import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = (selectedAnswer: string) => {
    setUserAnswers((prev: string[]) => {
      return [...prev, selectedAnswer]
    });
  }

  if (quizIsComplete) {
    return <div id="summary">
      <img src={quizCompleteImg} alt='Trophy icon' />
      <h2>Quiz Completed!</h2>
    </div>
  }
  
  const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswer.sort((a, b) => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswer.map((answer, index) => (
            <li key={index} className='answer'>
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 