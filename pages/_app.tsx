import '../theme/index.scss'
import '../components/pages/landing-page.scss'
import '../components/pages/demos/calendar-demo.scss'
import '../components/partials/card/card.scss'
import '../components/partials/sales-card/sales-card.scss'
import '../components/partials/app-dropdown/app-dropdown.scss'
import { Podkova } from 'next/font/google'
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/sidebar/index.css'
import '@sx-premium/interactive-event-modal/index.css'

const podkova = Podkova({
  subsets: ['latin-ext'],
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <main className={podkova.className + ' main'}><Component {...pageProps} /></main>
}
