import React, { useState, useEffect } from "react"
import GoogleMapsApiLoader from "google-maps-api-loader"
import ReactDOMServer from 'react-dom/server';
import { getLocationFromPostcode } from '../contexts/LocationProvider'
import Geocode from 'react-geocode'

const useGoogleMap = apiKey => {
  const [googleMap, setGoogleMap] = useState(null);
  useEffect(() => {
    GoogleMapsApiLoader({ apiKey }).then(google => {
      setGoogleMap(google)
    });
  }, []);
  return googleMap
};

const useMap = ({ googleMap, mapContainerRef, initialConfig, markers, markerCallback, selectedItem }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
      if (!googleMap || !mapContainerRef.current) {
        return;
      }
      const map = new googleMap.maps.Map(
        mapContainerRef.current,
        initialConfig
      )

      markers.forEach(async (marker) => {
        const location = await Geocode.fromAddress(marker.postcode)



        // console.log(location.results)
        if(location.results.length > 0) {
          const l = location.results[0].geometry.location

          const m = new googleMap.maps.Marker({
          position: { lat: l.lat, lng: l.lng },
          map: map
          })
          const a = `<div>${marker.title}</div>`

            // console.log(selectedItem.title)

          const infoWindow = new googleMap.maps.InfoWindow({
                content: a
          })
          m.addListener('click', (e) => {
            markerCallback(marker.id)
            infoWindow.setPosition(e.latLng);
            infoWindow.open(map);         
        })
        }
        
        
      })



      // markers.forEach(marker => {
      //   console.log(marker)
      // })
      // marker
      // const marker = new googleMap.maps.Marker({
      //   position: initialConfig.center,
      //   map: map
      // });

      // const marker2 = new googleMap.maps.Marker({
      //   position: { lat: 51.5, lng: -0.14235636591911316 },
      //   map: map
      // });
    
      // marker.addListener("click", () => {
      //   InfoWindow.open(map, marker);
      // });
      setMap(map);
    },
    [googleMap, mapContainerRef, markers]
  );
  return map;
};

export { useGoogleMap, useMap };