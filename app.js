import express from 'express'
import userRouter from './routes/user.js'
import config from './util/config.js'
import SocketService from './services/socket.js'
import http from 'http'

const app = express()
const server = http.createServer(app)

config.config()

const { PORT, API_PATH } = process.env

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to HERMOD :D')
})

userRouter(app, API_PATH)
new SocketService(server).connect()

app.use((error, req, res, next) => {
  console.log(error)
  res.status(400).json({ message: 'error occurred', error })
})

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT)
})
