import React, { useState, useEffect } from 'react'
import 'bulma'

import { getLoggedInUser } from '../lib/auth'
import useAxios from '../hooks/useAxios'

const Item = ({ match }) => {

  const currentUser = getLoggedInUser()

  const { loading, results, error } = useAxios(`/api/items/${match.params.id}`, 'get')

  // Display something while loading
  if (loading) {
    return <h1>Loading</h1>
  }

  // If user is not found
  if (!results.id) {
    return <h1>Item not found</h1>
  }

  return <div className={'container'}>
    <h1>{results.title}</h1>
    <p>{results.description}</p>
    <div className={'image is-16by9 is-fullwidth'}>
      <img src={results.image} alt={results.title} className={''}/>
    </div>
    <div>
      <button onClick={() => console.log('Contact the owner - redirect to inbox')}>Contact owner</button>
      <button onClick={() => console.log('Arrange booking - redirect to booking form.')}>Arrange booking</button>
    </div>
    <p>{results.note}</p>

  </div>
}

export default Item