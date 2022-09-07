import React from 'react'
import {LandingPageNavbar, Footer} from "../component"


type AboutProps = {}

const About = (props: AboutProps) => {
  return (
    <div>
        <LandingPageNavbar />
        About
        <Footer />
    </div>
  )
}

export default About