import React, { useState, useEffect } from 'react'
import 'bulma'

import { getLoggedInUser } from '../lib/auth'
import useAxios from '../hooks/useAxios'

const Item = ({ match, history }) => {

  const currentUser = getLoggedInUser()

  const axiosConfig = {
    url: `/api/items/${match.params.id}`,
    method: 'get'
  }

  const { loading, results, error } = useAxios(axiosConfig)

  // Display something while loading
  if (loading) {
    return <h1>Loading</h1>
  }

  // If user is not found
  if (!results.id) {
    return <h1>Item not found</h1>
  }

  return <div className={'container'} style={{ maxWidth: '720px'}}>
    <h1>{results.title}</h1>
    <p>{results.description}</p>
    <div>
      <img src={results.image} alt={results.title} className={''} style={{ objectFit: 'contain', width: '400px', height: '400px'}}/>
    </div>
    <div>
      <button onClick={() => console.log('Contact the owner - redirect to inbox')}>Contact owner</button>
      <button onClick={() => history.push(`/booking?item=${results.id}`)}>Arrange booking</button>
    </div>
    <p>{results.note}</p>

  </div>
}

export default Item