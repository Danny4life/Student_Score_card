import React from 'react'
import {abeg, access, bolt, first_bank, airtel} from "./images"

type OurPartnersProps = {}

const OurPartners = (props: OurPartnersProps) => {
  return (
    <div style={{backgroundColor: '#FFFFFF', height: '20rem'}}>
        <h1 style={{color: '#012A4A', fontWeight: '700', fontSize: '40px', lineHeight: '48px', textAlign: 'center', marginTop: '-1rem', paddingTop: '5rem'}}>OurPartners</h1>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <div>
                <img src={abeg}/>
            </div>
            <div>
                <img src={access}/>
            </div>
            <div>
                <img src={bolt}/>
            </div>
            <div>
                <img src={first_bank}/>
            </div>
            <div>
                <img src={airtel} />
            </div>

        </div>

    </div>
  )
}

export default OurPartners