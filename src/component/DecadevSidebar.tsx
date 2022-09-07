import React from 'react'
import { Link } from "react-router-dom"
import { decadevSideBarData } from "../component/data"
import { Logout } from "../component"


type SideBarProps = {}

const DecadevSideBar: (props: SideBarProps)=> JSX.Element = (props: SideBarProps) => {
  return (
    <div style={{ 
            background: '#FFFFFF', 
            // width: '23%', 
            padding: '1rem 2rem 2rem 2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)' 
          }}>
      <div>
        {
          decadevSideBarData.map(el => {
            return (
                <div className="sidebar_data" style={{ 
                  display: 'block', 
                  marginTop: '0.5rem', 
                  fontSize: '0.91rem', 
                  color: '#FFFFFF', 
                  lineHeight: '1.3rem', 
                  fontWeight: '400' }}>
                  <Link className="sidebar-link" to={el.link}>
                    <span style={{ display: 'inline-block', fontSize: '1.4rem', marginRight: '0.5rem' }}>
                      {el.icon}
                    </span>
                    <span style={{ display: 'inline-block'}}>
                      {el.name}
                    </span>
                  </Link>

                </div>

                
            )
          })
        }
      </div>
        <div style={{ background: 'rgba(20, 168, 0, 0.05)', marginBottom: '1.5rem'}}>
        <Logout />
        </div>
    </div>
  )
}

export default DecadevSideBar