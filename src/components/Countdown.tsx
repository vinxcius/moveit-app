import { useState, useEffect, useContext } from 'react'
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownContext} from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout 

export function Countdown() {
    const {
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown
    } = useContext(CountdownContext)
    const { startNewChallenge } = useContext(ChallengesContext)

    
   

    //Converte o número pra um string
    //PadStart verifica se a string tem dois caracteres. Caso não tenha acrescenta um zero a esquerda. Ex: 5 = 0, 5
    //Split vai dividir cada caractere e retornar num array. Ex: 25 = 2, 5

    //desestruturando esse array, pegando o primeiro valor da esquerda e o primeiro da direita e atribuindo a minuteLeft e minuteRight
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
               <button disabled className={styles.countdownButton}>
                   Ciclo Encerrado
               </button>
            ) : (
                <>
                     { isActive ? (
                  <button
                  type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                  onClick={resetCountdown}
              >
                  Abandonar ciclo
  
              </button>
  
            ) : (
                <button
                type="button" className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um Ciclo

            </button>
            )}
          
                </>
            )}

           
       
        </div>

    )
}