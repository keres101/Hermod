import { createToken } from '../util/token.js'
import MongoLib from '../lib/mongo.js'

class UserService {
  constructor() {
    this.mongoDB = new MongoLib()
    this.collection = 'users'
  }
  async createUser(user) {
    const result = await this.mongoDB.create(this.collection, user)
    return Promise.resolve({ message: 'user created', data: result })
  }

  login(credentials) {
    const token = createToken({ user: 'mariano', id: 'daa' })
    return Promise.resolve({
      message: 'login successful',
      token,
      user: {
        full_name: 'mariano'
      }
    })
  }

  addFriend(friend) {
    return Promise.resolve({ message: 'friend added' })
  }
}

export default UserService
