import React, { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout }: any) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timer)
        }
    }, [timeout])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prev: number) => prev - 100)
        }, 100)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <progress id='question-time' max={timeout} value={remainingTime} />
    )
}