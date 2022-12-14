import { ObjectId } from 'mongodb'
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
    if (data.duo === true) {
      const existChat = await this.mongoDB.findOne(this.collection, {
        $and: [
          { members: { $elemMatch: { email: data.members[0] } } },
          { members: { $elemMatch: { email: data.members[1] } } },
          { duo: true }
        ]
      })
      if (!!existChat) throw new Error('Already exist chat')
    }
    data.members = users
    const result = await this.mongoDB.create(this.collection, data)
    return result
  }

  async getChats(user) {
    const chats = await this.mongoDB.find(
      this.collection,
      {
        members: {
          $elemMatch: { email: user.email }
        }
      },
      { _id: true, duo: true, members: true, name: true }
    )
    return chats
  }

  async getChat(user, chatId) {
    const chat = await this.mongoDB.findOne(
      this.collection,
      {
        $and: [
          { _id: ObjectId(chatId) },
          {
            members: {
              $elemMatch: {
                email: user.email
              }
            }
          }
        ]
      },
      {}
    )
    if (chat === null)
      throw new Error('The chat does not exist or you do not have permissions')
    return chat
  }

  async saveMessage(user, chatId, message) {
    message.date = new Date()
    const result = await this.mongoDB.updatePushArray(
      this.collection,
      {
        $and: [
          { _id: ObjectId(chatId) },
          {
            members: {
              $elemMatch: {
                email: user.email
              }
            }
          }
        ]
      },
      { messages: message }
    )
    if (result != 1)
      throw new Error('check if you have permissions for this chat')
    return result
  }
}

export default ChatService
