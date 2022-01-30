import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';


export function Countdown() {
  const { 
    minutes, 
    seconds,
    imageStop,
    isActive, 
    hasFinished, 
    startCountdown, 
    resetCountdown,
    changeStopImageWhite,
    changeStopImageBlack,
  } = useContext(CountdownContext)


  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')  
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')  
 
 

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>  
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
    

      {hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
          <img src="/icons/check_circle.svg" alt="OK" style={{ marginLeft: 15 }} />
        </button>

      ) : (
        <>
          { isActive ? (
            <button 
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
              onMouseOver={changeStopImageWhite} 
              onMouseOut={changeStopImageBlack}
            >
              Abandonar ciclo 
              <img id="stopImage" src={imageStop} alt="STOP" style={{ marginLeft: 15 }} />
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown} 
            >
              Iniciar um ciclo
              <img src="/icons/arrow.svg" alt="PLAY" style={{ marginLeft: 10 }} />
            </button>
          )} 
        </>
      )}

      
    </div>
  );
}
