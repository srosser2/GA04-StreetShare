import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Search from './search'
import { useHistory } from "react-router-dom"

const NavBar = () => {
  const [logging, updateLogging] = useState(false)

  const history = useHistory()

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

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (e.target.children[0].value.length <= 0) return
    const query = e.target.children[0].value
    console.log(history)
    history.push(`/browse?search=${query}`)
  }

  return <div className={'navbar-container'}>
    <div className={'navbar-container-left'}>
      <NavLink className={'logo'} to={'/'}>Street Share</NavLink>
      <Search onSearchSubmit={searchSubmitHandler}/>
    </div>
    <div className={'navbar-container-right'}>
      <ul className={'nav-links-container'}>
        <li><NavLink to={'/profile/1'}>Profile</NavLink></li>
        <li><NavLink to={'/browse'}>Browse</NavLink></li>
        {!logging && <li><NavLink to={'/register'}>Register/Log In</NavLink></li>}
        {logging && <li> <NavLink to={'/register'} onClick={logOut}>Log Out</NavLink></li>}
      </ul>
    </div>
  </div>
}

export default NavBar