import '@schedule-x/theme-default/dist/index.css'
import AppUnderline from "../partials/svg/underline";
import Link from "next/link";
import SalesCard from "../partials/sales-card/sales-card";
import AppCalendar from "../partials/app-calendar/app-calendar";
import {Accordion} from 'rsuite';

export default function LandingPage() {
  return (
    <>
      <div className={'landingPage page-wrapper'}>
        <section className={'landingPage landingPage__heroAndDemo'}>
          <h1>
            Your favorite calendar
            <div className="headingGradient">
              <AppUnderline className="app-underline"/>
              pumped up
            </div>
          </h1>

          <h2 className={'heroSubHeading'}>
            Don't waste time building stuff like forms, calendar toggles, or drag-to-create. Someone already built all that for you.
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
        </section>

        <section style={{position: 'relative'}} id={'pricing'} className={'landingPage landingPage__pricing'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 230">
            <path fill="#fff" fillOpacity="1" d="M0,64L480,160L960,64L1440,96L1440,0L960,0L480,0L0,0Z"></path>
          </svg>

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

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 230">
            <path fill="#fff" fill-opacity="1" d="M0,64L480,160L960,64L1440,96L1440,320L960,320L480,320L0,320Z"></path>
          </svg>
        </section>

        <section className={'faq'}>
          <h2 className={'pricingHeading heading-font'}>FAQ</h2>

          <Accordion style={{width: '100%', maxWidth: '950px'}}>
            <Accordion.Panel header="Can I use the license commercially?" defaultExpanded>
              <i>Yes, you can.</i> Though I plan to introduce an OEM license later, I believe in honoring those who believed in the project early on. You can continue using Schedule-X premium commercially without having to upgrade licenses later on, if you buy it before OEM licensing is introduced.
            </Accordion.Panel>
            <Accordion.Panel header="How many issues and feature requests are included?">
              There is no limit to how many issues and feature requests you can submit. However, you buy the software <i>as is</i>, without any guarantee that I will build features that you request. If I believe that a feature is useful to many customers, I am more likely to build it.

              <br />
              <br />

              If you want certainty that a feature will be built, you need to select an enterprise license so we can discuss the terms of the feature request.
            </Accordion.Panel>
            <Accordion.Panel header="Can I cache the software on my servers?">
              Yes. This is even encouraged. For example, you can use software like <a href={"https://verdaccio.org/"} target={'_blank'} style={{ textDecoration: 'underline', color: '#6750a4' }}>Verdaccio</a> or JFrog artifactory. However,
              <strong> this does not mean that you are allowed to use Schedule-X premium beyond the terms of the license you purchased.</strong> You need to pay the yearly subscription, for as long as the software is being used.
            </Accordion.Panel>
          </Accordion>
        </section>
      </div>
    </>
  )
}
