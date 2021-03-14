import { io } from 'socket.io-client'

const URL = 'http://localhost:5000'
const socket = io(URL, { autoConnect: false })

socket.onAny((event, ...args) => {
  consoel.log(event, args)
})

export default socket