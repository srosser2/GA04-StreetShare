import React, { useState, useEffect } from 'react'
import axios from 'axios'

import blankAvatar from '../assets/blank-avatar.png'
import Form from '../components/form'

const Inbox = ({ history }) => {

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



  return <div className={'container'}>
    <h1>Inbox</h1>
    <div className={'inbox-container'}>
      <div className={'inbox-thread-container'}>
        <div className={'thread-card'}>
          <div className={'thread-card-avatar'}>
            <img src={blankAvatar} className={'avatar'}/>
          </div>
          <div className={'thread-card-content'}>
            <h4>Sam Rosser</h4>
            <p>When can I collect the item?</p>
          </div>
        </div>


        <div className={'thread-card'}>
          <div className={'thread-card-avatar'}>
            <img src={blankAvatar} className={'avatar'}/>
          </div>
          <div className={'thread-card-content'}>
            <h4>Sam Rosser</h4>
            <p>When can I collect the item?</p>
          </div>
        </div>


        <div className={'thread-card'}>
          <div className={'thread-card-avatar'}>
            <img src={blankAvatar} className={'avatar'}/>
          </div>
          <div className={'thread-card-content'}>
            <h4>Sam Rosser</h4>
            <p>When can I collect the item?</p>
          </div>
        </div>


        <div className={'thread-card'}>
          <div className={'thread-card-avatar'}>
            <img src={blankAvatar} className={'avatar'}/>
          </div>
          <div className={'thread-card-content'}>
            <h4>Sam Rosser</h4>
            <p>When can I collect the item?</p>
          </div>
        </div>

      </div>
      <div className={'inbox-messages-container'}>

        <div className={'inbox-message-list-container'}>

          <div className={'message-card'} >
            <div className={'message-card-avatar'}>
              <img src={blankAvatar} className={'avatar'}/>
            </div>
            <div className={'message-card-content'}>
              <h4>Sam Rosser - 5 mins ago</h4>
              <p>Hi, I am interested in borrowing your jetwash, do you think I can borrow it between the 20th and 25th? Hi, I am interested in borrowing your jetwash, do you think I can borrow it between the 20th and 25th?</p>
            </div>
          </div>

          <div className={'message-card'} >
            <div className={'message-card-avatar'}>
              <img src={blankAvatar} className={'avatar'}/>
            </div>
            <div className={'message-card-content'}>
              <h4>Sam Rosser - 5 mins ago</h4>
              <p>Hi, I am interested in borrowing your jetwash, do you think I can borrow it between the 20th and 25th? Hi, I am interested in borrowing your jetwash, do you think I can borrow it between the 20th and 25th?</p>
            </div>
          </div>
        
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