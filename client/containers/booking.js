import React, { useState } from 'react'
import Form from '../components/form'
import DateTimePicker from 'react-datetime-picker'
import useAxios from '../hooks/useAxios'

export default function Booking({ match, location}) {

    //   item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    // owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    // borrower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    // start_date = db.Column(db.DateTime, nullable=False)
    // end_date = db.Column(db.DateTime, nullable=False)
    // owner_decision = db.Column(db.Boolean, nullable=True)
    // borrower_decision = db.Column(db.Boolean, nullable=True)
    // approval_status = db.Column(db.Boolean)
  // console.log(match)
  // console.log(location)
  const params = new URLSearchParams(location.search)
  const itemId = params.get('item')

  const axiosConfig = {
    method: 'get',
    url: `/api/items/${itemId}`
  }

  const { loading: itemLoading, results: itemResults, error: itemError } = useAxios(axiosConfig)

  const [startDate, updateStartDate] = useState(new Date())
  const [endDate, updateEndDate] = useState(new Date())


  const [bookingForm, updateBookingForm] = useState({
    itemId: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    ownerId: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    borrowerId: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    startDate: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    endDate: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    ownerDecision: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    },
    borrowerDecision: {
      label: 'Item',
      element: 'input',
      type: 'text',
      placeholder: 'Enter an item name',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    }
  
    // approvalStatus: {
    //   label: 'Item',
    //   element: 'input',
    //   type: 'text',
    //   placeholder: 'Enter an item name',
    //   value: '',
    //   validation: {
    //     required: true
    //   },
    //   dirty: false
    // }
  
  })

  return (
    <div className={'container'}>
      <h1>Booking</h1>
      <h2>{itemResults.title}</h2>
      <h2>Borrowing Start Date</h2>
      <DateTimePicker onChange={updateStartDate} value={startDate}/>

    </div>
  )
}
