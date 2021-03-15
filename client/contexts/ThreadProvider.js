import React, { useContext, useEffect, useState, useCallback } from 'react'
import useAxios from '../hooks/useAxios'
import { getLoggedInUser } from '../lib/auth'
import { useSocket } from './SocketProvider'

const ThreadContext = React.createContext()

export const useThreads = () => {
  return useContext(ThreadContext)
}

export const ThreadProvider = ({ id, children }) => {

  const loggedInUser = getLoggedInUser()
  const token = localStorage.getItem('token')

  const [selectedThreadIndex, updateSelectedThreadIndex] = useState(0)
  const socket = useSocket()

  useEffect(() => {
    console.log(selectedThreadIndex)
  }, [selectedThreadIndex])

  const axiosThreadRequest = {
    url: `/api/users/${loggedInUser.sub}/threads`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const { loading: threadLoading, results: threads, setResults: updateThreads, errors: threadErrors } = useAxios(axiosThreadRequest)

  useEffect(() => {
    if (socket == null) return
    socket.on('recieve-message', message => {
      const parsedMessage = JSON.parse(message)
      parsedMessage.id = Math.random()
      updateThreads(prevThreads => {
        const updatedThreads = [...prevThreads]
        updatedThreads[selectedThreadIndex].messages.push(parsedMessage)
        return updatedThreads
      })
      
    })

    return () => socket.off('recieve-message')
  }, [socket, selectedThreadIndex])


  const sendMessage = ({ text, recipients, threadId }) => {
    socket.emit('send-message', text, recipients, threadId)
  }


  let conversationsData = []

  if (threads && threads[selectedThreadIndex]) {
    conversationsData = threads.map(thread => {
      return thread.messages
    })
  }
  

  const value = {
    threadLoading,
    threads,
    selectedThreadIndex,
    updateSelectedThreadIndex,
    conversationsData,
    sendMessage
  }
  
  return (
  <ThreadContext.Provider value={value}>
    { children }
  </ThreadContext.Provider>
  )

}

