import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ history }) => {
  const [logging, updateLogging] = useState(false)

  useEffect(() => {
    const handleLogin = () => {
      const token = localStorage.getItem('token')
      if (token) {
        updateLogging(true)
      }
    }
    handleLogin()
  }, [])

  const logOut = () => {
    localStorage.removeItem('token')
    updateLogging(false)
  }

  return <div className={'navbar-container'}>
    <div className={'navbar-container-left'}>
      <p className={'logo'}>Street Share</p>
    </div>
    <div className={'navbar-container-right'}>
      <ul className={'nav-links-container'}>
        <li><NavLink to={'/inbox'}>Inbox</NavLink></li>
        <li><NavLink to={'/profile/1'}>Profile</NavLink></li>
        <li><NavLink to={'/browse'}>Browse</NavLink></li>
        {!logging && <li><NavLink to={'/register'}>Register/Log In</NavLink></li>}
        {logging && <li> <NavLink to={'/register'} onClick={logOut}>Log Out</NavLink></li>}
      </ul>
    </div>
  </div>
}

export default NavBar