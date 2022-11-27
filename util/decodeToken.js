import jwt from 'jsonwebtoken'
import config from './config.js'

config.env()
const { KEY_JWT } = process.env

const decode = (token) => {
  try {
    const de = jwt.verify(token, KEY_JWT)
    return de
  } catch (err) {
    console.log(err)
    return null
  }
}

export default decode
