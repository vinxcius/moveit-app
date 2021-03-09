//Tudo que for colocado nesse Head vai pro cabeçalho da página
//Insere fontes 
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile"
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props: HomeProps) {

  return (
    //Os componentes sempre devem estar em volta de uma div/section para funcionar
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}>

      <div className={styles.container}>
        <Head>
          <title>Inicio | MoveIt</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown></Countdown>
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//Função nativa do next.js, tem que ter esse nome e ser assíncrona 
//Tudo que for feito dentro dessa função rodará no servidor NODE e não no Browser
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
