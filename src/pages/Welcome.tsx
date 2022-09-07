import React from 'react'
import { LandingPageNavbar, LandingPageBanner, WhyScorecard, OurPartners, Footer } from "../component"

type WelcomeProps = {}

const Welcome = (props: WelcomeProps) => {
 return (
  <div style={{maxWidth: '100%', overflowX: 'hidden'}}>
   <LandingPageNavbar />
   <LandingPageBanner />
   <WhyScorecard />
   <OurPartners />
   <Footer />
  </div>
 )
}

export default Welcome