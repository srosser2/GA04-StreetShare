import React, { useState, useEffect } from 'react'
// import axios from 'axios'

import { getLoggedInUser } from '../lib/auth'
import useAxios from '../hooks/useAxios'

const Profile = ({ match }) => {

  const currentUser = getLoggedInUser()

  const { loading, results, error } = useAxios(`/api/users/${match.params.id}`, 'get')

  // Display something while loading
  if (loading) {
    return <h1>Loading</h1>
  }

  // If user is not found
  if (!results.id) {
    return <h1>User not found</h1>
  }

  let loggedInUser

  if (results.id === currentUser.sub) {
    loggedInUser = <h3>Your profile</h3>
  }

  const userItems = results.items.map(item => {
    return <div key={item.id}>
      {loggedInUser}
      <h4>{item.title}</h4>
      <p>{item.category}</p>
      <p>{item.description}</p>
      <img src={item.image} />
    </div>
  })

  return <div>
    <h1>{results.firstName} {results.lastName}</h1>
    <h2>{results.address}</h2>
    {userItems}
  </div>
}

export default Profile