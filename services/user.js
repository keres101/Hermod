import { createToken } from '../util/token.js'

class UserService {
  createUser(user) {
    return Promise.resolve({ message: 'user created' })
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
