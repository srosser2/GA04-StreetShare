import React from 'react'

export default function ItemTab({ items, showSideDrawHandler }) {
  
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
      <button onClick={() => showSideDrawHandler(true)}>Upload new item</button>
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
