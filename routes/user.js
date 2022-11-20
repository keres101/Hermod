import express from 'express'
import { createUserSchema } from '../util/schemas/user.js'
import validateSchema from '../util/middleware/validateSchema.js'

const userRouter = (app, apiPath) => {
  const router = express.Router()
  app.use(`${apiPath}/user`, router)

  router.get('/', (req, res) => {
    res.send('User all')
  })

  router.post('/signin', validateSchema(createUserSchema), (req, res) => {
    const data = req.body
    res.json(data)
  })
}

export default userRouter
