import { createToken } from '../util/token.js'
import MongoLib from '../lib/mongo.js'
import ChatService from './chat.js'

class UserService {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'users'
    this.chatService = new ChatService()
  }
  async createUser(user) {
    const result = await this.mongoDB.create(this.collection, user)
    return result
  }

  async getUsersByEmail(emails) {
    const result = await this.mongoDB.find(
      this.collection,
      {
        email: { $in: emails }
      },
      { _id: true, nickname: true }
    )
    return result
  }

  async login(credentials) {
    const user = await this.mongoDB.findOne(this.collection, credentials, {
      password: false
    })
    if (!user) {
      throw new Error()
    }
    const token = createToken(user)
    user.token = token
    return Promise.resolve(user)
  }

  async addFriend(user, email) {
    const chat = {
      duo: true,
      members: [email, user.email]
    }
    const result = await this.chatService.createChat(chat)
    return result
  }
}

export default UserService
