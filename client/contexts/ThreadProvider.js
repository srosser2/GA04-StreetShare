import React, { useContext, useEffect, useState, useCallback } from 'react'
import useAxios from '../hooks/useAxios'
import axios from 'axios'
import { getLoggedInUser } from '../lib/auth'
import { useSocket } from './SocketProvider'
import { useLocation, useHistory } from 'react-router-dom'

const ThreadContext = React.createContext()

export const useThreads = () => {
  return useContext(ThreadContext)
}

export const ThreadProvider = ({ id, children }) => {

  const loggedInUser = getLoggedInUser()
  const token = localStorage.getItem('token')

  const location = useLocation()
  const history = useHistory()

  const params = new URLSearchParams(location.search)
  const t = Number(params.get('thread'))

  const [selectedThreadId, updateSelectedThreadId] = useState(t)
  const socket = useSocket()

  const axiosThreadRequest = {
    url: `/api/users/${loggedInUser.sub}/threads`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }


  useEffect(() => {
    return history.listen((location) => {
      const params = new URLSearchParams(location.search)
      const t = Number(params.get('thread'))
      updateSelectedThreadId(t)
    })
  }, [location])

  const { loading: threadLoading, results: threads, setResults: updateThreads, errors: threadErrors } = useAxios(axiosThreadRequest)

  useEffect(() => {
    if (socket == null) return

    socket.on('connect', () => {

    })

    socket.on('recieve-message', message => {
      console.log('message recieved')
      const parsedMessage = JSON.parse(message)
      console.log(parsedMessage)


      updateThreads(prevThreads => {
        const updatedThreads = [...prevThreads]
        const threadToUpdate = updatedThreads.find(thread => thread.id === parsedMessage.threadId)
        threadToUpdate.messages.push(parsedMessage)
        return updatedThreads
      })
    })

    return () => socket.off('recieve-message')
  }, [socket, selectedThreadId])


  const sendMessage = ({ text, recipients, threadId }) => {
    socket.emit('send-message', text, recipients, threadId)
  }


  let conversationsData = []

  // if (Array.isArray(threads) && threads.length > 0) {
  //   conversationsData = threads.map(thread => {
  //     return {
  //       id: thread.id,
  //       messages: thread.messages,
  //       users: thread.users
  //     }
  //   })
  // }

  const value = {
    threadLoading,
    threads,
    selectedThreadId,
    updateSelectedThreadId,
    conversationsData,
    sendMessage
  }

  return (
    <ThreadContext.Provider value={value}>
      { children}
    </ThreadContext.Provider>
  )

}

