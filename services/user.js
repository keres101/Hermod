import { createToken } from '../util/token.js'
import MongoLib from '../lib/mongo.js'

class UserService {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'users'
  }
  async createUser(user) {
    const result = await this.mongoDB.create(this.collection, user)
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
    return Promise.resolve({
      token,
      user
    })
  }

  addFriend(friend) {
    return Promise.resolve({ message: 'friend added' })
  }
}

export default UserService
