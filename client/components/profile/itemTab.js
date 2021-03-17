import React from 'react'

import { getLoggedInUser } from '../../lib/auth'

export default function ItemTab({ items, showSideDrawHandler, match }) {

  const currentUser = getLoggedInUser()

  // let id = match.params.id.split('?')[0]

  console.log(match.params)
  // console.log(currentUser.sub)

  let uploadButton
  // if (currentUser.sub === Number(match.params.id)) {
  //   uploadButton = <button onClick={() => showSideDrawHandler(true)}>Upload new item</button>
  // }


  const itemTable = items.map(item => {
    return <tr key={item.id} className={'table-row'} >
      <td>
        <div className={'table-row-item'}>
          <div className={'table-image-container'}>
            <img src={item.image} />
          </div>
          <p>{item.title}</p>
        </div>
      </td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>Status</td>
    </tr>
  })

  return (
  <>
    <div>
      <h2>My Items</h2>
      {uploadButton}
    </div>
    <div>
      <table className={'item-table'}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {itemTable}
        </tbody>
      </table>
    </div>
  </>
  )
}
