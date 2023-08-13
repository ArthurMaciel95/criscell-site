import { MongoClient } from 'mongodb'

const url = process.env.DATABASE_URL

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default async function connection() {
  await client.connect()

  const db = client.db('criscell')

  return { db, client }
}

