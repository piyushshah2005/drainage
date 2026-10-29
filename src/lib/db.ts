import { MongoClient, Db, Collection, Document } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
declare global {
  // Prevent TypeScript errors for global variable
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global.__mongoClientPromise) {
    client = new MongoClient(uri!, options)
    global.__mongoClientPromise = client.connect()
  }
  clientPromise = global.__mongoClientPromise
} else {
  client = new MongoClient(uri!, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Database helper functions
export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db('urbandrainage')
}

export async function getCollection<T extends Document>(collectionName: string): Promise<Collection<T>> {
  const db = await getDb()
  return db.collection<T>(collectionName)
}

// Admin users collection
export interface AdminUser {
  _id?: string
  email: string
  password: string
  name: string
  role: 'admin' | 'superadmin'
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

// Sensor data collection
export interface SensorData {
  _id?: string
  id: string
  sensorId: string
  name: string
  location: string
  type: 'rainfall' | 'water_level' | 'flow_rate'
  value: number
  unit: string
  status: 'normal' | 'elevated' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  recordedAt?: Date
  lastUpdate?: Date
}

// Alert collection
export interface Alert {
  _id?: string
  id: string
  sensorId: string
  sensorName: string
  location: string
  type: 'rainfall' | 'water_level' | 'flow_rate'
  value: number
  unit: string
  threshold: number
  severity: 'warning' | 'critical'
  message: string
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: Date
  createdAt: Date
}

// Simulation record
export interface Simulation {
  _id?: string
  name: string
  description?: string
  type: 'rainfall' | 'flood' | 'storm'
  parameters: Record<string, any>
  results: Record<string, any>
  createdBy: string
  createdAt: Date
  status: 'running' | 'completed' | 'failed'
}

// System metrics collection
export interface SystemMetrics {
  _id?: string
  timestamp: Date
  totalSensors: number
  activeSensors: number
  avgRainfall: number
  totalAlerts: number
  criticalAlerts: number
  dataProcessed: number // in MB
  apiRequests: number
  systemHealth: number // percentage
}
