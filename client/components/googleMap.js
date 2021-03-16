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

// ! Search component start here
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import '../styles/map.scss'
// ! Search componenet ends here

const MapConfig = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [coordinate, updateCoordinate] = useState([])
  useEffect(() => {
    axios.get('/api/items')
      .then(axiosResp => {
        updateCoordinate(axiosResp.data)
      })
  }, [])
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
          {/* <p>Latitude :{coord.lat}</p>
          <p>Longitude :{coord.lng}</p> */}

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
          coordinate.map((coor, i) => {
            return <Marker
              key={coor.lat}
              position={{
                lat: coor.lat,
                lng: coor.lng
              }}
              onClick={() => {
                setSelectedItem(coor)
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
<<<<<<< HEAD
    <>
      <div style={{ width: "90vw", height: "80vh", borderRadius: '20px', boxShadow: '0 5px 8px -2px black', margin: '50px auto ' }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KE}`}
          loadingElement={<div style={{ height: `90%` }} />}
          containerElement={<div style={{ height: '98%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </>
  )
=======
    <div style={{ width: "90vw", height: "80vh", borderRadius: '20px', boxShadow: '0 5px 8px -2px black', margin: '50px auto ' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `90%` }} />}
        containerElement={<div style={{ height: '98%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
>>>>>>> fd6f17639b031d8b1dd41e32485c21e4ec1b0de5
}

export default Map
