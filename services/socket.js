import ChatService from './chat.js'
import { Server } from 'socket.io'
import decode from '../util/decodeToken.js'

class SocketService {
  constructor(server) {
    this.chatService = new ChatService()
    this.io = new Server(server)
  }

  connect() {
    this.io.on('connection', (socket) => {
      console.log('a user connected')
      socket.on('message', (token, chatId, message) => {
        const user = decode(token)
        this.chatService.saveMessage(user, chatId, {
          content: message,
          nickname: user.nickname
        })
        this.io.emit('message', chatId, message, user.nickname)
      })
    })
  }
}

export default SocketService
