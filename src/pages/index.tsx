import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header'
import { SectionHero } from '../components/Sections/SectionHero'
import { SectionVideo } from '../components/Sections/SectionVideo'
import { SectionPhotos } from '../components/Sections/SectionPhotos'
import { SectionOffer } from '../components/Sections/SectionOffer'
import { SectionManual } from '../components/Sections/SectionManual'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>CrisCell - Aparelho de curto em placas eletrônicas</title>
      </Head>

      <main>
        <SectionHero />
        <SectionVideo />
        <SectionPhotos />
        <SectionOffer />
      </main>
    </div>
  )
}

export default Home

