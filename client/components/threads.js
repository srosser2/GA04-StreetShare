import React from 'react'
import { useThreads } from '../contexts/ThreadProvider'
import blankAvatar from '../assets/blank-avatar.png'

export default function Threads() {
  const { threads, selectedThreadIndex, updateSelectedThreadIndex } = useThreads()

  const threadCards = threads.map((thread, i) => {
    const classes = ['thread-card']
    if (i === selectedThreadIndex) {
      classes.push('selected-thread')
    }
    return <div key={i} className={classes.join(' ')} onClick={() => {
      updateSelectedThreadIndex(i)
      console.log(selectedThreadIndex)
      }
    }>
      <div className={'thread-card-avatar'}>
        <img src={blankAvatar} className={'avatar'}/>
      </div>
      <div className={'thread-card-content'}>
        <h4>{thread.users[1].firstName} {thread.users[1].lastName}</h4>
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
