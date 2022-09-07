import React, { useState, MouseEvent, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { accountSettingsData } from "./data"
import { ProfileModal, Logout } from "."


type ProfileAccountSettingsProps = {
  handleClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void
  setShowModal: any
  showModal: boolean
  handleHover: () => void
  handleLeave: () => void
}


const BASEURL = process.env.REACT_APP_BASEURL;

const ProfileAccountSettings = (props: ProfileAccountSettingsProps) => {
  const { handleClick, setShowModal, showModal, handleHover, handleLeave } = props;

  const [profilePicture, setProfilePicture] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [role, setRole] = useState('');
  
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BASEURL}/admin/profile/${localStorage.getItem('id')}`, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        console.log(result.data)
        const {imageUrl, firstName, lastName, role}=  result.data        
        setProfilePicture(imageUrl)
        setFirstName(firstName)
        setLastName(lastName)
        setRole(role)

      } catch (err) {
        console.error(err)
      }
    })();
  }, []);


  return (
    <>
      <div onClick={(e) => handleClick(e)} onMouseOver={() => handleHover()} className="account-settings">
        {/* <div style={{ paddingLeft: '2rem', margin: '0' }}>
        </div> */}
          <img className="profile-img" alt='Admin profile' src={profilePicture} />
        <div style={{ paddingLeft: '1rem' }}>{`${firstName} ${lastName}`}</div>
      </div>

      <div onMouseLeave={() => handleLeave()}>

        {showModal && <ProfileModal accountSettingsData={accountSettingsData} showModal={showModal} profilePicture={profilePicture} firstName={firstName} lastName={lastName} role={role} />}
      </div>


    </>
  )
}

export default ProfileAccountSettings