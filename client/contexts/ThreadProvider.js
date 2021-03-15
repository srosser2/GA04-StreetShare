import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'

const ThreadContext = React.createContext()

export const useThread = () => {
  return useContext(ThreadContext)
}

export const ThreadProvider = ({ userId, children }) => {

  const loggedInUser = getLoggedInUser()
  const token = localStorage.getItem('token')

  const [threads, updateThreads] = useState([])

  const axiosConfig = {
    url: `/api/users/${loggedInUserId}/threads`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const [ loading, results, error ] = useAxios(axiosConfig)

  const createThread = (usersArray) => {

  }

}

return (
  <ThreadContext.Provider value={{ threads, createThread }}
)