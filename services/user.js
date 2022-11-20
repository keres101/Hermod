class UserService {
  createUser(user) {
    return Promise.resolve({ message: 'user created' })
  }

  login(credentials) {
    return Promise.resolve({
      message: 'login successful',
      token: 'dsadasgagao253',
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
