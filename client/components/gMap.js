import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useGoogleMap, useMap } from "../hooks/useGoogleMap.js";
const API_KEY = process.env.REACT_APP_GOOGLE_KEY



const GMap = ({ markers, selectedItem, markerCallback, config }) => {
  // console.log(selectedItem)
  const googleMap = useGoogleMap(API_KEY);
  const mapContainerRef = useRef(null);


  const initialConfig = config;
  // const markerCallback = () => null

  const infoWindowContent = <div>
    <div>{selectedItem.title}</div>
    <div>{'selectedItem.title'}</div>
    <div>{selectedItem.category}</div>
    <div></div>
  </div>

  // console.log(infoWindowContent)

  useMap({ googleMap, mapContainerRef, initialConfig, markers, markerCallback, selectedItem });
  return (
    <div
      style={{
        height: "80vh",
        width: "80%"
      }}
      ref={mapContainerRef}
    />
  );
};

export default GMap;
