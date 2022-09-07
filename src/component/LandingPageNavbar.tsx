import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { ScorecardLogo } from "."
import { landingNavbarData } from "./data"

type LandingPageNavbarProps = {}

const LandingPageNavbar = (props: LandingPageNavbarProps) => {
 return (
  <nav className="landing_nav">
   <div style={{ flex: '4', margin: '0 1rem', alignContent: 'space-between'}}>
    <ScorecardLogo />
   </div>
   <div style={{ flex: '8', marginLeft: '34rem' }}>
      <ul className="menu" style={{display: 'flex', alignItems: 'center'}}>
        {
        landingNavbarData.map((el, index) => {
          return (
            <li key={el.id}>
              <NavLink className={({isActive}) => (isActive ? "link-active": "link")} to={el.link} style={{marginRight: '2rem', textDecoration: 'none'}}>{el.name}</NavLink>
            </li>
          )
        })
        }
        <Link to="/login" style={{textDecoration: 'none'}}>
          <button className="banner_button">
              <span style={{fontWeight: '500', lineHeight: '17px', color: '#FFFFFF'}}>Login</span>
          </button>
        </Link>
    </ul>
   </div>
  </nav>
 )
}

export default LandingPageNavbar