import React, { useState, useEffect, useCallback } from 'react'

import Threads from '../components/threads'
import Conversation from '../components/conversation'

const Inbox = ({ history, match }) => {

  return <div className={'container'}>
    <h1 className={'page-title'}>Inbox</h1>
    <div className={'inbox-container'}>
      <Threads />
      <Conversation />
    </div>
  </div>
}

export default Inbox