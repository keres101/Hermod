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

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT)
})
