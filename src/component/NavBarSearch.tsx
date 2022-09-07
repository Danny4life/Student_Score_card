import React from 'react'
import { BsSearch } from "react-icons/bs"


import { SearchBar } from "../styling/css"
type Props = {}

const NavBarSearch = (props: Props) => {
 return (
  <div style={{display: 'flex', alignItems: 'center', background: '#F8F9FA', border: '1px solid rgba(0, 0, 0, 0.05)'}}>
    <div style={{height: '1.15rem', width: '1.2rem', padding: '1rem', marginLeft: '1rem'}}>
      <BsSearch />
    </div>
    <SearchBar
    placeholder="Search"
    />
  </div>
 )
}

export default NavBarSearch