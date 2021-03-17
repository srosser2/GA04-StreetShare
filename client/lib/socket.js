import { io } from 'socket.io-client'

const URL = process.env.HOST
const socket = io(URL, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default socket