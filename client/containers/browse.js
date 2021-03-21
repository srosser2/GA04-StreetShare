import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Map from '../components/googleMap'
import GMap from '../components/gMap'
import Footer from '../components/footer'
import Search from '../components/search'
import { getLocationFromPostcode } from '../contexts/LocationProvider'
import { useLocation } from 'react-router-dom'

// import 'bulma'

const Browse = ({ history }) => {

  const location = useLocation()

  const [items, updateItems] = useState([])
  const [users, updateUser] = useState([])
  const [toggle, updateToggle] = useState(false)
  const [sideCard, revealSideCard] = useState(false)
  const [selectedItem, updateselectedItem] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    note: '',
    image: '',
    user_id: '',
    bookings: ''
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    console.log('location updated')

    axios.post(`/api/items/search/${params.get('search')}`).then(({ data }) => {
      updateItems(data)
    })
  }, [location, history])

  // console.log(items)

  function handleSelectedItem({ id, title, category, note, image, user_id, bookings }) {
    const itemDetails = {
      id: id,
      title: title,
      category: category,
      note: note,
      // description: description,
      image: image,
      user_id: user_id,
      bookings: bookings,
    }
    // updateselectedLocation(itemDetails)
    if (!sideCard) {
      revealSideCard(true)
    }
  }

  useEffect(() => {
    const reqOne = axios.get('/api/items')
    const reqTwo = axios.get('/api/users')
    axios.all([reqOne, reqTwo])
      .then(axios.spread((...responses) => {
        updateItems(responses[0].data)
        updateUser(responses[1].data)
      }))
  }, [])

  useEffect(() => {
    console.log(selectedItem)
  }, [selectedItem])

  const updateMarkerById = (id) => {
    const item = items.find(item => item.id === id)
    console.log(item)
    updateselectedItem(item)
  }

  // const searchSubmitHandler = (e) => {
  //   e.preventDefault()
  //   if (e.target.children[0].value.length <= 0) return
  //   const query = e.target.children[0].value
  //   history.push(`/browse?search=${query}`)
  // }

   if(items.length > 0) {
     console.log(items)
   }
   

  return (
    <>
      <main style={{ position: 'relative'}}>

      {/* <Search onSearchSubmit={searchSubmitHandler}/> */}

        <div className='toggle-container'>
          <button className={ toggle ? 'toggle toggle-selected' : 'toggle'} onClick={() => updateToggle(true)}>
            <span class="material-icons">grid_view</span>
          </button>
          <button className={ !toggle ? 'toggle toggle-selected' : 'toggle'} onClick={() => updateToggle(false)}>
            <span class="material-icons">map</span>
          </button>
        </div>
        
        {toggle ?
          <section className="section">
            <div className="container mb-3">
              <div className='columns'>
                <div className={!sideCard ? 'column' : 'column is-two-thirds'}>
                  <div className="columns is-multiline">
                    {items.map((item) => {
                      return <div key={item.id} className={!sideCard ? 'column is-one-third' : 'column is-half'} onClick={() => history.push(`/items/${item.id}`)}>
                        <div className="card cardHeight" id={selectedItem.id === item.id ? 'selected' : 'cardHover'} onClick={() => handleSelectedItem(item)}>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <p className="title is-4 titleHeight">{item.title}</p>
                                <p className="subtitle is-6">Category {item.category}</p>
                                {users.map((user) => {
                                  if (user.id === item.user_id) {
                                    return <div key={user.id}>
                                      <p className="subtitle is-6">Owner: {user.firstName + ' ' + user.lastName}</p>
                                      <p className="subtitle is-6">Address: {user.address}</p>
                                      <p className="subtitle is-6">Rating: {user.rating}</p>
                                    </div>
                                  }
                                })}
                                <p className="subtitle is-6">Note: {item.note}</p>
                                {/* <p className="subtitle is-6">Description: {item.description}</p> */}
                                <figure className="image is-3by2 mb-2">
                                  <img src={item.image} alt={item.title} style={{ objectFit: 'contain'}} />
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
                {sideCard && <div className="column is-one-third">
                  <div className='card' id='fixed'>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <button className='delete is-pulled-right' onClick={() => closeModal()} />
                          <p className="title is-4">{selectedItem.title}</p>
                          <img src={selectedItem.image} alt={selectedItem.title} />
                          <p className="subtitle is-6">{selecteditem.title}</p>
                          <Link className='button is-info is-hovered' to={`/location/${selectedItem.id}`}>Go to Item</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </section>
          :
          // <Map
          //   latAndLng={
          //     items.map((corrdinat) => {
          //       return { lat: corrdinat.lat, lng: corrdinat.lng }
          //     })
          //   }
          // />
          <section className={'map-container'}>

            <GMap 
              markers={items} 
              selectedItem={selectedItem}
              markerCallback={(markerId) => updateMarkerById(markerId)}
              config={{  
                zoom: 13,
                center: { 
                  lat: items.length > 0 ? items[0].lat : 51.4794807434082, 
                  lng: items.length > 0 ? items[0].lng : -0.14235636591911316 
                  }
                }}
              />
          
          </section>
          
        }
      </main >
      <Footer />
    </>
  )
}

export default Browse