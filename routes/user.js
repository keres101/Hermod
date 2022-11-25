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
      res.status(200).json(result)
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
      res.status(400).json({ message: 'error', error: error.message })
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

  router.get('/chat/', validateToken, async (req, res) => {
    const user = req.token
    try {
      const chats = await chatService.getChats(user)
      res.status(200).json(chats)
    } catch (error) {
      res
        .status(400)
        .json({ message: 'error getting chat', error: error.message || error })
    }
  })

  router.post('/chat/savemessage', validateToken, async (req, res) => {
    const user = req.token
    const message = {
      content: req.body.content,
      nickname: user.nickname
    }
    try {
      const result = await chatService.saveMessage(
        user,
        req.body.chatId,
        message
      )
      res.status(200).json({ message: 'success', result })
    } catch (err) {
      res.status(400).json({ message: 'error sending message', error: err })
    }
  })

  router.get('/chat/:id', validateToken, async (req, res) => {
    const id = req.params.id
    const user = req.token
    try {
      const result = await chatService.getChat(user, id)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(300).json({
        message: 'check if you belong to this chat',
        error: error.message
      })
    }
  })
}

export default userRouter
