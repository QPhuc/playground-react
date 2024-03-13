import React, { useCallback, useState } from 'react'

import QUESTIONS from '../../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question';

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

  return (
    <div id='quiz'>
      <Question
        questionText={QUESTIONS[activeQuestionIndex]?.text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
} 