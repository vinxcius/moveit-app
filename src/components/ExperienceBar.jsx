import styles from '../styles/components/ExperienceBar.module.css'

import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

export function ExperienceBar() {

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    //calcula a distancia da barra pra upar 
    //Passado como valor da width das barras
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        //className pra definir nome ao inves de apenas class
        //Chaves para passar um objeto como parâmetro.
        //Styles.NomeDaClasse
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}
