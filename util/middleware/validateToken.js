import jwt from 'jsonwebtoken'
import config from '../config.js'

config.env()
const { KEY_JWT } = process.env

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const decode = jwt.verify(token, KEY_JWT)
    req.token = decode
    next()
  } catch (error) {
    next(error)
  }
}
export default validateToken
