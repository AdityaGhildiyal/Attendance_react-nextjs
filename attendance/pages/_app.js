import { ScrollProvider } from '../context/ScrollContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />
    </ScrollProvider>
  )
}

export default MyApp
