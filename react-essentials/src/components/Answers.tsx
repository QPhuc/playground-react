import React from 'react'

export default function Answers({ansers, selectedAnser, answerState}: any) {
  return (
      <ul id='answers'>
          {shuffledAnswers.current.map((answer, index) => {
              const isSeleted = userAnswers[userAnswers.length - 1] === answer;
              let cssClasses = '';
              if (answerState === 'answered' && isSeleted) {
                  cssClasses = 'selected'
              }

              if ((answerState === 'correct' || answerState === 'wrong') && isSeleted) {
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
  )
}
