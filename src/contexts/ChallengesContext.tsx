interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

//Dados retornados de dentro do contexto
interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void; //função sem retorno
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

//Typescript definido a tipagem 
interface ChallengesProviderProps {

    //ReactNode permite que qualquer elemento seja passado como filho (txt, children, tagHTML, componente, etc)
    children: ReactNode
    level: number,
    currentExperience: number,
    challengesCompleted: number
}



import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';


export const ChallengesContext = createContext({} as ChallengeContextData)


export function ChallengesProvider({
    children,
    ...rest //armazenando as outras props que não são a children nessa variável rest usando rest-operator
}: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0) //Exp do usuário 
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0) //Desafios completados
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    //Calcula a experiencia pro proximo nível
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


    //Quando o segundo parametro é um array vazio, ele vai executar a primeira função uma unica vez assim que o componente for exibido em tela
    useEffect(() => {
        //Api do browser pra pedir permissões ao usuário para mostrar notificação
        Notification.requestPermission();
    }, [])

    //Armazena informações em cookies
    //Yarn add js-cookie ajuda na busca de dados dos cookies
    useEffect(() => {
        //Cookies so aceitam em formato de texto
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))

    }, [level, currentExperience, challengesCompleted])
    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        //API do browser que permite alterar o som de notificação
        new Audio('/notification.mp3').play()

        //Se for permitido a notificação pelo browser
        if (Notification.permission === 'granted') {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount}XP!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        //se não tiver desafio ativo
        if (!activeChallenge) {
            return;
        }

        //Buscando quanto de EXP da o desafio
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null) //zera o desafio

        //Sobe o numero de desafios completos
        setChallengesCompleted(challengesCompleted + 1)
    }


    return (
        //Todos os componentes dentro de outro componente com o atributo Provider vão ter acesso aos dados daquele contexto (no caso ChallengesContext)
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}