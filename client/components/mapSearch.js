–// import React, { useState } from 'react'
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

// const Search = () => {
//   const [address, setAddress] = useState('')
//   const [coord, setCoord] = useState({
//     lat: null,
//     lng: null
//   })

//   const handleSelect = async (value) => {
//     const result = await geocodeByAddress(value)
//     const latLng = await getLatLng(result[0])
//     setAddress(value)
//     setCoord(latLng)
//     console.log(result)
//   }
//   return (
//     <PlacesAutocomplete
//       value={address}
//       onChange={setAddress}
//       onSelect={handleSelect}
//     >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//       <div>
//         <p>Latitude :{coord.lat}</p>
//         <p>Longitude :{coord.lng}</p>
//         <input {...getInputProps({ placeholder: 'Type address' })} />
//         <div>
//           {loading ? <div>...loading</div> : null}
//           {suggestions.map(suggestion => {
//             const style = {
//               backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
//             }
//             return <div {...getSuggestionItemProps(suggestion, { style })}>
//               {suggestion.description}
//             </div>
//           })}
//         </div>
//       </div>
//     )}
//     </PlacesAutocomplete>
//   )
// }
// export default Search