import React, { useEffect } from 'react'
import { ScorecardLogo, NavBarSearch, ProfileAccountSettings } from '.'


type NavBarProps = {
  handleClick: any
  handleLeave: any
  handleHover: any
  setShowModal: any
  showModal: boolean
}


const NavBar = (props: NavBarProps) => {
  const { handleClick, handleLeave, handleHover, setShowModal, showModal } = props;

  return (
    <nav style={{ display: 'flex', boxShadow: '0 1px 50px rgba(0,0,0,0.05)', background: '#FFFFFF', padding: '0.8rem', height: '4rem' }}>
      <div style={{ flex: '3', margin: '0 1rem' }}>
        <ScorecardLogo />
      </div>
      <div style={{ flex: '7' }}>
        <NavBarSearch />
      </div>
      <div style={{ flex: '3' }}>
        <ProfileAccountSettings
          handleClick={handleClick}
          handleLeave={handleLeave}
          handleHover={handleHover}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </nav>
  )
}

export default NavBar;