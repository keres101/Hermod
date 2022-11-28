import ChatService from './chat.js'
import { Server } from 'socket.io'
import decode from '../util/decodeToken.js'

class SocketService {
  constructor(server) {
    this.chatService = new ChatService()
    this.io = new Server(server)
    this.socket = this.connect()
  }

  connect() {
    return this.io.on('connection', (socket) => socket)
  }
  sendMessage(chatId, message, user) {
    this.socket.emit('message', chatId, message, user.nickname)
  }
}

export default SocketService
