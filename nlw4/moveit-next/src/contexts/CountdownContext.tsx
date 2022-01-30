import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';



interface CountdownContextData {
    isActive: boolean;
    hasFinished: boolean;
    minutes: number;
    seconds: number;
    imageStop: string;
    startCountdown: () => void;
    resetCountdown: () => void;
    changeStopImageWhite: () => void;
    changeStopImageBlack: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}


export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout; 





export function CountdownProvider({children}: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)  
  

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)  
  const [imageStop, setImageStop] = useState('/icons/leave.svg')


  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }  

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(0.1 * 60)
  }

  function changeStopImageWhite() {
    setImageStop('/icons/leave-hover.svg')
  }

  function changeStopImageBlack() {
    setImageStop('/icons/leave.svg')
  }


  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])



  return (
    <CountdownContext.Provider 
    value={{
      isActive,
      hasFinished,
      minutes,
      seconds,
      imageStop,
      startCountdown,
      resetCountdown,
      changeStopImageWhite,
      changeStopImageBlack,
    }}
    >
      {children}
    </CountdownContext.Provider>
  )
}

