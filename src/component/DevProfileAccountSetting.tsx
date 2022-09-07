import React, { useState, MouseEvent, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import photo from './images/placeholder-img.png'
import { FiSettings, FiUser } from "react-icons/fi";
import { accountSettingsData } from "./data"
import { ProfileModal, Logout } from "."


type Props = {
  handleClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void
  setShowModal?: any
  showModal?: boolean
  handleHover: () => void
  handleLeave: () => void
}

const BASEURL = process.env.REACT_APP_BASEURL

const DevProfileAccountSettings = (props: Props) => {
  const { handleClick, setShowModal, showModal, handleHover, handleLeave } = props;
  const [fullName, setFullName] = useState('')
//   const firstName = localStorage.getItem('firstName');
//   const lastName = localStorage.getItem('lastName');
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('imageUrl') || '#');


  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BASEURL}/users/profile/${localStorage.getItem('id')}`, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        // console.log(result.data)
        const {imageUrl, firstName, lastName, role}=  result.data       
        setImageUrl(imageUrl);
        setFullName(firstName + ' ' + lastName);
      } catch (err) {
        console.error(err);
      }
    })();
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div onClick={(e) => handleClick(e)} onMouseEnter={() => handleHover()} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
        <div>
            {
                imageUrl !== '#' ?
                <img src={ imageUrl as string} alt="profile" style={{ clipPath: 'circle(50%)', width: '3rem', objectFit: 'cover', objectPosition: 'center' }}/>
                :
                <img src={photo} alt="temp" style={{ clipPath: 'circle(50%)', width: '3rem', objectFit: 'cover', objectPosition: 'center' }} />
                    
            }
        </div>
        <div style={{ marginLeft: '1rem', color: '#213' }}>{`${fullName}`}</div>
      </div>

        {showModal && (
            <div onMouseEnter={() => handleHover()} onMouseLeave={handleLeave}
                style={{
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    position: 'relative',
                    zIndex: '10',
                    boxShadow: '0px 0px 5px rgb(0,0,0,0.2)'
                }} >
                <Link
                    to={"/decadev-dashboard/profile"}
                    style={{ textDecoration: "none", color: '#213', cursor: 'pointer',padding: "1rem"  }}
                    >
                    <FiUser style={{ marginRight: "1rem" }} />
                    Account
                </Link>
                <Link
                    to={"/decadev-dashboard/password-update"}
                    style={{ textDecoration: "none", color: '#213', cursor: 'pointer',padding: "1rem"  }}
                    >
                    <FiSettings style={{ marginRight: "1rem" }} />
                    Settings
                </Link>
                <div>
                    <Logout />
                </div>
            </div>
        )}
        </div>
  )
}

export default DevProfileAccountSettings