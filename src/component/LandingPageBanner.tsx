import React from 'react'
import { Link } from "react-router-dom"

type LandingPageBannerProps = {}

const LandingPageBanner = (props: LandingPageBannerProps) => {
  return (
    <div className="banner_background">
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '149px', padding: '10.2rem 0rem'}}>

            <h1 className="banner_heading">
                You can learn<br /> 
                anything,<br />
                anywhere.
            </h1>
            <p style={{lineHeight: '17px', fontWeight: '500', color: '#FFFFFF', fontStyle: 'normal', fontSize: '14px'}}>
                Education is the process of facilitating learning, or the acquisition of <br />
                knowledge, skills, values, beliefs and habits.
            </p>

            <Link to="/login">
                <button className="banner_button">
                    <span style={{fontWeight: '500', lineHeight: '17px', color: '#FFFFFF'}}>Get Started</span>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default LandingPageBanner