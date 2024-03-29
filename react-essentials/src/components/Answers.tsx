import React, { useRef } from 'react'

export default function Answers({ answers, selectedAnswer, answerState, onSelect }: any) {
    const shuffledAnswers = useRef<string[]>();
     if (!shuffledAnswers.current) {
         shuffledAnswers.current = [...answers ];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
  return (
      <ul id='answers'>
          {shuffledAnswers.current.map((answer, index) => {
              const isSeleted = selectedAnswer === answer;
              let cssClasses = '';
              if (answerState === 'answered' && isSeleted) {
                  cssClasses = 'selected'
              }

              if ((answerState === 'correct' || answerState === 'wrong') && isSeleted) {
                  cssClasses = answerState;
              }

              return <li key={index} className='answer'>
                  <button
                      onClick={() => onSelect(answer)}
                      className={cssClasses}
                  >{answer}
                  </button>
              </li>
          })
          }
      </ul>
  )
}
