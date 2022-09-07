import React from 'react'
import { ScorecardLogo, DevProfileAccountSetting } from '.'


type NavBarProps = {
  handleClick: any
  handleLeave: any
  handleHover: any
  setShowModal: any
  showModal: boolean
}


const DevNavBar = (props: NavBarProps) => {
  const { handleClick, handleLeave, handleHover, setShowModal, showModal } = props;

  return (
    <nav style={{ display: 'flex', boxShadow: '0 1px 50px rgba(0,0,0,0.05)', background: '#FFFFFF', padding: '0.8rem', justifyContent: 'space-between', height: '4rem' }}>
      <div style={{ margin: '0 1rem' }}>
        <ScorecardLogo />
      </div>
      <div style={{ margin: '0 1rem' }}>
        <DevProfileAccountSetting handleClick={handleClick} handleLeave={handleLeave} handleHover={handleHover} setShowModal={setShowModal} showModal={showModal} />
      </div>
    </nav>
  )
}

export default DevNavBar;