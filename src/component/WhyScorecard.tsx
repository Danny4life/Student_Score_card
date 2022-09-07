import React from 'react'
import { Link} from "react-router-dom"

type WhyScorecardProps = {}

const WhyScorecard = (props: WhyScorecardProps) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '652px', backgroundColor: 'rgba(0, 0, 0, 0.03)', padding: '80px 80px 80px 150px', width: '100%', gap: '258px'}}>

        <div style={{display: 'flex', flexDirection: 'column', marginTop: '226px'}}>
            <h1 style={{color: '#03435F', fontSize: '40px'}}>Why Scorecard?</h1>
            <p style={{color: '#03435F'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> Feugiat eget ipsum, sed praesent.</p>

            <Link to="/login">
                <button style={{backgroundColor: 'rgba(0, 0, 0, 0.01)', borderRadius: '4rem' ,padding: '0.7rem 1.3rem', border: '1px solid #14A800', width:'220px', cursor: 'pointer'}}>
                    <span style={{color: '#14A800', fontSize: '16px'}}>Get Started</span>
                </button>
            </Link>
        </div>
        <div>

        </div>
    </div>
  )
}

export default WhyScorecard