import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import mapStyle from '../styles/mapStyle'
import Geocode from 'react-geocode'

// ! Search component start here
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import '../styles/map.scss'
import { useLocation } from '../contexts/LocationProvider'
// ! Search componenet ends here

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_KEY}`)

const MapConfig = () => {

  const { getLocationFromPostcode } = useLocation()
  const [items, updateItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [selectedLocation, updateSelectedLocation] = useState({})
  // const [selectedLocation, updateSelectedLocation] = useState({})
  const [showWindow, updateShowWindow] = useState(false)
  // const [address, setAddress] = useState('')
  const [coord, setCoord] = useState({
    lat: 51.5073509,
    lng: -0.1277583
  })

  useEffect(() => {
    axios.get('/api/items').then(({ data }) => {
      data.forEach(item => {
        getLocationFromPostcode(item.postcode).then((res) => {
          if (res.lat) {
            item.lat = res.lat
            item.lng = res.lng
          }
        })
      })
      console.log(data)
      updateItems(data)
    }) 
      
  }, [])

  // console.log(items)

  const markers = items.map((item, i) => {

    const onMarkerClick = (e) => {
      console.log(e)
      console.log(item)
      setSelectedItem(item)
      // setCoord({ lat: item.lat, lng: item.lng })
    }


    if (item.lat) {
      console.log(item.lat, item.lng)
      return <Marker
      key={item.id}
      position={{
        lat: item.lat,
        lng: item.lng
      }}
      onClick={e => onMarkerClick(e)}
    />  
    }
    return null
    
  })

  let selectedItemWindow

  // if (selectedItem.id) {
  //   selectedItemWindow = <InfoWindow
  //     onCloseClick={() => {
  //         setSelectedItem({});
  //       }}
  //       visible={true}
  //       position={{
  //         lat: selectedItem.lat,
  //         lng: selectedItem.lng
  //       }}><div>{selectedItem.title}</div>
  //     </InfoWindow>
  // }


  // ! Search componenet start here

  // const handleSelect = async (value) => {
  //   const result = await geocodeByAddress(value)
  //   const latLng = await getLatLng(result[0])
  //   setAddress(value)
  //   // setCoord(latLng)
  // }

  return (
    <>
      {/* <PlacesAutocomplete
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
      </PlacesAutocomplete> */}

      <input type='text' placeholder='Postcode' />

      <GoogleMap
        defaultZoom={15}
        center={{ lat: coord.lat, lng: coord.lng }}
        defaultOptions={{ styles: mapStyle }}
      >
        {markers}
        {selectedItemWindow}

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
