import React from 'react'
import axios from 'axios'
import moment from 'moment'

export default function BorrowingTab({ borrowedItems, showSideDrawHandler }) {

  const token = localStorage.getItem('token')

  const orderedBorrowedItems = borrowedItems.sort((a, b) => a.startDate - b.startDate)
  
  const borrowedItemsTableBody = orderedBorrowedItems.map(booking => {

    const confirmBooking = (decision) => {
      console.log(`/bookings/${booking.id}`)
      
      axios.request({
        url: `/api/bookings/${booking.id}`,
        method: 'put',
        data: {
          ownerDecision: decision
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        console.log(data)
      })
    }

    let status

    if (new Date(booking.endDate) < new Date()) {
      status = 'Completed'
    }
    if (new Date(booking.startDate) > new Date()) {
      status = 'Awaiting Collection'
    }
    if (new Date(booking.startDate) > new Date() && new Date(booking.endDate) < new Date()) {
      status = 'Currently borrowing'
    }

    return <tr key={booking.id} className={'table-row'} >
      
      <td>{booking.itemId}</td>
      <td>{booking.ownerId}</td>
      <td>
        <div>
          <span style={{ display: 'block'}}>{moment(new Date(booking.startDate)).format('LT')}</span>
          <span>{moment(new Date(booking.startDate)).format('LL')}</span>
        </div>
      </td>
      <td>
        <div>
          <span style={{ display: 'block'}}>{moment(new Date(booking.endDate)).format('LT')}</span>
          <span>{moment(new Date(booking.endDate)).format('LL')}</span>
        </div>
      </td>
      <td>
        {status}
      </td>
    </tr>
  })

  return (
  <>
    <div>
      <h2>My Borrowed Items</h2>
    </div>
    <div>
      <table className={'item-table'}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Borrower</th>
            <th>From</th>
            <th>Until</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {borrowedItemsTableBody}
        </tbody>
      </table>
    </div>
  </>
  )
}
