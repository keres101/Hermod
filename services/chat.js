import MongoLib from '../lib/mongo.js'

class ChatService {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'chats'
  }

  async createChat(data) {
    const users = await this.mongoDB.find(
      'users',
      {
        email: { $in: data.members }
      },
      { _id: true, nickname: true, email: true }
    )
    if (users.length < 2)
      throw new Error({ message: 'Minimum 2 users, check the emails' })
    data.members = users
    const result = await this.mongoDB.create(this.collection, data)
    return result
  }
}

export default ChatService
