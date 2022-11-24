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
    if (users.length < 2) throw new Error('Minimum 2 users, check the emails')
    if (data.private === true) {
      const existChat = await this.mongoDB.findOne(this.collection, {
        $and: [
          { members: { $elemMatch: { email: data.members[0] } } },
          { members: { $elemMatch: { email: data.members[1] } } },
          { private: true }
        ]
      })
      if (!!existChat) throw new Error('Already exist chat')
    }
    data.members = users
    const result = await this.mongoDB.create(this.collection, data)
    return result
  }
}

export default ChatService
