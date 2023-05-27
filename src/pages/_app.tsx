import type { AppProps } from 'next/app'
import Modals from '../components/Modals'
import { BoxCookies } from '../components/Partials/BoxCookies'
import { ToasterComponent } from '../components/Partials/ToasterComponent'
import { GlobalContextProvider } from '../context/GlobalContextProvider'
import 'swiper/css/bundle'
import '../styles/index.scss'
import { Header } from '../components/Header'
import { Copyright } from '../components/Footer/Copyright'
import { Footer } from '../components/Footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <BoxCookies />
      <Modals />
      <ToasterComponent />
    </GlobalContextProvider>
  )
}

