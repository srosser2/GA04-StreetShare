import React, { useState, useEffect, useCallback } from 'react'

import Threads from '../components/threads'
import Conversation from '../components/conversation'
import Footer from '../components/footer'

const Inbox = ({ history, match }) => {

  console.log(history)
  console.log(match)

  return <div className={'container'}>
      <h1 className={'page-title'}>Inbox</h1>
      <div className={'inbox-container'}>
        <Threads history={history}/>
        <Conversation history={history} />
      </div>
    </div>
}

export default Inbox