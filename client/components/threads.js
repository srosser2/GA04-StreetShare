import React from 'react'
import { useThreads } from '../contexts/ThreadProvider'
import blankAvatar from '../assets/blank-avatar.png'
import { getLoggedInUser } from '../lib/auth'

export default function Threads() {
  
  const loggedInUser = getLoggedInUser()

  const { threads, selectedThreadId, updateSelectedThreadId } = useThreads()

  const threadCards = threads.map((thread) => {
    const classes = ['thread-card']


    const threadUsersWithoutCurrentUser = thread.users.filter(user => user.id !== loggedInUser.sub)
    const threadUsersMapped = threadUsersWithoutCurrentUser.map(user => `${user.firstName} ${user.lastName}`)
    const threadUsers = threadUsersMapped.join(', ')

    if (thread.id === selectedThreadId) {
      classes.push('selected-thread')
    }
    return <div key={thread.id} className={classes.join(' ')} onClick={() => {
      updateSelectedThreadId(thread.id)
      }
    }>
      <div className={'thread-card-avatar'}>
        <img src={blankAvatar} className={'avatar'}/>
      </div>
      <div className={'thread-card-content'}>
        <h4>{threadUsers}</h4>
        <p>{thread.messages[thread.messages.length - 1].content}</p>
      </div>
    </div>
  })

  return (
    <div className='inbox-thread-container'>
      {threadCards}
    </div>
  )
}
