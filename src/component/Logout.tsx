import React, { useState } from 'react'
import { Navigate } from 'react-router'
import { FiLogOut } from "react-icons/fi"

type LogoutProps = {}

const Logout = (props: LogoutProps) => {

    const [loggedOut, setLoggedOut] = useState(false);

    const handleLogout =()=>{
        localStorage.clear();
        setLoggedOut(true);
    }

 return (
  <div onClick={handleLogout} style={{cursor: 'pointer', padding: '1rem', width: '100%', color: '#14A800', display: 'flex', borderRadius: '10%'}}>
   <FiLogOut style={{marginRight: '1.3rem', width: '1.2rem', height: '1.2rem'}} />
   <span style={{fontSize: '16px', lineHeight: '19px'}}>Logout</span>
   { loggedOut && <Navigate to={'/login'}/> }
  </div>
 )
}

export default Logout