import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Map from '../components/map'
import 'bulma'

const Brows = () => {

  const [items, updateItems] = useState([])
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

  function handleSelectedItem({ id, title, category, note, image, user_id, bookings }) {
    const itemDetails = {
      id: id,
      title: title,
      category: category,
      note: note,
      facilities: facilities,
      description: description,
      image: image,
      user_id: user_id,
      bookings: bookings
    }
    updateselectedLocation(itemDetails)
    if (!sideCard) {
      revealSideCard(true)
    }
  }

  useEffect(() => {
    axios.get('/api/items')
      .then(axiosRes => {
        updateItems(axiosRes.data)
        console.log(axiosRes.data)
      })
  }, [])
  return (
    <main>
      <div className='toggle-container'>
        <button className='toggle' onClick={() => updateToggle(true)}>Grid</button>
        <button className='toggle' onClick={() => updateToggle(false)}>Map</button>
      </div>
      {toggle ?
        <section className="section">
          <div className="container mb-3">
            <div className='columns'>
              <div className={!sideCard ? 'column' : 'column is-two-thirds'}>
                <div className="columns is-multiline">
                  {items.map((item) => {
                    return <div key={item._id} className={!sideCard ? 'column is-one-third' : 'column is-half'} >
                      <div className="card cardHeight" id={selectedItem.id === item.id ? 'selected' : 'cardHover'} onClick={() => handleSelectedItem(item)}>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4 titleHeight">{item.title}</p><br></br>
                              <p className="subtitle is-6">Categor y{item.category}</p>
                              <p className="subtitle is-6">Owner: {item.user_id}</p>
                              <p className="subtitle is-6">Note: {item.note}</p>
                              <p className="subtitle is-6">Description: {item.description}</p>
                              <figure className="image is-3by2 mb-2">
                                <img src={item.image} alt={item.title} />
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
                        {/* <p className="subtitle is-6">{'Description: ' + selectedLocation.facilities.description}</p> */}
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
        <Map
        // long={long}
        // lat={lat}
        // zoom={zoom}
        // coordinate={items.map((coordinate) => {
        //   return { coordinate: coordinate.location, id: coordinate._id }
        // })}
        />
      }
    </main >
  )
}

export default Brows