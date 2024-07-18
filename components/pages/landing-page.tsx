import '@schedule-x/theme-default/dist/index.css'
import AppUnderline from "../partials/svg/underline";
import Link from "next/link";
import SalesCard from "../partials/sales-card/sales-card";
import AppCalendar from "../partials/app-calendar/app-calendar";

export default function LandingPage() {
  return (
    <>
      <div className={'landingPage page-wrapper'}>
        <section className={'landingPage landingPage__heroAndDemo'}>
          <h1>
            Unleash the power of
            <div className="headingGradient heading-font">
              <AppUnderline className="app-underline"/>
              Schedule-X
            </div>
          </h1>

          <h2 className={'heroSubHeading'}>
            Enrich our open source calendar with additional features, where we put in the hard work, so you can focus on
            your application logic.
          </h2>

          <div className={'landingPageActions'}>
            <Link href={'#pricing'}>
              <button className={'landingPageAction buttonPrimary'}>
                Pricing →
              </button>
            </Link>

            <Link href={'/docs'} target="_blank">
              <button className={'landingPageAction buttonOutlined'}>
                <span>Discover all features</span>
              </button>
            </Link>
          </div>

          <AppCalendar/>
          {/*<video autoPlay loop playsInline muted id={'demo'} className="landingPageDemoVideo" width={800} height={250}>*/}
          {/*  <source src={'/videos/demo-june-2.mp4'} type={'video/mp4'} />*/}
          {/*</video>*/}
        </section>

        <section id={'pricing'} className={'landingPage landingPage__pricing'}>
          <h2 className={'pricingHeading heading-font'}>Pricing</h2>

          <div className={'landingPageCards'}>
            <SalesCard
              data={{
                title: 'Team',
                description: 'All products, ready to use out of the box',
                features: [
                  'All products',
                  'Email support',
                  'Prioritized issue processing',
                ],
                buttonText: 'Buy now'
              }}
              buttonClass={'filled'}
              buttonLink={'https://schedule-x.lemonsqueezy.com'}
            />

            <SalesCard
              data={{
                title: 'Enterprise',
                description: 'All products, plus service and custom plugins',
                features: [
                  'All products',
                  'Private chat support',
                  'Prioritized issue processing',
                  'Service Level Agreement',
                  'Custom-made plugins',
                ],
                buttonText: 'Contact sales'
              }}
              buttonLink={'https://docs.google.com/forms/d/e/1FAIpQLSfE0G6RCUbnzbEUCMGEKcfUGx6XprAPU_IGRxNZ2UajizU7SA/viewform?usp=sf_link'}
              buttonClass={'black'}
            />
          </div>
        </section>
      </div>
    </>
  )
}
