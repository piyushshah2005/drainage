import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const uri = process.env.MONGODB_URI
const adminEmail = process.env.ADMIN_EMAIL || 'admin@urbandrainage.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'

async function setupAdmin() {
  if (!uri) {
    console.error('Error: MONGODB_URI environment variable is not set')
    process.exit(1)
  }

  try {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db('urbandrainage')
    const admins = db.collection('admins')

    // Check if admin already exists
    const existingAdmin = await admins.findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log(`Admin user already exists: ${adminEmail}`)
      await client.close()
      return
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds)

    // Create admin user
    const result = await admins.insertOne({
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin User',
      role: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log('Admin user created successfully!')
    console.log('---')
    console.log(`Email: ${adminEmail}`)
    console.log(`Password: ${adminPassword}`)
    console.log('---')
    console.log('Please change the password after first login!')

    await client.close()
  } catch (error) {
    console.error('Error setting up admin:', error)
    process.exit(1)
  }
}

setupAdmin()
