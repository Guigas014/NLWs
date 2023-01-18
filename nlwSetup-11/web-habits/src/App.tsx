import { useState, useEffect } from 'react'
import { Habit } from './components/Habit';

import './styles/global.css';

function App() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    setCount(count + 1)
  }, []);
    


  return (
   <>
    <Habit completed={count} /> 
    <Habit completed={count} /> 
    <Habit completed={count} /> 
  </>
  )
}

export default App
