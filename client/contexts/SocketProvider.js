import React, { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = React.createContext()

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ id, token, children }) => {

  // if (!id) return children
  // if (!token) return children

  const [socket, setSocket] = useState()

  console.log(process.env.HOST)

  useEffect(() => {
    const newSocket = io(
      `${process.env.HOST}`, // localhost:5000
      { query: { id, token }}
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )

}