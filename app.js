import express from 'express'
import userRouter from './routes/user.js'
import config from './util/config.js'

config.config()

const { PORT, API_PATH } = process.env
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to HERMOD')
})

userRouter(app, API_PATH)

app.use((error, req, res, next) => {
  res.json({ message: 'error occurred', error })
})

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT)
})
