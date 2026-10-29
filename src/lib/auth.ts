import { AuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import clientPromise from './db'
import { AdminUser } from './db'
import { cookies } from 'next/headers'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
    role: string
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        try {
          const client = await clientPromise
          const db = client.db('urbandrainage')
          const admins = db.collection<AdminUser>('admins')

          const user = await admins.findOne({ email: credentials.email })

          if (!user) {
            throw new Error('No user found with this email')
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password)

          if (!isValidPassword) {
            throw new Error('Invalid password')
          }

          // Update last login
          await admins.updateOne(
            { _id: user._id },
            { $set: { lastLogin: new Date() } }
          )

          return {
            id: user._id?.toString() || '',
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
}

export async function getServerSessionSafe() {
  // Force dynamic rendering by accessing headers/cookies
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('next-auth.session-token') || cookieStore.get('__Secure-next-auth.session-token')
  
  // Call getServerSession which will use the cookie
  const session = await getServerSession(authOptions)
  return session
}
