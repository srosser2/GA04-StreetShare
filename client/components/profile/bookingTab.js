import React from 'react'
import axios from 'axios'
import moment from 'moment'

export default function BookingTab({ bookings, showSideDrawHandler }) {

  const token = localStorage.getItem('token')

  const orderedBookings = bookings.sort((a, b) => a.startDate - b.startDate)
  
  const bookingTableBody = orderedBookings.map(booking => {

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

    let bookingStatus

    if (booking.ownerDecision === true) {
      bookingStatus = 'Approved'
    }
    if (booking.ownerDecision === false) {
      bookingStatus = 'Declined'
    }

    return <tr key={booking.id} className={'table-row'} >
      {/* <td>
        <div className={'table-row-item'}>
          <div className={'table-image-container'}>
            <img src={booking.itemId} />
          </div>
          <p>{booking.title}</p>
        </div>
      </td> */}
      <td>{booking.itemId}</td>
      <td>{booking.borrowerId}</td>
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
      <td>{booking.ownerDecision === null ? 
        <div>
          <button onClick={() => confirmBooking(true)}>Approve</button> 
          <button onClick={() => confirmBooking(false)}>Decline</button>
        </div>
         : bookingStatus }</td>
    </tr>
  })

  return (
  <>
    <div>
      <h2>My Items</h2>
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
          {bookingTableBody}
        </tbody>
      </table>
    </div>
  </>
  )
}
