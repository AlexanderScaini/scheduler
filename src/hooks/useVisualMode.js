import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (next, replace = false)=> {
    if(replace) {
      const newHistory = history.slice(0, history.length -1)
      setHistory([...newHistory, next])
      setMode(next)
    } else {
      setHistory(prev => [...prev, next])
      setMode(next)
    }
    
  }

  const back = () => {
    if(history.length > 1) {
      const newHistory = history.slice(0, history.length -1)
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1])
    }
  }
  // console.log("Mode: ",mode)
  // console.log("History: ",history)
  // console.log(history.length)
  return { mode, transition, back }
}