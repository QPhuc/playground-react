import React, { useCallback, useState } from 'react'

import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState<any>([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
    setUserAnswers((prev: string[]) => {
      return [...prev, selectedAnswer]
    });
  }, []) 

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
  
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
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer } />
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