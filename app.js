import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'

dotenv.config()

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
