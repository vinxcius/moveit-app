import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext)
    return (
        //Muito dificil um componente nao ter uma div ao redor!
        <div className={styles.profileContainer}>
            <img src="https://github.com/vinxcius.png" alt="Vinicius Rodrigues" />
            <div>
                <strong>Vinicius Rodrigues</strong>

                <p>
                    <img src="icons/level.svg" alt="Level" />
                    level {level}
                </p>
            </div>
        </div>
    )
}