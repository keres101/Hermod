import express from 'express'

const userRouter = (app, apiPath) => {
  const router = express.Router()
  app.use(`${apiPath}/user`, router)

  router.get('/', (req, res) => {
    res.send('User all')
  })

  router.post('/signin', (req, res) => {
    const data = req.body
    res.json(data)
  })
}

export default userRouter
