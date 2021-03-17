import React from 'react'
import { useThreads } from '../contexts/ThreadProvider'
import blankAvatar from '../assets/blank-avatar.png'
import { getLoggedInUser } from '../lib/auth'
import { Link } from 'react-router-dom'

export default function Threads({ history }) {
  
  const loggedInUser = getLoggedInUser()
  const token = localStorage.getItem('token')

  if (!loggedInUser) {
    return <div>Please Log In</div>
  }

  const { threads, selectedThreadId, updateSelectedThreadId } = useThreads()

  const threadCards = threads.map((thread) => {
    const classes = ['thread-card']
    const threadUsersWithoutCurrentUser = thread.users.filter(user => user.id !== loggedInUser.sub)
    const threadUsersMapped = threadUsersWithoutCurrentUser.map(user => `${user.firstName} ${user.lastName}`)
    const threadUsers = threadUsersMapped.join(', ')

    if (thread.id === selectedThreadId) {
      classes.push('selected-thread')
    }
    return <div 
      key={thread.id}
      className={classes.join(' ')} 
      onClick={() => {
        history.push(`/inbox?thread=${thread.id}`)
        const params = new URLSearchParams(location.search)
        const t = Number(params.get('thread'))
        updateSelectedThreadId(t)
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
