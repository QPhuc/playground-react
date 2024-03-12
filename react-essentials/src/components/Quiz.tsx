import React, { useCallback, useState } from 'react'

import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  const [answerState, setAnswerState] = useState(""); 
  const [userAnswers, setUserAnswers] = useState<any>([]);

  const activeQuestionIndex: number = answerState == '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
    setAnswerState('answered');
    setUserAnswers((prev: string[]) => {
      return [...prev, selectedAnswer]
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong')
      }

      setTimeout(() => {
        setAnswerState('')
      }, 20000);
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
  shuffledAnswer.sort(() => Math.random() - 0.5);

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
          {shuffledAnswer.map((answer, index) => {
            const isSeleted = userAnswers[userAnswers.length - 1] === answer; 
            let cssClasses = '';
            if (answerState === 'answered' && isSeleted)  {
              cssClasses = 'selected'
            }

            if ((answerState === 'correct' || answerState === 'wrong' ) && isSeleted)  {
              cssClasses = answerState; 
            }

            return <li key={index} className='answer'>
              <button
                onClick={() => handleSelectAnswer(answer)}
                className={cssClasses}
              >{answer}
              </button>
            </li>
          })
        }
        </ul>
      </div>
    </div>
  )
} 