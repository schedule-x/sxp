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
import '@sx-premium/drag-to-create/index.css'
import Script from "next/script";

const podkova = Podkova({
  subsets: ['latin-ext'],
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <main className={podkova.className + ' main'}>
    <Component {...pageProps} />
    <Script>
      {`window.lemonSqueezyAffiliateConfig = { store: "schedule-x" };`}
    </Script>
    <Script src="https://lmsqueezy.com/affiliate.js" defer/>
  </main>
}
