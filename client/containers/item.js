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

  const contactButtons = <div>
      <button className={'btn btn-primary'} onClick={() => console.log('Contact the owner - redirect to inbox')}>Contact owner</button>
      <button className={'btn'} onClick={() => history.push(`/booking?item=${results.id}`)}>Arrange booking</button>
    </div>

  return <div className={'item-container'}>
    <div className='item-inner-container'>
      <div className='item-details'>
        <h1>{results.title}</h1>
        <p>{results.postcode}</p>
        <p>{results.description}</p>
        <p>{results.note}</p>
        {results.user_id === currentUser.sub ? 'your stuff': contactButtons}
      </div>

      <div className={'item-image-container'}>
        <img src={results.image} alt={results.title} className={''} style={{ objectFit: 'contain', width: '400px', height: '400px'}}/>
      </div>
      
    </div>
   
    
    
    

    

  </div>
}

export default Item