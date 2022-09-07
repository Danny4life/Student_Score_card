import axios from 'axios'
import React,{useState, useEffect} from 'react'
import {HiArrowNarrowLeft} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {UserTable} from "../component"

type ViewAllUsersProps = {}

const BASEURL = process.env.REACT_APP_BASEURL;

function ViewAllUsers(props: ViewAllUsersProps) {
const [users,setUsers] = useState([])

const fetchUsers = async () =>{
  const response = await axios.get(`${BASEURL}/admin/all_decadev`)
  setUsers(response.data);
}


useEffect(()=>{
  fetchUsers();
}, [])


  return (
    <div style={{ width: '70rem', margin: '3rem 1rem'}}>
      <div  style ={{marginLeft: 'calc(10% - 4rem)', color: "#03435F"}}>
        {/* <p style={{ cursor: 'pointer' }} onClick={() => { navigate('/admin-dashboard/create_admin') }}> <HiArrowNarrowLeft /> Go back</p> */}

        <Link to="/admin-dashboard/user" style={{  color: "#03435F",textDecoration:"none",cursor:"pointer",fontSize:"1.3rem"}}><HiArrowNarrowLeft/> Go back</Link>
        <h1 style={{ color: "#03435F" }}>All Users</h1>
      </div>

    <UserTable 
    tableData={users}
    />

    </div>
  )
};

export default ViewAllUsers