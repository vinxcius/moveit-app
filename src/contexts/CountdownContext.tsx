import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}
interface countdownProviderProps {

    //ReactNode permite que qualquer elemento seja passado como filho (txt, children, tagHTML, componente, etc)
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: countdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext)


    //Forma de atualizar e definir o estado interno de um componente.
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false) //Define Countdown como falso
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60) //Num de minutos
    const seconds = time % 60 //Pega o resto = segundos

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        //cancela a execução do timeout
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(25 * 60)
        setHasFinished(false);

    }
    //Parâmetros: função e quando eu quero executar a função
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000) //1s
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}