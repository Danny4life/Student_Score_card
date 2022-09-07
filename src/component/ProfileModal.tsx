import React from 'react'
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Logout from './Logout';
import styles from './CreateStackModal.module.css';

type ProfileModalProps = {
  accountSettingsData: any
  showModal: boolean
  profilePicture: string
  firstName: string
  lastName: string
  role: string
}

const ProfileModal: (props: ProfileModalProps) => React.ReactPortal | null = (props: ProfileModalProps) => {
  const { accountSettingsData, showModal, profilePicture, firstName, lastName, role } = props

  if (showModal) {

    return ReactDOM.createPortal(
      <div className="profile-modal">
        <div className="profile-modal-up" >
          <img src={profilePicture} alt='Admin profile' style={{ width: '5rem', clipPath: 'circle(50%)', marginRight: '0.8rem' }} />

          <div className="profile-modal-bottom">
            <span style={{ color: '#03435F', fontWeight: '700', lineHeight: '19px' }}>{`${firstName} ${lastName}`}</span>
            <span style={{ color: '#03435F', fontWeight: '400', lineHeight: '19px' }}>{`${role}`}</span>
          </div>

        </div>

        <div style={{ padding: '1rem 0 1.5rem 2rem' }}>
          {
            accountSettingsData.map((el: any, index: number) => {
              return (
                <div key={index} style={{paddingBottom: '0rem', paddingTop: '2rem'}}>
                  <Link to={el.link} className='profile-modal-links'>
                    <span style={{ marginRight: '1rem', fontSize: '1.5rem', display: 'inline-block' }}>{el.icon}</span>
                    <span style={{ display: 'inline-block',  }}>{el.name}</span>
                  </Link>
                </div>
              )
            })
          }

        </div>
        <div style={{ paddingLeft: '1.4rem' }}>

          <Logout />
        </div>

      </div>, document.getElementById('modal-root')!)
  }
  return null;
}

export default ProfileModal