import { useState, useEffect } from 'react'

function calculate(target) {
  const diff = new Date(target) - Date.now()
  if (diff <= 0) return null
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => targetDate ? calculate(targetDate) : null)

  useEffect(() => {
    if (!targetDate) return
    setTimeLeft(calculate(targetDate))
    const id = setInterval(() => setTimeLeft(calculate(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}
