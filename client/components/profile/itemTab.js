import React from 'react'

import { getLoggedInUser } from '../../lib/auth'

export default function ItemTab({ items, showSideDrawHandler, match }) {

  const currentUser = getLoggedInUser()

 
  let uploadButton
  // if (currentUser.sub === Number(match.params.id)) {
    uploadButton = <button onClick={() => showSideDrawHandler(true)}>Upload new item</button>
  // }


  // const itemTable = items.map(item => {
  //   return <tr key={item.id} className={'table-row'} >
  //     <td>
  //       <div className={'table-row-item'}>
  //         <div className={'table-image-container'}>
  //           <img src={item.image} />
  //         </div>
  //         <p>{item.title}</p>
  //       </div>
  //     </td>
  //     <td>{item.category}</td>
  //     <td>{item.description}</td>
  //     <td>Status</td>
  //   </tr>
  // })

  const itemCards = items.map(item => {
    return <div className={'item-card'}>
      <div className={'item-card-head'}>
        <div className={'item-card-image'}>
          <img src={item.image} />
        </div>
        
        <div className={''}>
          <span class="material-icons">more_vert</span>
        </div>
      </div>
      <div className={'item-card-body'}>
        <h2>{item.title}</h2>
        {/* <p>{item.category}</p> */}
        <div className={'item-card-category'}>
          <p>Home</p>
        </div>
      </div>
      
    </div>
  })

  return (
  <>
    <div className={'tab-header'}>
      <h2>My Items</h2>
      {uploadButton}
    </div>
    <div className={'item-card-container'}>
      {/* <table className={'item-table'}>
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
      </table> */}
      {itemCards}
    </div>
  </>
  )
}
