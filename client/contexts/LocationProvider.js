import React, { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Geocode from 'react-geocode'

const LocationContext = React.createContext()

export const useLocation = () => {
  return useContext(LocationContext)
}


Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_KEY}`)

export const LocationProvider = ({ children }) => {

  const getLocationFromPostcode = async (postcode) => {
    try {
      const a = await Geocode.fromAddress(postcode)
      return (a.results[0].geometry.location)
    } catch (err) {

      console.log(err)
      return
    }

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

