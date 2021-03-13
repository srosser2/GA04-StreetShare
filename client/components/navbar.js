import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ history }) => {

  return <div className={'navbar-container'}>
    <div className={'navbar-container-left'}>
      <p>Logo</p>
    </div>
    <div className={'navbar-container-right'}>
      <ul className={'nav-links-container'}>
        <li><NavLink to={'/inbox'}>Inbox</NavLink></li>
        <li><NavLink to={'/profile/1'}>Profile</NavLink></li>
        <li><NavLink to={'/browse'}>Browse</NavLink></li>
      </ul>
    </div>
  </div>
}

export default NavBar