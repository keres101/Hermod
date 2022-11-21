import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const { KEY_JWT } = process.env

const createToken = (payload) => {
  const token = jwt.sign(payload, KEY_JWT)
  return token
}

export { createToken }
