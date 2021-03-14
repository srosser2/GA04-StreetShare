// import React from 'react'
// import ReactMapGL, { Marker } from 'react-map-gl'
// import Pin from '../assets/pin1.png'


// const Map = ({ long, lat, zoom, coordinate }) => {
//   const [viewport, setViewport] = React.useState({
//     width: '88vw',
//     height: '70vh',
//     latitude: lat,
//     longitude: long,
//     zoom: 10
//   })

//   return (
//     <>
//       <div className="map-container mg-large" style={{ width: '93vw', height: '80vh', display: 'flex', justifyContent: 'center', borderRadius: '20px', margin: '100px auto 0 auto ', boxShadow: '0 5px 8px -2px black' }}>
//         <ReactMapGL
//           {...viewport}
//           onViewportChange={(viewport) => setViewport(viewport)}
//           mapboxApiAccessToken={'pk.eyJ1IjoieXVzdWY5NjMiLCJhIjoiY2traTc5N2cxMWtscjJ3cXRycHVxbnM5ayJ9.ZyAS9QfUaYL-HexSX-UVDQ'}

//         >
{/* {coordinate.map((coor) =>
            <Marker
              key={coor.id}
              latitude={coor.coordinate.lat}
              longitude={coor.coordinate.long}
            >
              <Link to={`/location/${coor.id}`}><img width={30} src={Pin} /></Link>
            </Marker>
          )} */}
//         </ReactMapGL >
//       </div>
//     </>
//   )
// }

// export default Map