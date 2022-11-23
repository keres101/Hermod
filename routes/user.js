import express from 'express'
import { createUserSchema, loginUserSchema } from '../util/schemas/user.js'
import validateSchema from '../util/middleware/validateSchema.js'
import validateToken from '../util/middleware/validateToken.js'
import UserService from '../services/user.js'
import ChatService from '../services/chat.js'

const userRouter = (app, apiPath) => {
  const router = express.Router()
  const userService = new UserService()
  const chatService = new ChatService()

  app.use(`${apiPath}/user`, router)

  router.get('/', (req, res) => {
    res.send('User all')
  })

  router.post('/signin', validateSchema(createUserSchema), async (req, res) => {
    const user = req.body
    try {
      const result = await userService.createUser(user)
      res.status(200).json({ message: 'user created', data: result })
    } catch (error) {
      res.status(500).json({
        message: 'There was an error registering, please try again later'
      })
    }
  })

  router.post('/login', validateSchema(loginUserSchema), async (req, res) => {
    const credentials = req.body
    try {
      const result = await userService.login(credentials)
      res.status(200).json({ message: 'login successful', data: result })
    } catch (error) {
      res.status(400).json({ message: 'invalid username or password' })
      // next(error)
    }
  })

  router.post('/friend/add', validateToken, async (req, res) => {
    const { email } = req.body
    const user = req.token
    try {
      const result = await userService.addFriend(user, email)
      res.status(200).json({ message: 'success', data: result })
    } catch (error) {
      res.status(400).json({ message: 'error' })
    }
  })

  router.post('/chat/create', validateToken, async (req, res) => {
    const user = req.token
    const data = req.body
    data.members.push(user.email)
    try {
      const result = await chatService.createChat(data)
      res.status(200).json({ message: 'chat created', data: result })
    } catch (error) {
      res
        .status(400)
        .json({ message: 'error creating chat', error: error.message })
    }
  })
}

export default userRouter
