// Temporary diagnostic: verifies the MongoDB connection from .env.local
const fs = require('fs')
const path = require('path')
const { MongoClient } = require('mongodb')

const raw = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8')
const line = raw.split(/\r?\n/).find((l) => l.startsWith('MONGODB_URI='))
if (!line) {
  console.log('NO MONGODB_URI FOUND')
  process.exit(1)
}
const uri = line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '')

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 })

client
  .connect()
  .then(async () => {
    console.log('CONNECTED OK')
    const dbs = await client.db().admin().listDatabases()
    console.log('databases:', dbs.databases.map((d) => d.name).join(', '))
    const db = client.db('urbandrainage')
    const cols = await db.listCollections().toArray()
    console.log('collections:', cols.length ? cols.map((c) => c.name).join(', ') : '(none)')
    const admins = await db.collection('admins').countDocuments()
    console.log('admin users:', admins)
    const sensors = await db.collection('sensors').countDocuments()
    console.log('sensor documents:', sensors)
    await client.close()
  })
  .catch((err) => {
    console.log('FAILED:', err.constructor.name)
    console.log('code:', err.code, err.codeName || '')
    console.log('message:', err.message)
    process.exitCode = 1
  })
