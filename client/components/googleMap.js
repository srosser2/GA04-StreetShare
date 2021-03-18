import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import Geocode from 'react-geocode'
import mapStyle from '../styles/mapStyle'
// import Geocode from 'react-geocode'

// ! Search component start here
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import '../styles/map.scss'
import { useLocation } from '../contexts/LocationProvider'
// ! Search componenet ends here

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_KEY}`)

const MapConfig = () => {

  const [selectedItem, setSelectedItem] = useState(null)
  const [items, updateItems] = useState([])

  useEffect(() => {
    axios.get('/api/items')
      .then(axiosResp => {
        updateItems(axiosResp.data)
      })
  }, [])

  const { getLocationFromPostcode } = useLocation()

  getLocationFromPostcode('se15 4jz')

  // ! Search componenet start here
  const [address, setAddress] = useState('')
  const [coord, setCoord] = useState({
    lat: 51.5073509,
    lng: -0.1277583
  })

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value)
    const latLng = await getLatLng(result[0])
    setAddress(value)
    setCoord(latLng)
  }

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='search-container'>
          <input className='search-input' {...getInputProps({ placeholder: 'Type address' })} />
          <div>
            {loading ? <div>...loading</div> : null}
            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
              }
              return <div {...getSuggestionItemProps(suggestion, { style })}>
                {suggestion.description}
              </div>
            })}
          </div>
        </div>
      )}
      </PlacesAutocomplete>

      <GoogleMap
        defaultZoom={10}
        center={coord ? { lat: coord.lat, lng: coord.lng } : { lat: 51.5073509, lng: -0.1277583 }}
        defaultOptions={{ styles: mapStyle }}
      >
        {
          items.map((item, i) => {
            return <Marker
              key={i}
              position={{
                lat: Number(item.lat),
                lng: Number(item.lng)
              }}
              onClick={() => {
                setSelectedItem(item)
              }}
            />
          })
        }
        {
          selectedItem && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedItem(null);
              }}
              position={{
                lat: selectedItem.lat,
                lng: selectedItem.lng
              }}
            >
              <div style={{ width: '200px' }}>
                <p>Owner: {selectedItem.firstName + ' ' + selectedItem.lastName}</p>
                <h2>{selectedItem.address}</h2>
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
              </div>
            </InfoWindow>
          )
        }
      </GoogleMap >
    </>
  )
}

const MapWrapped = withScriptjs(withGoogleMap(MapConfig));
const Map = () => {
  return (
    <>
      <div style={{ width: "90vw", height: "80vh", borderRadius: '20px', boxShadow: '0 5px 8px -2px black', margin: '50px auto ' }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `90%` }} />}
          containerElement={<div style={{ height: '98%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </>
  )
}

export default Map
