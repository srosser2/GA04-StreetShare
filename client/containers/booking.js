import React, { useState } from 'react'
import Form from '../components/form'
import DateTimePicker from 'react-datetime-picker'
import useAxios from '../hooks/useAxios'
import { getLoggedInUser } from '../lib/auth'
import axios from 'axios'


export default function Booking({ match, location}) {

  const token = localStorage.getItem('token')


  // ! Some starter code for your frontend, change this
  // ! however you like.
  const loggedInUser = getLoggedInUser()

  const params = new URLSearchParams(location.search)
  const itemId = params.get('item')

  const axiosConfig = {
    method: 'get',
    url: `/api/items/${itemId}`
  }

  const { loading: itemLoading, results: itemResults, error: itemError } = useAxios(axiosConfig)

  const [startDate, updateStartDate] = useState(new Date())
  const [endDate, updateEndDate] = useState(new Date())



  const submitBookingRequestHandler = () => {
    if (startDate > endDate) {
      alert('End date must be after start date')
      return
    }

    const bookingObj = {
      itemId: itemResults.id,
      ownerId: itemResults.user_id,
      borrowerId: loggedInUser.sub,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      borrowerDecision: true
    }

    const axiosConfig = {
      url: '/api/bookings',
      method: 'post',
      data: bookingObj,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.request(axiosConfig).then(({ data }) => {
      console.log(data)
    })

  }

  return (
    <div className={'container'}>
      <h1>Booking</h1>
      <h2>{itemResults.title}</h2>
      <h2>Booking Start Date</h2>
      <DateTimePicker 
        minDate={new Date()}
        onChange={updateStartDate} 
        value={startDate}
        step={15}
        disableClock
        />
      <h2>Booking End Date</h2>
      <DateTimePicker 
        minDate={startDate || new Date()}
        onChange={updateEndDate} 
        value={endDate}
        step={15}
        disableClock
        />
      <button onClick={submitBookingRequestHandler}>Request Booking</button>
    </div>
  )
}


  // const [bookingForm, updateBookingForm] = useState({
  //   itemId: {
  //     label: 'Item',
  //     element: 'input',
  //     type: 'text',
  //     placeholder: 'Enter an item name',
  //     value: '',
  //     validation: {
  //       required: true
  //     },
  //     dirty: false
  //   },
  //   ownerId: {
  //     label: 'Item',
  //     element: 'input',
  //     type: 'text',
  //     placeholder: 'Enter an item name',
  //     value: '',
  //     validation: {
  //       required: true
  //     },
  //     dirty: false
  //   },
  //   borrowerId: {
  //     label: 'Item',
  //     element: 'input',
  //     type: 'text',
  //     placeholder: 'Enter an item name',
  //     value: '',
  //     validation: {
  //       required: true
  //     },
  //     dirty: false
  //   },
  //   startDate: {
  //     label: 'Item',
  //     element: 'input',
  //     type: 'text',
  //     placeholder: 'Enter an item name',
  //     value: '',
  //     validation: {
  //       required: true
  //     },
  //     dirty: false
  //   },
  //   endDate: {
  //     label: 'Item',
  //     element: 'input',
  //     type: 'text',
  //     placeholder: 'Enter an item name',
  //     value: '',
  //     validation: {
  //       required: true
  //     },
  //     dirty: false
  //   },
  //   ownerDecision: {
  //     label: 'Item',
  //     element: 'input',
  //     type: 'text',
  //     placeholder: 'Enter an item name',
  //     value: '',
  //     validation: {
  //       required: true
  //     },
  //     dirty: false
  //   },
  //   borrowerDecision: {
  //     label: 'Item',
  //     element: 'input',
  //     type: 'text',
  //     placeholder: 'Enter an item name',
  //     value: '',
  //     validation: {
  //       required: true
  //     },
  //     dirty: false
  //   }
  
  //   // approvalStatus: {
  //   //   label: 'Item',
  //   //   element: 'input',
  //   //   type: 'text',
  //   //   placeholder: 'Enter an item name',
  //   //   value: '',
  //   //   validation: {
  //   //     required: true
  //   //   },
  //   //   dirty: false
  //   // }
  
  // })