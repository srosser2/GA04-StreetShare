import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = ({ match }) => {

  const [userData, updateUserData] = useState({
    // firstName: {},
    // lastName: {},
    // address: {},
    // profilePic: {}
  })
  const [itemsData, updateItemsData] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${match.params.id}`)
      .then(({ data }) => {
        console.log(data)
        updateUserData(data)
        updateItemsData(data.items)
      })
  }, [])

  const userItems = itemsData.map(item => {
    return <div key={item.id}>
      <h4>{item.title}</h4>
      <p>{item.category}</p>
      <p>{item.description}</p>
      <img src={item.image} />
    </div>
  })

  return <div>
    <h1>{userData.firstName} {userData.lastName}</h1>
    <h2>{userData.address}</h2>
    {userItems}
  </div>
}

export default Profile