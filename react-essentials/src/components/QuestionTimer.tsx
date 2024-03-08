import React, { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout  }: any) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        setTimeout(onTimeout(), timeout);
    }, [timeout, onTimeout])
    
    useEffect(() => {
        setInterval(() => {
            setRemainingTime((prev: number) => prev - 100)
        }, 100)
    }, [])

    return (
        <progress id='question-time' max={timeout} value={remainingTime} />
    )
}