import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useAxios from '../hooks/useAxios'
import socket from '../lib/socket'
import { getLoggedInUser } from '../lib/auth'

import blankAvatar from '../assets/blank-avatar.png'
import Form from '../components/form'

const Inbox = ({ history, match }) => {

  const loggedInUser = getLoggedInUser()
  const token = localStorage.getItem('token')


  socket.on('hello world', () => {
    console.log('connected')
  })

  socket.on('hello world', () => {
    console.log('connected')
  })

  socket.on('connect_error', (err) => {
    console.log(err)
  })

  const config = {
    url: `/api/users/${loggedInUser.sub}/threads`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const { loading, results, error } = useAxios(config)
  const [currentThread, updateCurrentThread] = useState()

  const [messageForm, updateMessageForm] = useState({
    message: {
      label: '',
      element: 'textarea',
      type: 'text',
      placeholder: 'Enter your email',
      value: '',
      validation: {
        required: true
      },
      dirty: false
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...messageForm }
    updatedForm[name].value = value
    updateMessageForm(updatedForm)
  }

  const handleSelectChange = (e, name) => {
    const updatedForm = { ...messageForm }
    updatedForm[name].value = e.value
    updateMessageForm(updatedForm)
  }

  const formControls = {
    submit: {
      label: 'Send',
      handler: async () => {
        console.log(messageForm.message.value)   
      },
      classes: []
    }
  }

  const threadCards = results.map(thread => {
    return <div key={thread.id} className={'thread-card'} onClick={() => updateCurrentThread(thread.id)}>
        <div className={'thread-card-avatar'}>
          <img src={blankAvatar} className={'avatar'}/>
        </div>
        <div className={'thread-card-content'}>
          <h4>{thread.users[1].firstName} {thread.users[1].lastName}</h4>
          <p>{thread.messages[thread.messages.length - 1].content}</p>
        </div>
      </div>
  })

  let threadMessages

  if (results.length > 0 && results[currentThread]){
      const thread = results.find(thread => thread.id == currentThread)
      console.log(thread)
      threadMessages = thread.messages.map(message => {
        console.log(message)
        return <div key={message.id} className={'message-card'} >
            <div className={'message-card-avatar'}>
              {/* <img src={blankAvatar} className={'avatar'}/> */}
            </div>
            <div className={'message-card-content'}>
              <h4>{message.user_id}</h4>
              <p>{message.content}</p>
            </div>
          </div>
    })
  }
  

  return <div className={'container'}>
    <h1>Inbox</h1>
    <div className={'inbox-container'}>
      <div className={'inbox-thread-container'}>

       {threadCards}

      </div>
      <div className={'inbox-messages-container'}>

        <div className={'inbox-message-list-container'}>

          {threadMessages}
        
        </div>

        <div className={'inbox-message-input-container'}>
          <Form 
            config={messageForm} 
            controls={formControls} 
            onChange={e => handleChange(e)}
            onSelectChange={handleSelectChange}
          />
        </div>

      </div>
    </div>
  </div>
}

export default Inbox