import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const { KEY_JWT } = process.env

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const decode = jwt.verify(token, KEY_JWT)
    next()
  } catch (error) {
    next(error)
  }
}
export default validateToken
