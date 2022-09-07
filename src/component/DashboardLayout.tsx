import React, {useState, MouseEvent} from 'react'
import { NavBar, SideBar } from "."
import classes from './AdminDashboard.module.css'

type Props = {
  children: React.ReactNode
}


const DashboardLayout = (props: Props) => {
  const [showModal, setShowModal] = useState(false)
  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setShowModal(!showModal)
  }
  
  const handleLeave = () => {
    setShowModal(!showModal)
  }
  
  const handleHover = () => {
    setShowModal(true)
  }

  return (
    <div className={classes.admin_wapper}>
      <div style={{ width: '100%' }}>
        <NavBar handleClick={handleClick} handleLeave={handleLeave} handleHover={handleHover} showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div className={classes.admin_dashboard_container}>
        <SideBar />
        <div  style={{ overflow: 'scroll', width: '100%'}}>{props.children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout

// function DashboardLayout(props:any): JSX.Element {

//     return (
//       <div className="App">

//         <nav></nav>
//         <div></div>
//         <div>{props.children}</div>
//       </div>
//     );
//   }

//   export default DashboardLayout;