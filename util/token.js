import jwt from 'jsonwebtoken'
import config from './config.js'

config.env()
const { KEY_JWT } = process.env

const createToken = (payload) => {
  const token = jwt.sign(payload, KEY_JWT)
  return token
}

export { createToken }
