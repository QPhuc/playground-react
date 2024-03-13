import React from 'react'
import QuestionTimer from './QuestionTimer'

export default function Question() {
  return (
      <div id='question'>
          <QuestionTimer
              key={activeQuestionIndex}
              timeout={10000}
              onTimeout={handleSkipAnswer}
          />
          <h2>{activeQuestionIndex && QUESTIONS[activeQuestionIndex]?.text}</h2>
          <Answers
              key={activeQuestionIndex}
              answers={QUESTIONS[activeQuestionIndex].answers}
              selectedAnswer={userAnswers[userAnswers.length - 1]}
              answerState={answerState}
              onSelect={handleSelectAnswer}
          />
      </div>
  )
}
