import React, { useState } from 'react'
import { useThreads } from '../contexts/ThreadProvider'
import Form from '../components/form'
import moment from 'moment'
import { getLoggedInUser } from '../lib/auth'

export default function Conversation() {

  const loggedInUser = getLoggedInUser()

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

  const { threads, threadLoading, conversationsData, selectedThreadIndex, sendMessage } = useThreads()

  if (threadLoading) {
    return <h2>Loading</h2>
  }

  let conversation

  if (Array.isArray(conversationsData) && conversationsData.length > 0) {
    conversation = conversationsData[selectedThreadIndex].map((message, i) => {

      let messageCardStyle = {}
      let messageCardInfoStyle = {}
      let messageCardContentStyle = {}
      if (message.user.id === loggedInUser.sub) {
        messageCardStyle.alignSelf = 'flex-end'
        messageCardInfoStyle.alignSelf = 'flex-end'
        messageCardContentStyle.backgroundColor = '#3273dc'
        messageCardContentStyle.color = 'white'
        messageCardContentStyle.alignSelf = 'flex-end'
      }

      return <div 
        key={message.id}
        className={'message-card'}
        style={messageCardStyle}
        >
          <p className={'message-card-info'} style={messageCardInfoStyle}>{message.user.firstName} {message.user.lastName} - {moment(message.created_at).fromNow()}</p>
          <p className={'message-card-content'} style={messageCardContentStyle}>{message.content}</p> 
      </div>
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedForm = { ...messageForm }
    updatedForm[name].value = value
    updateMessageForm(updatedForm)
  }

  const formControls = {
    submit: {
      label: 'Send',
      handler: () => {
        const text = messageForm.message.value
        if (text.length < 1) return
        const recipients = threads[selectedThreadIndex].users.map(user => user.id)
        const threadId = threads[selectedThreadIndex].id
        const sender = loggedInUser.sub
        sendMessage({ text, recipients, threadId })
        messageForm.message.value = ''
      },
      classes: []
    }
  }

  return (
    <div className={'inbox-conversation-container'}>
      <div className={'inbox-message-list-container'}>
      {conversation}
      </div>
      <div className={'inbox-message-input-container'}>
          <Form 
            config={messageForm} 
            controls={formControls} 
            onChange={e => handleChange(e)}
          />
        </div>
    </div>
  )
}
