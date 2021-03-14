import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyle from '../styles/mapStyle'


const MapConfig = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [coordinate, updateCoordinate] = useState([])

  useEffect(() => {
    axios.get('/api/items')
      .then(axiosResp => {
        updateCoordinate(axiosResp.data)
        console.log(axiosResp.data)
      })
  }, [])

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 51.525860, lng: -0.072040 }}
      defaultOptions={{ styles: mapStyle }}
    >

      {coordinate.map((coor, i) => {
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
      })}
      {selectedItem && (
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
      )}
    </GoogleMap>

  )
}

const MapWrapped = withScriptjs(withGoogleMap(MapConfig));

const Map = () => {
  return (
    <div style={{ width: "90vw", height: "80vh", borderRadius: '20px', boxShadow: '0 5px 8px -2px black', margin: '50px auto ' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `90%` }} />}
        containerElement={<div style={{ height: '98%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default Map
