import NextAuth from 'next-auth'
import { MongoClient } from 'mongodb'

const findAccessToken = async (userId, client) => {
  try {
    await client.connect()
    const database = client.db('issu')
    const accounts = database.collection('accounts')

    const accessToken = await accounts.findOne({ userId: userId })

    return accessToken
  } finally {
    await client.close()
  }
}

const customGitlabProvider = (options) => {
  return {
    id: 'gitlab',
    name: 'GitLab',
    type: 'oauth',
    version: '2.0',
    scope: 'api',
    params: { grant_type: 'authorization_code' },
    accessTokenUrl: 'https://gitlab.lnu.se/oauth/token',
    authorizationUrl: 'https://gitlab.lnu.se/oauth/authorize?response_type=code',
    profileUrl: 'https://gitlab.lnu.se/api/v4/user',
    profile: (profile) => {
      return {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.avatar_url
      }
    },
    ...options
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    customGitlabProvider({
      clientId: process.env.GL_APP_ID,
      clientSecret: process.env.GL_APP_SECRET
    })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_ATLAS,
  callbacks: {
    async jwt (token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },
    async session (session, token) {
      const client = new MongoClient(process.env.MONGODB_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })

      const { accessToken } = await findAccessToken(token.id, client)

      session.gitlabToken = accessToken
      return session
    }
  },
  secret: process.env.SESS_SECRET
})
