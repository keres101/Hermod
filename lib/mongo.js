import { MongoClient, ObjectId } from 'mongodb'
import config from '../util/config.js'

config.env()
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI)
    this.dbName = DB_NAME
  }
  async connect() {
    try {
      if (!MongoLib.connection) {
        const db = await this.client.connect()
        MongoLib.connection = db.db(this.dbName)
        console.log('Connected to database')
      }
      return MongoLib.connection
    } catch (err) {
      console.log(err)
    }
  }

  async create(collection, data) {
    const db = await this.connect()
    const result = await db.collection(collection).insertOne(data)
    return result.insertedId
  }
}

export default MongoLib
