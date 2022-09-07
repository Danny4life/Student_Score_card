import React from 'react'
import {NavLink, Link} from "react-router-dom";
import {landingNavbarData} from "./data"
import { instagram, twitter, youtube} from "./images"

type FooterProps = {}

const Footer = (props: FooterProps) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
  return (
    <div style={{height: '285px', backgroundColor: '#000000', color: '#FFFFFF'}}>
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', marginBottom: '3rem'}}>
            <h4 style={{fontSize: '28px', fontWeight: '600', lineHeight: '34px', fontStyle: 'normal'}}>Score<span style={{backgroundColor: 'green'}}>card</span></h4>
            <ul className="menu">
            {
            landingNavbarData.map((el, index) => {
            return (
                <li key={el.id} style={{display: 'inline'}}>
                <NavLink className="footer-link" to={el.link} style={{marginRight: '4rem', textDecoration: 'none'}}>{el.name}</NavLink>
                </li>
            )
            })
            }
    </ul>
        </div>


        <div style={{borderTop: '1px solid white', width: '1278px', display: 'flex', textAlign: 'center', margin: '0rem 2rem', justifyContent: 'space-between',  alignItems: 'center', padding: '0rem 2rem' }}>
                <p>
                © {currentYear} Scorecard. All rights reserved
                </p>
                <div style={{color: 'white'}}>
                    <a href="https://www.instagram.com/">
                        <span style={{ marginRight: '1rem'}}><img src={instagram} /></span>
                    </a>
                    <a href="https://twitter.com/">
                        <span style={{marginRight: '1rem'}}><img src={twitter}/></span>
                    </a>
                    <a href="https://www.youtube.com/">
                        <span><img src={youtube}/></span>
                    </a>
                </div>
                

        </div>
        
    </div>
  )
}

export default Footer