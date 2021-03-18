import React, { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Geocode from 'react-geocode'

const LocationContext = React.createContext()

export const useLocation = () => {
  return useContext(LocationContext)
}


Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_KEY}`)

export const LocationProvider = ({ children }) => {

  const getLocationFromPostcode = (postcode) => {
    const latLong = Geocode.fromAddress(postcode).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location
        console.log(lat, lng)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const value = {
    getLocationFromPostcode
  }
  
  return (
    <LocationContext.Provider value={value}>
      { children }
    </LocationContext.Provider>
  )

}

