import React, { useCallback, useState } from 'react'

import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  const [answerState, setAnswerState] = useState(""); 
  const [userAnswers, setUserAnswers] = useState<any>([]);

  const activeQuestionIndex: number = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
    setAnswerState('answered');
    setUserAnswers((prev: string[]) => {
      return [...prev, selectedAnswer]
    });

    setTimeout(() => {
      
    }, 1000);
  }, []) 

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [])
  
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
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{activeQuestionIndex && QUESTIONS[activeQuestionIndex]?.text}</h2>
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